#!/usr/bin/env python3
"""Duck type an iterable object"""
from typing import Sequence, Iterable, List, Tuple


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """element_length: type-annotated function that takes a list and returns
       a list of tuples
    Args:
       lst: a list
    Return:
       a list of tuples
    """
    return [(i, len(i)) for i in lst]
