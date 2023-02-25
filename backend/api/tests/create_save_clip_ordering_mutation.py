def create_save_clip_ordering_mutation(playlist_id, clip_ids, output_values=None):
    result = """
        mutation saveClipOrdering(
            $playlistId: UUID!
            $clipIds: [UUID]!
        ) {
            saveClipOrdering(
                playlistId: $playlistId
                clipIds: $clipIds
            ) {
                output_values
            }
        }
    """.replace(
        "output_values", ", ".join(output_values or [])
    )

    operation_name = "saveClipOrdering"
    variables = dict(
        playlistId=playlist_id,
        clipIds=clip_ids,
    )
    return result, operation_name, variables
