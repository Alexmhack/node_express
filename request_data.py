import requests

URL = 'http://127.0.0.1:{}'
PORT = 3000

response = requests.get(URL.format(PORT))
json = response.json()

print(json)