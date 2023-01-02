def create_get_playlists_query(
    playlists_outputs=None,
):
    result = """
        query getPlaylists {
            getPlaylists {
                playlists {
                    playlists_outputs
                }
            }
        }
    """.replace(
        "playlists_outputs", ", ".join(playlists_outputs or [])
    )

    operation_name = "getPlaylists"
    variables = dict()
    return result, operation_name, variables
