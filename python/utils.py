import json
import os
import requests
import statistics
from datetime import datetime


def gather_metrics(times, total_time):
	times = [time.microseconds / 1000 for time in times]
	return {
		"requestsNumber": len(times),
		"totalTimePerSec": total_time.seconds,
		"numberRequestPerSec": len(times) / total_time.seconds,
		"max": max(times),
		"min": min(times),
		"avg": statistics.mean(times)
	}

class Config(object):
	def __init__(self, store_path):
		config_path = os.getcwd() + '/config.json'
		with open(config_path) as data_file:
			config = json.load(data_file)
			self.concurrency = config['concurrency']
			self.iterations = config['iterations']

		stores = []
		with open(store_path) as data_file:    
			for line in data_file:
				stores.append(json.loads(line))

		if self.iterations == None:
			self.iterations = len(stores)
		stores = stores[:self.iterations]

		for store in stores:
			store['url'] = "http://www.searsoutlet.com/d/store.jsp?store={}&cid=0&ps=50".format(store['store_id']);
		self.stores = stores
