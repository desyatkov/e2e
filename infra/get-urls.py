#!/usr/bin/env python3
import json
import sys
import xmltodict
from urllib.parse import urlparse
from urllib.request import urlopen

url_list = []
domain = sys.argv[1]


def homepage(domain_name=""):
    base_url = '{}/sitemap.xml'.format(domain_name)
    file = urlopen(base_url)
    data = file.read()
    file.close()

    data = xmltodict.parse(data)
    return data


data_xml = homepage(domain)

for data_row in data_xml['urlset']['url']:
    url_parsed = urlparse(data_row['loc'])
    path = '/index' if url_parsed.path == '/' else url_parsed.path
    url_list.append(path)

print(json.dumps({"data": url_list}, sort_keys=True, indent=4, separators=(',', ': ')))

