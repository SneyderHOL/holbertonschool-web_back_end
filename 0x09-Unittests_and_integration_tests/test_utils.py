#!/usr/bin/env python3
"""Unittests and Integration Tests module"""
import unittest
import requests
from utils import access_nested_map, get_json, memoize
from parameterized import parameterized
from unittest.mock import Mock, patch


class TestAccessNestedMap(unittest.TestCase):
    """Test class for access_nested_map"""

    @parameterized.expand([
        ({'a': 1}, ('a',), 1),
        ({'a': {'b': 2}}, ('a',), {'b': 2}),
        ({'a': {'b': 2}}, ('a', 'b'), 2)
    ])
    def test_access_nested_map(self, nested_map, path, expected):
        """unit test for utils.access_nested_map"""
        self.assertEqual(access_nested_map(nested_map, path), expected)

    @parameterized.expand([
        ({}, ('a',), KeyError),
        ({'a': 1}, ('a', 'b'), KeyError)
    ])
    def test_access_nested_map_exception(self, nested_map, path, expected):
        """unit test for utils.access_nested_map's exceptions"""
        self.assertRaises(KeyError)


class TestGetJson(unittest.TestCase):
    """Test class for get_json"""
    @parameterized.expand([
        ('http://example.com', {"payload": True}),
        ('http://holberton.io', {"payload": False})
    ])
    def test_get_json(self, url, payload):
        """Mock test for utils.get_json"""
        config = {'return_value.json.return_value': payload}
        patcher = patch('requests.get', **config)
        mock_response = patcher.start()
        self.assertEqual(get_json(url), payload)
        mock_response.assert_called_once_with(url)
        patcher.stop()


class TestMemoize(unittest.TestCase):
    """Test class for memoize"""
    def test_memoize(self):
        """Test memoize method"""
        class TestClass:
            """Test class for a_method and a_property"""
            def a_method(self):
                """Testing method returning a number"""
                return 42

            @memoize
            def a_property(self):
                """Testing memoization by calling a_method"""
                return self.a_method()

        with patch.object(TestClass, 'a_method', return_value=42) as mock:
            test_object = TestClass()
            return_val = test_object.a_property
            return_val = test_object.a_property
            self.assertEqual(return_val, 42)
        mock.assert_called_once()
