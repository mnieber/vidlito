from django.db.models import Q


def join_clauses(clauses):
    if len(clauses) == 0:
        return Q()
    result = clauses[0]
    for clause in clauses[1:]:
        result = result & clause
    return result
