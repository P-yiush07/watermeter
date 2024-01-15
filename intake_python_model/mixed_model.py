import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.ensemble import RandomForestRegressor
import matplotlib.pyplot as plt

# Load the merged dataset
data = pd.read_csv('merged_water_intake_data.csv')

# Perform one-hot encoding for 'Activity Level' column
data = pd.get_dummies(data, columns=['Activity Level'])

# Features (age, weight, and encoded activity levels) for prediction
features = ['Age', 'Weight', 'Activity Level_sedentary', 'Activity Level_moderate', 'Activity Level_active']

# Target variable (Water Intake in ml)
target = 'Water Intake (ml)'

# Split the data into features and target
X = data[features]
y = data[target]

# Split the data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train a RandomForestRegressor
model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)

# Use the trained model to predict water intake for the test set
predictions = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, predictions)

# Example of new user data (replace this with actual new data)
new_user_data = {
    'Age': 20,
    'Weight': 55,
    'Activity Level_sedentary': 0,  # Replace with appropriate encoded activity level
    'Activity Level_moderate': 0,
    'Activity Level_active': 1,
}

# Use the trained model to predict water intake for the new user
predicted_water_intake = model.predict(pd.DataFrame([new_user_data]))[0]

# Define time intervals and their corresponding portions of predicted daily intake
time_intervals = {
    'Morning': 0.2,
    'Mid-Morning': 0.1,
    'Lunchtime': 0.15,
    'Afternoon': 0.2,
    'Evening': 0.25,
    'Before Bed': 0.1
}

# Calculate the intake amounts for each time interval
intake_schedule = {interval: round(predicted_water_intake * portion, 2) for interval, portion in time_intervals.items()}

# Calculate the remaining intake to reach the daily goal
remaining_intake = predicted_water_intake

# Create lists for plotting
intervals = list(intake_schedule.keys())
intake_amounts = list(intake_schedule.values())

# Plotting the intake schedule with value labels
plt.figure(figsize=(10, 6))
bars = plt.bar(intervals, intake_amounts, color='skyblue')
plt.title('Predicted Water Intake Schedule')
plt.xlabel('Time Intervals')
plt.ylabel('Water Intake (ml)')
plt.xticks(rotation=45)
plt.tight_layout()

# Add value labels on top of the bars
for bar, value in zip(bars, intake_amounts):
    plt.text(bar.get_x() + bar.get_width() / 2, bar.get_height(), str(value), ha='center', va='bottom')


print(f"Mean Squared Error: {mse}")

# Display the detailed calculated intake amounts for each time interval
print("Water Intake Schedule:")
for interval, portion in intake_schedule.items():
    intake = min(portion, remaining_intake)
    print(f"{interval}: {intake} ml")
    remaining_intake -= intake

print("Predicted Intake: ", predicted_water_intake)

# Display the bar chart with value labels
plt.show()
