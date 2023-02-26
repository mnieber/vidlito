def create_save_clip_mutation(
    playlist_id, clip_form, parent_clip_id, output_values=None
):
    result = """
        mutation saveClip(
            $playlistId: UUID!
            $clipForm: ClipFormT!
            $parentClipId: UUID
        ) {
            saveClip(
                playlistId: $playlistId
                clipForm: $clipForm
                parentClipId: $parentClipId
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
        parentClipId=parent_clip_id,
    )
    return result, operation_name, variables
