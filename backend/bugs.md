Bugs:

- Maybe when we call urlState.setClipSlug we should also add a string to say what happened?
  -- e.g. urlState.setClipSlug(clip.slug, 'movedClipToTrash')
  -- if we are on the trash page and we see 'movedClipToTrash', then we stay on the trash page
  -- or maybe directly use functions in the urlState, e.g. urlState.correctClipSlugTo(clip.slug)

- When closing the actions, always go to the dashboard
- Is trailing slash needed in signin url?
- After signing in, catch the sign in event in AuthState and invalidate the getActions query (and maybe other queries)
- since we're not locking resources, there may be race conditions
  -- give every obj a version uuid. When you call an endpoint you pass the version uuids of the affected resources
  -- if those version uuids don't match, the endpoint returns a 409 conflict
  -- see if we can reverse a reordering of clips in a playlist if a 409 happens
- clip not removed after move clips to playlists
- handle case where action is not found in UndoAction
- with the trash page open, trashing a clip and selecting the next clip should not close the trash page
  -- probably updateUrl should only be executed if there was a deliberate highlight change (e.g. click on a clip)
