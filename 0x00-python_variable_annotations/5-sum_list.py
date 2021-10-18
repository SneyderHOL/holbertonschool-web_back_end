#!/usr/bin/env python3
"""Complex types - list of floats"""
from typing import List


def sum_list(input_list: List[float]) -> float:
    """sum_list: type-annotated function that takes a list of floats argument
       and return their sum as a float
    Args:
       input_list: a list of float numbers to perform sum
    Return:
       the sum of all list elements
    """
    return sum(input_list)
