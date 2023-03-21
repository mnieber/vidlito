def create_undo_action_mutation(playlist_id, output_values=None):
    result = """
        mutation undoAction(
            $playlistId: UUID!
        ) {
            undoAction(
                playlistId: $playlistId
            ) {
                output_values
            }
        }
    """.replace(
        "output_values", ", ".join(output_values or [])
    )

    operation_name = "undoAction"
    variables = dict(
        playlistId=playlist_id,
    )
    return result, operation_name, variables
