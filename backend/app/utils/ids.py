def insert_id(ids, parent_id, id):
    if parent_id:
        idx = ids.index(parent_id)
        return ids[: idx + 1] + [id] + ids[idx + 1 :]
    else:
        return ids + [id]


def sort_items(items, keys, get_key):
    for item in items:
        new_sort_pos = keys.index(get_key(item))
        assert new_sort_pos >= 0
        if new_sort_pos != item.sort_pos:
            item.sort_pos = new_sort_pos
            item.save()
