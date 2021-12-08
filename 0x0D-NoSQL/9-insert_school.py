#!/usr/bin/env python3
"""Insert a document in Python module"""


def insert_school(mongo_collection, **kwargs):
    """Inserts a new document in a collection based on kwargs"""
    document = mongo_collection.insert_one(kwargs)
    return document.inserted_id
