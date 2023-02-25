def create_move_clips_to_trash_mutation(playlist_id, clip_ids, output_values=None):
    result = """
        mutation moveClipsToTrash(
            $playlistId: UUID!
            $clipIds: [UUID]!
        ) {
            moveClipsToTrash(
                playlistId: $playlistId
                clipIds: $clipIds
            ) {
                output_values
            }
        }
    """.replace(
        "output_values", ", ".join(output_values or [])
    )

    operation_name = "moveClipsToTrash"
    variables = dict(
        playlistId=playlist_id,
        clipIds=clip_ids,
    )
    return result, operation_name, variables
