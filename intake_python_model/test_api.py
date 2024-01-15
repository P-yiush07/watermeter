import requests

# Sample data for prediction
new_user_data = {
    'Age': 35,
    'Weight': 70,
    'Activity Level_moderate': 1,
    'Activity Level_sedentary': 0,
    'Activity Level_active': 0,
    # You may need to adjust/add more data according to the expected input format
}

# URL of the API endpoint
url = 'http://127.0.0.1:5000/predict'  # Replace with the actual URL where your Flask server is running

# Send POST request to the API endpoint
response = requests.post(url, json=new_user_data)

# Check the response
if response.status_code == 200:
    result = response.json()
    print(f"Predicted Water Intake: {result['predicted_water_intake']} ml")
else:
    print(f"Failed with status code: {response.status_code}")
