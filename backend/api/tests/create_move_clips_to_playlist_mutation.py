def create_move_clips_to_playlist_mutation(
    src_playlist_id, dest_playlist_id, clip_ids, copy, output_values=None
):
    result = """
        mutation moveClipsToPlaylist(
            $srcPlaylistId: UUID!
            $destPlaylistId: UUID!
            $clipIds: [UUID]!
            $copy: Boolean!
        ) {
            moveClipsToPlaylist(
                srcPlaylistId: $srcPlaylistId
                destPlaylistId: $destPlaylistId
                clipIds: $clipIds
                copy: $copy
            ) {
                output_values
            }
        }
    """.replace(
        "output_values", ", ".join(output_values or [])
    )

    operation_name = "moveClipsToPlaylist"
    variables = dict(
        srcPlaylistId=src_playlist_id,
        destPlaylistId=dest_playlist_id,
        clipIds=clip_ids,
        copy=copy,
    )
    return result, operation_name, variables
