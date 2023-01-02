GRAPHENE = {
    "APPROVED_QUERY_CRCS": [
        "56556edf116ed5d946a6a0fa7e00eb42",  # deletePlaylist
        "f8325accd94bc735bad1f2d92d9c95be",  # saveClip
        "f2e571ba8c685525ec03fa035b5b69b5",  # savePlaylist
        "690ada8445106f2245504174213ecc93",  # deleteClips
        "3b96113e682658b6d876d8deaa4e0d8a",  # saveClipOrdering
        "af9c8cc42bfc38f042eb78e9d49d8995",  # getPlaylists
    ],
    "MIDDLEWARE": [
        "graphql_jwt.middleware.JSONWebTokenMiddleware",
        "api.middleware.GraphqlCheckCRCMiddleware",
    ],
    "SCHEMA": "api.schema.schema",
    "TESTING_ENDPOINT": "/graphql/",
}
