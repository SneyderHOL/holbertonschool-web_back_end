#!/usr/bin/env python3
"""Caching system - LFU Caching"""

BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """LFU Caching system with a Least Frequently Used
       cache replacement policy
    """
    def __init__(self):
        """Class Initializer"""
        super().__init__()
        self.key_counter = {}
        self.counter_cache = {}

    def put(self, key, item):
        """Add an item in the cache"""
        if key is None or item is None:
            return
        counter = 0
        if self.cache_data.get(key, None):
            del(self.cache_data[key])
            counter = self.key_counter[key]
            self.remove_counter(counter, key)
            counter += 1
        self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            counter_idx = sorted(list(self.counter_cache))[0]
            least_recent = list(self.counter_cache[counter_idx])[0]
            self.remove_counter(counter_idx, least_recent)
            print('DISCARD: {}'.format(least_recent))
            del(self.cache_data[least_recent])
        self.insert_counter(counter, key)

    def get(self, key):
        """Get an item by key"""
        if key is None:
            return None
        try:
            item = self.cache_data[key]
            del(self.cache_data[key])
            counter = self.key_counter[key]
            self.remove_counter(counter, key)
            counter += 1
            self.cache_data[key] = item
            self.insert_counter(counter, key)
            return item
        except KeyError:
            return None

    def remove_counter(self, counter, key):
        """Remove an element from counter_cache"""
        self.counter_cache[counter].pop(key)
        self.key_counter.pop(key)
        if len(self.counter_cache[counter]) == 0:
            del(self.counter_cache[counter])

    def insert_counter(self, counter, key):
        """Add an element to counter_cache and key_counter"""
        if self.counter_cache.get(counter, None):
            self.counter_cache[counter][key] = counter
        else:
            self.counter_cache[counter] = {key: counter}
        self.key_counter[key] = counter
