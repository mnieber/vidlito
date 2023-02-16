def create_get_actions_query(
    playlist_slug,
    action_set_outputs=None,
):
    result = """
        query getActions(
            $playlistSlug: String!,
        ) {
            getActions(
                $playlistSlug: playlistSlug,
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
        playlistSlug=playlist_slug,
    )
    return result, operation_name, variables
