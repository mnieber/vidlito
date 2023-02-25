def create_delete_clips_mutation(clip_ids, output_values=None):
    result = """
        mutation deleteClips(
            $clipIds: [UUID]!
        ) {
            deleteClips(
                clipIds: $clipIds
            ) {
                output_values
            }
        }
    """.replace(
        "output_values", ", ".join(output_values or [])
    )

    operation_name = "deleteClips"
    variables = dict(
        clipIds=clip_ids,
    )
    return result, operation_name, variables
