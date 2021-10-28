#!/usr/bin/env python3
"""Pagination - Simple helper function"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """calculate and return a range of indexes in a list"""
    last_index = page * page_size
    return (last_index - page_size, last_index)
