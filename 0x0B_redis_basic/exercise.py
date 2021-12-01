#!/usr/bin/env python3
"""Redis Basic module"""
import redis
import uuid
from typing import Union, Optional, Callable
from functools import wraps


def count_calls(method: Callable) -> Callable:
    """System to count how many times methods of the Cache class are called"""
    key = method.__qualname__

    @wraps(method)
    def wrapper(self, arg):
        """Wrapper function inside count_calls decorator"""
        method_result = method(self, arg)
        self._redis.incr(key)
        return method_result
    return wrapper


def call_history(method: Callable) -> Callable:
    """Store the history of inputs and outputs for a particular function"""
    inputs = method.__qualname__ + ':inputs'
    outputs = method.__qualname__ + ':outputs'

    @wraps(method)
    def wrapper(self, *args):
        """Wrapper function inside call_history decorator"""
        self._redis.rpush(inputs, str(args))
        method_result = method(self, *args)
        self._redis.rpush(outputs, str(method_result))
        return method_result
    return wrapper


def replay(method: Callable) -> Callable:
    """Display the history of calls of a particular function"""
    init_index = 0
    end_index = -1
    utf_f = 'utf-8'
    _redis = redis.Redis()
    key = method.__qualname__
    value = _redis.get(key).decode(utf_f)
    inputs = _redis.lrange(key + ':inputs', init_index, end_index)
    outputs = _redis.lrange(key + ':outputs', init_index, end_index)
    print('{} was called {} times:'.format(key, value))
    for i, o in zip(inputs, outputs):
        print('{}(*{}) -> {}'.format(key, k.decode(utf_f), v.decode(utf_f)))


class Cache:
    """Cache class"""
    def __init__(self):
        """Initialize a Cache instance"""
        self._redis = redis.Redis()
        self._redis.flushdb()

    @call_history
    @count_calls
    def store(self, data: Union[str, bytes, int, float]) -> str:
        """Store the input data in Redis using the random key
           and return the key"""
        key = str(uuid.uuid4())
        self._redis.set(key, data)
        return key

    def get(self, key: str, fn: Optional[Callable] = None) -> Union[
            str, bytes, int, float]:
        """Reading from Redis and recovering original type"""
        if key is None:
            return None
        value = self._redis.get(key)
        if value is None or fn is None:
            return value
        return fn(value)

    def get_str(self, key: str) -> str:
        """Conversion function to string"""
        if key is None:
            return None
        return self.get(key, str)

    def get_int(self, key: str) -> int:
        """Conversion function to integer"""
        if key is None:
            return None
        return self.get(key, int)
