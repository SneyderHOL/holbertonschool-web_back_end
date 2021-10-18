#!/usr/bin/env python3
"""Complex types - mixed list"""
from typing import Union, List


def sum_mixed_list(mxd_list: List[Union[int, float]]) -> float:
    """sum_mixed_list: type-annotated function that takes a list of integers
       and floats and return their sum as a float
    Args:
       mxd_list: a list of integers and floats numbers to perform sum
    Return:
       the sum of all list elements
    """
    return sum(mxd_list)
