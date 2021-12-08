#!/usr/bin/env python3
"""List all documents in Python module"""


def list_all(mongo_collection):
    """Lists all documents in a collection"""
    documents = mongo_collection.find()
    if documents:
        return documents
    else:
        return []
