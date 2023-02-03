def create_get_playlist_query(
    playlist_id,
    playlist_outputs=None,
):
    result = """
        query getPlaylist(
            $playlistId: ID!,
        ) {
            getPlaylist(
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
        playlistId=playlist_id,
    )
    return result, operation_name, variables
