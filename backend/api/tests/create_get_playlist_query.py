def create_get_playlist_query(
    playlist_slug,
    playlist_id,
    playlist_outputs=None,
):
    result = """
        query getPlaylist(
            $playlistSlug: String,
            $playlistId: String,
        ) {
            getPlaylist(
                $playlistSlug: playlistSlug,
                $playlistId: playlistId,
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
        playlistSlug=playlist_slug,
        playlistId=playlist_id,
    )
    return result, operation_name, variables
