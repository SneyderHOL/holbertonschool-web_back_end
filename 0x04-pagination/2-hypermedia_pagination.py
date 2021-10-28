#!/usr/bin/env python3
"""Pagination - Hypermedia pagination"""

import csv
import math
from typing import List, Dict, Any

index_range = __import__('0-simple_helper_function').index_range


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Function that returns the appropriate page of the dataset
        """
        assert type(page) is int and type(page_size) is int
        assert page > 0 and page_size > 0
        data = []
        dataset_length = len(self.dataset())
        initial, end = index_range(page=page, page_size=page_size)
        if initial >= dataset_length:
            return data
        for i in range(initial, end):
            if i < dataset_length:
                data.append(self.dataset()[i])
        return data

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
        """Function that returns the appropriate page of the dataset
        """
        assert type(page) is int and type(page_size) is int
        assert page > 0 and page_size > 0
        dataset_length = len(self.dataset())
        data = self.get_page(page, page_size)
        total_pages = math.ceil(dataset_length / page_size)
        next_page = None if page > total_pages else page + 1
        prev_page = None if page == 1 else page - 1
        page_size = len(data)
        return {
            'page_size': page_size, 'page': page, 'data': data,
            'next_page': next_page, 'prev_page': prev_page,
            'total_pages': total_pages
        }
