def create_delete_playlist_mutation(playlist_id, output_values=None):
    result = """
        mutation deletePlaylist(
            $playlistId: ID!
        ) {
            deletePlaylist(
                playlistId: $playlistId
            ) {
                output_values
            }
        }
    """.replace(
        "output_values", ", ".join(output_values or [])
    )

    operation_name = "deletePlaylist"
    variables = dict(
        playlistId=playlist_id,
    )
    return result, operation_name, variables
