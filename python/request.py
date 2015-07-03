#!/usr/bin/env python3

import json
import os
import requests
import statistics
from datetime import datetime
from utils import Config, gather_metrics

store_path = os.getcwd() + '/stores.json'
config = Config(store_path)

def run_single_iter(url):
	session = requests.session()
	start = datetime.now()
	r = session.get(url, verify=True)

	if(r.status_code != 200):
		print(r.status_code)
	diff = datetime.now() - start
	return diff
	

def run():
	exec_time = []
	start = datetime.now()
	
	for store in config.stores:
		time = run_single_iter(store['url'])
		exec_time.append(time)

	total_time = datetime.now() - start
	print(gather_metrics(exec_time, total_time))

if __name__ == '__main__':
	run()