Bugs:

- Why can't I unselect the highlighted and selected clip?
- After signing in, catch the sign in event in AuthState and invalidate the getActions query (and maybe other queries)
- clip not removed after move clips to playlists
- handle case where action is not found in UndoAction
- with the trash page open, trashing a clip and selecting the next clip should not close the trash page

Test:

- When the apps starts from the new-clip url, the clip form is shown (same for new-playlist)

Race condition:

- since we're not locking resources, there may be race conditions
  -- give every obj a version uuid. When you call an endpoint you pass the version uuids of the affected resources
  -- if those version uuids don't match, the endpoint returns a 409 conflict
  -- see if we can reverse a reordering of clips in a playlist if a 409 happens
