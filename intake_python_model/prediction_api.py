from flask import Flask, request, jsonify
from intakemodel import train_model, predict_water_intake
from flask_cors import CORS  # Import CORS from flask_cors

app = Flask(__name__)
CORS(app)

trained_model, columns_order = train_model()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Receive data from the POST request
        new_user_data = request.json
        
        # Use the trained model to predict water intake for the new user
        predicted_water_intake = predict_water_intake(trained_model, columns_order, new_user_data)
        
        return jsonify({'predicted_water_intake': predicted_water_intake})
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
