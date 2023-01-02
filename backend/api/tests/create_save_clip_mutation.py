def create_save_clip_mutation(clip_form, output_values=None):
    result = """
        mutation saveClip(
            $clipForm: ClipFormT!
        ) {
            saveClip(
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
        clipForm=clip_form.kwargs,
    )
    return result, operation_name, variables
