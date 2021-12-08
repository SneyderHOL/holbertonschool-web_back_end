#!/usr/bin/env python3
"""Log stats"""
from pymongo import MongoClient


if __name__ == "__main__":
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    client = MongoClient('mongodb://127.0.0.1:27017')
    db = client.logs
    nginx_collection = db.nginx
    print(f'{nginx_collection.count_documents({})} logs')
    print('Methods:')
    for method in methods:
        method_count = nginx_collection.count_documents({'method': method})
        print(f'\tmethod {method}: {method_count}')
    status_check_count = nginx_collection.count_documents(
      {'method': 'GET', 'path': '/status'})
    print(f'{status_check_count} status check')
