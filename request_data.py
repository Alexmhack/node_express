import requests
import json

URL = 'http://127.0.0.1:3000/api/v1/reflections'

def create(data):
	data = json.dumps(data)
	headers = {'content-type': 'application/json'}
	response = requests.post(URL, data=data, headers=headers)
	return response


def update(id, data):
	data = json.jumps(data)
	headers = {'content-type': 'application/json'}
	URL += '/{}'.format(id)
	response = requests.post(URL, data=data, headers=headers)
	return response


def getAll():
	response = requests.get(URL)
	return response


def getOne(id):
	headers = {'content-type': 'application/json'}
	get_url = URL + '/{}'.format(id)
	print(get_url)
	response = requests.get(get_url)
	return response


def display_data(data):
	print(data)
	json_data = data.json()
	display = json.dumps(json_data, indent=4)
	print(display)


data1 = {
	'success': 'NodeJs first tutorial completed',
	'lowPoint': 'Two more tutorials left',
	'takeAway': 'Learned conecepts of NodeJs API'
}

data2 = {
	"success": "complete nodejs tutorial",
	"lowPoint": "time consuming",
	"takeAway": "learn a new language"
}

data3 = {
	"success": "complete nodejs first tutorial",
	"lowPoint": "little difficult due to new language",
	"takeAway": "learned something new"
}

create_data = create(data1)
display_data(create_data)

res = getAll()
display_data(res)

data_id = getOne("3d09085c-1634-4b66-a380-63f3f2c4bb36")
# get_one_data = getOne(data_id)
# display_data(data_id)
print(data_id.status_code, data_id.reason)
