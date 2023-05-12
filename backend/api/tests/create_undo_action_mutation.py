def create_undo_action_mutation(action_id, output_values=None):
    result = """
        mutation undoAction(
            $actionId: UUID!
        ) {
            undoAction(
                actionId: $actionId
            ) {
                output_values
            }
        }
    """.replace(
        "output_values", ", ".join(output_values or [])
    )

    operation_name = "undoAction"
    variables = dict(
        actionId=action_id,
    )
    return result, operation_name, variables
