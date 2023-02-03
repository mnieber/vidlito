def create_get_user_profile_query(
    user_profile_outputs=None,
):
    result = """
        query getUserProfile {
            getUserProfile {
                user_profile {
                    user_profile_outputs
                }
            }
        }
    """.replace(
        "user_profile_outputs", ", ".join(user_profile_outputs or [])
    )

    operation_name = "getUserProfile"
    variables = dict()
    return result, operation_name, variables
