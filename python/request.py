import json
import os
import requests
import statistics
from datetime import datetime

CONFIG_PATH = os.getcwd() + '/config.json'
with open(CONFIG_PATH) as data_file:    
    config = json.load(data_file)

def gather_metrics(times):
	return {
		"max": max(times),
		"min": min(times),
		"avg": statistics.mean(times)
	}

def run_single_iter():
	session = requests.session()
	start = datetime.now()
	
	for path in config['paths']:
		url = 'https://' + config['host'] + path; 
		r = session.get(url, verify=True)
		if(r.status_code != 200):
			print(r.status_code)

	end = datetime.now()
	diff = (end - start).microseconds / 1000
	return diff
	

def run():
	exec_time = []
	for ite in range(config['iteration']):
		exec_time.append(run_single_iter())

	print(gather_metrics(exec_time))

if __name__ == '__main__':
	run()