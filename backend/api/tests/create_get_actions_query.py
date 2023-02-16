def create_get_actions_query(
    playlist_id,
    action_set_outputs=None,
):
    result = """
        query getActions(
            $playlistId: ID!,
        ) {
            getActions(
                $playlistId: playlistId,
            ) {
                action_set {
                    action_set_outputs
                }
            }
        }
    """.replace(
        "action_set_outputs", ", ".join(action_set_outputs or [])
    )

    operation_name = "getActions"
    variables = dict(
        playlistId=playlist_id,
    )
    return result, operation_name, variables
