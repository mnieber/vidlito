def get_terms_and_tags(input_string):
    words = [word.strip() for word in input_string.split(" ") if word.strip()]
    tags = [word[1:] for word in words if word.startswith("#")]
    terms = [word for word in words if not word.startswith("#")]
    return {"terms": terms, "tags": tags}
