Bugs:

- If you start on the actions page, then close it -> clip slug not defined
- userProfileLoaded fired too often
- SignIn form doesn't have labels above the inputs
- Handle system errors

Test:

- When the apps starts from the new-clip url, the clip form is shown (same for new-playlist)

---

Fix some day:

- handle case where action is not found in UndoAction

Race condition:

- since we're not locking resources, there may be race conditions
  -- give every obj a version uuid. When you call an endpoint you pass the version uuids of the affected resources
  -- if those version uuids don't match, the endpoint returns a 409 conflict
  -- see if we can reverse a reordering of clips in a playlist if a 409 happens
