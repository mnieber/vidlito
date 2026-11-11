# Design: authentication with django-allauth

The frontend moves from django-rtk (GraphQL auth mutations, and a JWT in `localStorage`) to the auth workflow of
the blogs example: it calls the allauth headless API of the backend, and the backend keeps the session in a
cookie. The GraphQL API stays; its requests are authenticated by the same cookie.

## What the user does

1. **Sign up** (`/sign-up`): the user enters an email address, a username and a password, and accepts the
   terms. After a successful sign-up, the card tells the user to check their email.
2. **Verify the email address** (`/account/verify-email/:key`, the link in the email): the user confirms with a
   button. When the verification succeeds, the card says so, and links to the sign-in page (as in blogs).
3. **Sign in** (`/sign-in`, with an optional `nextUrl`): email address and password. On success, the user
   goes to the next page after sign-in, as now (`navToNextPageAfterSignIn`).
4. **Sign out** (in the account menu): the session ends, and the user goes to the sign-in page, as now.
5. **Reset the password**: the user requests a reset link (`/account/password/reset`), and sets a new
   password on the page of the link (`/account/password/reset/:key`). Then they sign in with the new password.

When the session expires while the user works, the next GraphQL request that fails takes them to the sign-in
page, with the current page as `nextUrl`.

## Decisions

### Ported from blogs

- The allauth helpers (`api/utils/allauth.ts`: the session and error schemas, `parseAllauthErrors`,
  `hasPendingFlow`, and `getAllauthFieldErrors`, which returns the message of each field), and an axios client
  for the allauth endpoints (`api/restClient.ts`: `authGet`, `authPost`, `authDelete`, which send the CSRF token).
- The calls of the auth endpoints (`useSignIn`, `useSignUp`, `useSignOut`, `useVerifyEmail`,
  `useRequestPasswordReset`, `useResetPassword`), and how they read the answers of allauth (e.g. a 401 after
  verifying the email address means success: the address is verified, and the user is not signed in).
- The sign-in errors of blogs: invalid credentials, email not verified, inactive account, and too many attempts.
  "Already signed in" (409, e.g. in another tab) counts as a successful sign-in.
- The errors of the auth forms come from allauth, per field; an error of a field that the form doesn't have (e.g.
  the key of the link) is shown as the global error of the form (as `setAuthFormErrors` does in blogs).
- New dependencies: `axios` and `zod`.

### Kept from vidlito

- The routing (react-router and vidlito's route tables), and vidlito's auth pages, cards and forms. Their look
  stays.
- The state model: `AuthState` tracks the state of the last auth request (e.g. `SIGN_UP_SUCCEEDED`), and
  `useLoadUserId` gives the rest of the app `isAuthenticated` and the user profile. Blogs' `AuthState` (with the
  user id, and `isUserIdKnown`) is not ported, because the dashboard already reads these from `useLoadUserId`.
- An endpoint resolves to `{ success, errors }`, as now, instead of blogs' result type (`ok`/`err`). A refusal
  with field errors has the error `INVALID_FIELDS`, and `AuthState.fieldErrors` has the message of each field.
  Other failures (e.g. a network error) reject, and end up in `AuthState.onErrored`, as now.
- `useLoadUserId` loads the session of allauth (which also sets the CSRF cookie), and then the user profile with
  GraphQL, as now. The user id is the email address (as in blogs).

### Urls

The auth pages use the paths of blogs, so that both apps use the same urls: `/sign-in`, `/sign-up`,
`/account/verify-email/:key`, `/account/password/reset` and `/account/password/reset/:key`. The old `/auth/...`
urls are removed.

### Changed pages

- `SignUpForm` gets the fields `username` and `password`, next to `email` and `acceptsTerms`. The username is sent
  to allauth as `profile_username`. The terms version is set by the backend.
- `SignInCard` goes to `nextUrl` after signing in, when it is a path on this site (so that the link can't send the
  user to another site).
- `ActivateAccount*` becomes `VerifyEmail*`. It has no fields: the username and
  password were chosen at sign-up.
- `RequestMagicLink*` and the sign-in-by-magic-link route are removed, with their links.

### GraphQL requests

- The GraphQL client sends its requests to `/graphql/` on the origin of the frontend, with the session cookie and
  the CSRF token (`X-CSRFToken`, from the `csrftoken` cookie). The JWT, the refresh token and their
  `localStorage` entries are removed.
- The Vite dev server proxies `/api/` and `/graphql/` to `vidlito_be:8000`. The `VITE_LOCALHOST_API_ENDPOINT`
  variable is removed.
- When a GraphQL request fails while the user is signed in, `AuthStateProvider` loads the session of allauth. If
  the user is no longer signed in, it clears the query cache, and sends the user to the sign-in page (see above).
  The backend doesn't need a special error for this: a signed-out user gets errors or empty results.

## Testing

This feature has no automated tests: it is tested by hand.
