def create_save_playlist_ordering_mutation(playlist_ids, output_values=None):
    result = """
        mutation savePlaylistOrdering(
            $playlistIds: [UUID]!
        ) {
            savePlaylistOrdering(
                playlistIds: $playlistIds
            ) {
                output_values
            }
        }
    """.replace(
        "output_values", ", ".join(output_values or [])
    )

    operation_name = "savePlaylistOrdering"
    variables = dict(
        playlistIds=playlist_ids,
    )
    return result, operation_name, variables
