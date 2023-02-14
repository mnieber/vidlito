def create_get_playlist_query(
    playlist_id,
    playlist_slug,
    playlist_outputs=None,
):
    result = """
        query getPlaylist(
            $playlistId: ID,
            $playlistSlug: String,
        ) {
            getPlaylist(
                $playlistId: playlistId,
                $playlistSlug: playlistSlug,
            ) {
                playlist {
                    playlist_outputs
                }
            }
        }
    """.replace(
        "playlist_outputs", ", ".join(playlist_outputs or [])
    )

    operation_name = "getPlaylist"
    variables = dict(
        playlistId=playlist_id,
        playlistSlug=playlist_slug,
    )
    return result, operation_name, variables
