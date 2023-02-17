def create_get_actions_query(
    playlist_slug_id,
    action_set_outputs=None,
):
    result = """
        query getActions(
            $playlistSlugId: String!,
        ) {
            getActions(
                $playlistSlugId: playlistSlugId,
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
        playlistSlugId=playlist_slug_id,
    )
    return result, operation_name, variables
