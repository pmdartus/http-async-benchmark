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