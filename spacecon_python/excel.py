import requests
server_ip = "10.101.25.151"  # Replace with your server's IP
url = f"http://{server_ip}:8080/api/export/excel"

response = requests.get(url)

if response.status_code == 200:
    with open("exported_data.xlsx", "wb") as file:
        file.write(response.content)
    print("Excel file downloaded successfully.")
else:
    print(f"Failed to fetch data. Status code: {response.status_code}")