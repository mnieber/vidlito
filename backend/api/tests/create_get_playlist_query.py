def create_get_playlist_query(
    playlist_slug_id,
    playlist_outputs=None,
):
    result = """
        query getPlaylist(
            $playlistSlugId: String,
        ) {
            getPlaylist(
                $playlistSlugId: playlistSlugId,
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
        playlistSlugId=playlist_slug_id,
    )
    return result, operation_name, variables
