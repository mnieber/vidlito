# Design: authentication with django-allauth

Vidlito replaces its authentication (django-rtk: GraphQL mutations that return a JWT) with the authentication of
the blogs example: django-allauth in headless mode, with a session cookie. The GraphQL API stays, and
authenticates its requests with the session.

## What the user does

1. **Sign up.** The user enters an email address, a username and a password, and accepts the terms. Vidlito
   creates the account, and sends an email with a verification link. The user can't sign in until they verified
   their email address.
2. **Verify the email address.** The user opens the link, and confirms. Vidlito marks the email address as
   verified; then the user can sign in.
3. **Sign in** with email address and password. Vidlito refuses a sign-in when the email address is not verified
   (and sends a new verification email).
4. **Sign out.** Vidlito ends the session.
5. **Reset the password.** The user enters their email address, and gets an email with a reset link. The link opens
   a form where the user sets a new password.

While the user is signed in, every GraphQL request is made by that user (`info.context.user`). A signed-out user
can still use the queries that work for anonymous users (e.g. viewing a public playlist).

## Decisions

### Versions

- **Django 4.2 (LTS)**, upgraded from 4.0. Django 4.0 was only pinned for django-rtk, which this change removes.
  graphene-django is upgraded within 3.x to a version that supports Django 4.2.
- **django-allauth 65.x** with the `headless` extra, as in blogs (and `headless-spec` in the dev requirements,
  for the API docs).
- **django-admin-sortable2 2.x**, upgraded from 1.0.4, which doesn't support Django 4.2. Vidlito only uses
  `SortableAdminBase` and `SortableInlineAdminMixin`, which 2.x still has.

### The allauth setup (as in blogs)

- Apps `allauth`, `allauth.account` and `allauth.headless`, and `AccountMiddleware`. `HEADLESS_ONLY = True`.
- The endpoints are served at `/api/_allauth/`, and the frontend uses the browser client
  (`/api/_allauth/browser/v1/...`).
- The user signs in with their email address (`ACCOUNT_LOGIN_METHODS = {"email"}`). The user model keeps
  `email` as `USERNAME_FIELD` and has no username field (`ACCOUNT_USER_MODEL_USERNAME_FIELD = None`).
- Email verification is mandatory (`ACCOUNT_EMAIL_VERIFICATION = "mandatory"`).
- `HEADLESS_FRONTEND_URLS` points to the pages of the frontend that handle the links in the emails. They are the
  paths of blogs, so that both apps use the same urls:

  | allauth url                       | frontend page                    |
  | --------------------------------- | -------------------------------- |
  | `account_confirm_email`           | `/account/verify-email/{key}`    |
  | `account_reset_password`          | `/account/password/reset`        |
  | `account_reset_password_from_key` | `/account/password/reset/{key}`  |
  | `account_signup`                  | `/sign-up`                       |

- The session and CSRF cookies are `Secure` in the base settings, and not in the local settings (the dev server
  runs on http). The local settings serve the allauth API docs (`HEADLESS_SERVE_SPECIFICATION`).
- Locally, emails are printed to the console of the backend (as now).

### Sign-up fields

The username and the terms are vidlito-specific, so sign-up uses a signup form (`ACCOUNT_SIGNUP_FORM_CLASS`) with
two extra fields: `profile_username` and `accepts_terms`. Allauth passes the extra fields of the signup request to
this form. The username field is called `profile_username`, because allauth removes a field called `username` from
the signup form when the user model has no username.

- The form validates that the username is not taken (the check that `USERNAME_ALREADY_TAKEN_FN` did), that it is
  not the reserved username `vidlito`, and that the terms are accepted. A failure is reported on the field
  (`param`) that caused it.
- When the account is created, the account adapter (`ACCOUNT_ADAPTER`, in `save_user`) sets `accepts_terms` and
  `terms_version_accepted` (`TERMS_VERSION`), creates the `UserProfile` (with the user id as its id, as now), and
  makes the user follow the help playlist, in one transaction. The adapter does this, and not the form, because
  the user must have `accepts_terms` when allauth saves it. Creating the profile and the follow is a shared
  function (`setup_new_account`) that `UserManager.create_user` also uses.
- `UserManager.create_user` stays, for the accounts that vidlito creates itself (the `vidlito` user and the
  superuser).

### Existing accounts

- Passwords stay valid: allauth uses Django's password hashers.
- A data migration gives each existing active user a verified, primary `EmailAddress`, so that existing users can
  sign in without verifying again.
- The superuser that `createsuperuser` creates also gets a verified `EmailAddress` (as in blogs), so that the
  admin can sign in. Its username is the part of its email address before the `@`.
- Existing JWTs stop working: every user must sign in once more.

### The GraphQL API

- The GraphQL view is no longer `csrf_exempt`: the frontend sends the CSRF token in the `X-CSRFToken` header.
- The JWT middleware is removed from `GRAPHENE["MIDDLEWARE"]`.
- The auth mutations and queries of django-rtk (`registerAccount`, `activateAccount`, `obtainJsonWebToken`,
  `requestMagicLink`, `me`, `verifyToken`, `refreshToken`, ...) are removed, together with the `user_accounts`
  app and its email templates.

### What is dropped

- **Magic links.** Blogs has no equivalent; users sign in with their password, or reset it.
- **The two-step sign-up** (email first, username and password in the activation link). Allauth has no built-in
  "set the password when verifying", so the user chooses the password at sign-up, as in blogs.
- The dependencies `django-rtk*` and `django-graphql-jwt`, the `/pypi` mounts of the django-rtk checkouts in
  `docker-compose.override.yml`, and the `install-editable-packages` targets of the service's `jazzoo` file.
- The tables of the removed apps (`refresh_token_*`, `django_rtk_*`) stay in the database, unused.

### Same origin

The session cookie only works when the browser talks to the backend through the origin of the frontend. Locally,
the Vite dev server proxies `/api/` and `/graphql/` to the backend (as blogs does for `/api/`). A production
deployment must do the same (e.g. a reverse proxy); setting that up is not part of this change.

## Testing

This feature has no automated tests: it is tested by hand.
