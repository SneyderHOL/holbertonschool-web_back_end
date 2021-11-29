#!/usr/bin/env python3
"""Unittests and Integration Tests module"""
import unittest
from client import GithubOrgClient
from parameterized import parameterized
from unittest.mock import Mock, patch, PropertyMock


class TestGithubOrgClient(unittest.TestCase):
    """Test class for GithubOrgClient class"""
    @parameterized.expand([
        ('google'),
        ('abc')
    ])
    @patch('client.get_json')
    def test_org(self, org_name, mock):
        """unit test for test_org method"""
        client_obj = GithubOrgClient(org_name)
        client_obj.org()
        mock.assert_called_once_with('https://api.github.com/orgs/' + org_name)

    def test_public_repos_url(self):
        """unit test for GithubOrgClient _public_repos_url property"""
        with patch('client.GithubOrgClient.org',
                   new_callable=PropertyMock) as mock_property:
            return_dict = {'repos_url': 'World'}
            mock_property.return_value = return_dict
            client_obj = GithubOrgClient('org_name')
            repos_url = client_obj._public_repos_url
            self.assertEqual(repos_url, return_dict['repos_url'])

    @patch('client.get_json')
    def test_public_repos(self, mock):
        """unit test for GithubOrgClient public_repos method"""
        expected_repos = ['repo1', 'repo2']
        mock.return_value = [{'name': expected_repos[0]},
                             {'name': expected_repos[1]}]
        with patch('client.GithubOrgClient._public_repos_url',
                   new_callable=PropertyMock) as mock_repos:
            client_obj = GithubOrgClient('org_name')
            mock_repos.return_value = 'https://api.github.com/orgs/org_name'
            self.assertEqual(client_obj.public_repos(), expected_repos)
            mock.assert_called_once()
        mock_repos.assert_called_once()

    @parameterized.expand([
        ({"license": {"key": "my_license"}}, "my_license", True),
        ({"license": {"key": "other_license"}}, "my_license", False)
    ])
    def test_has_license(self, repo, license_key, expected):
        """unit test for GithubOrgClient has_license static method"""
        has_license_result = GithubOrgClient.has_license(repo, license_key)
        self.assertEqual(has_license_result, expected)
