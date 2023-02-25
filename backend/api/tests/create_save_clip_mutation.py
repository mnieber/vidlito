def create_save_clip_mutation(playlist_id, clip_form, output_values=None):
    result = """
        mutation saveClip(
            $playlistId: UUID!
            $clipForm: ClipFormT!
        ) {
            saveClip(
                playlistId: $playlistId
                clipForm: $clipForm
            ) {
                output_values
            }
        }
    """.replace(
        "output_values", ", ".join(output_values or [])
    )

    operation_name = "saveClip"
    variables = dict(
        playlistId=playlist_id,
        clipForm=clip_form.kwargs,
    )
    return result, operation_name, variables
