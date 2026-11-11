# Glossary

### Email address

An email address of a user, as allauth stores it (`EmailAddress`). It is verified when the user opened the link of
the verification email. A user can only sign in when their primary email address is verified.

### Session

The signed-in state of a user in a browser. Allauth starts it at sign-in (or at email verification), and ends it at
sign-out. The browser sends it as a cookie with each request, and the GraphQL API uses it to find the user.

### Signup form

The form that allauth uses to create an account. Besides the email address and the password, it has the
vidlito-specific fields `username` and `accepts_terms`, and it creates the user profile of the new account.

### User profile

The public part of a user (`UserProfile`): their username. Its id is the id of the user. It is created together with
the account.

### Username

The name that other users see (e.g. as the author of a playlist). It is unique, and stored in the user profile. The
user signs in with their email address, not with their username. The username `vidlito` is reserved.
