def insert_id(ids, parent_id, id):
    pos = ids.index(parent_id) + 1 if parent_id else len(ids)
    return ids[:pos] + [id] + ids[pos:]


def sort_items(items, keys, get_key):
    for item in items:
        new_sort_pos = keys.index(get_key(item))
        assert new_sort_pos >= 0
        if new_sort_pos != item.sort_pos:
            item.sort_pos = new_sort_pos
            item.save()
