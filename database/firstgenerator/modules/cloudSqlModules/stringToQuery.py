import sqlalchemy


def stringToQuery(str):
    query = sqlalchemy.text(
        str
    )
    return query
