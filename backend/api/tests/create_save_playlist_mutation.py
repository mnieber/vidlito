def create_save_playlist_mutation(playlist_form, output_values=None):
    result = """
        mutation savePlaylist(
            $playlistForm: PlaylistFormT!
        ) {
            savePlaylist(
                playlistForm: $playlistForm
            ) {
                output_values
            }
        }
    """.replace(
        "output_values", ", ".join(output_values or [])
    )

    operation_name = "savePlaylist"
    variables = dict(
        playlistForm=playlist_form.kwargs,
    )
    return result, operation_name, variables
