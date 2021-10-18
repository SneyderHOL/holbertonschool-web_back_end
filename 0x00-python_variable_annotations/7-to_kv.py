#!/usr/bin/env python3
"""Complex types - string and int/float to tuple"""
from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """to_kv: type-annotated function that takes a string k and an int or a
       float as argument and returns a tuple
    Args:
       k: string argument to perfom operation
       v: integer or float number to perfom operation
    Return:
       a tuple, first element is the string k and second element is the square
       of v
    """
    return (k, v ** 2)
