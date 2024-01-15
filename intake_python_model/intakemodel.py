import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split


def train_model():
    # Load the dataset
    data = pd.read_csv('larger_synthetic_water_intake_data.csv')
    data = data.drop('Daily Routines', axis=1)

    # Separate features and target variable
    X = data.drop('Water Intake (ml)', axis=1)
    y = data['Water Intake (ml)']

    # Perform one-hot encoding for the 'Activity Level' column
    X = pd.get_dummies(X, columns=['Activity Level'], drop_first=False)

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Initialize and train the model
    model = LinearRegression()
    model.fit(X_train, y_train)

    return model, X_train.columns

def predict_water_intake(model, columns_order, new_user_data):
    try:
        # Convert the received data to a DataFrame
        new_user_df = pd.DataFrame([new_user_data])
        
        # Reorder columns in the new user data to match the order of columns in the training set
        new_user_df = new_user_df.reindex(columns=columns_order, fill_value=0)
        
        # Use the trained model to predict water intake for the new user
        predicted_water_intake = model.predict(new_user_df)
        
        return predicted_water_intake[0]
    
    except Exception as e:
        return str(e)
