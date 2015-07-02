import asyncio
import aiohttp
import json
import os
from datetime import datetime

CONFIG_PATH = os.getcwd() + '/config.json'
with open(CONFIG_PATH) as data_file:    
	config = json.load(data_file)

paths = ['https://' + config['host'] + path for path in config['paths']]

class Crawler:
	def __init__(self, loop):
		self.loop = loop
		self.connector = aiohttp.TCPConnector(share_cookies=True, loop=loop)

	@asyncio.coroutine
	def run(self):
		start = datetime.now()

		tasks = []
		for path in paths:
			tasks.append(asyncio.Task(self.process_url(path)))
		yield from asyncio.gather(*tasks)

		end = datetime.now()
		diff = (end - start).microseconds / 1000
		print(diff)

	@asyncio.coroutine
	def process_url(self, url):
		try:
			resp = yield from aiohttp.request(
				'get', url, connector=self.connector)
		except Exception as exc:
			print('...', url, 'has error', repr(str(exc)))
		else:
			print(resp.status)
			resp.close()

if __name__ == '__main__':
	loop = asyncio.get_event_loop()
	c = Crawler(loop)
	asyncio.Task(c.run())
	loop.run_until_complete()