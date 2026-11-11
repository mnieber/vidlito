# Glossary

### Auth state

The frontend's view of who is signed in (`AuthState`): the user id (the email address, or anonymous), whether the
user id is known yet, and the state of the last sign-in attempt.

### Next url

The page that the user goes to after signing in (`nextUrl`). It is set when a page that needs a signed-in user sends
the user to the sign-in page.

### Session

The signed-in state of the user in the browser. The backend keeps it in a cookie, which the browser sends with each
request to the allauth API and to the GraphQL API.

### Verification link

The link in the email that vidlito sends after sign-up. It opens the verify-email page, where the user confirms their
email address. After that, they can sign in.
