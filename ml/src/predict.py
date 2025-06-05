# ml/src/predict.py
from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Load models and scaler
xgb_lat = joblib.load("ml/models/xgb_lat.pkl")
xgb_long = joblib.load("ml/models/xgb_long.pkl")
scaler = joblib.load("ml/models/feature_scaler.pkl")
le = joblib.load("ml/models/aircraft_label_encoder.pkl")  # Save your LabelEncoder during preprocessing

feature_columns = [
    'LKP_Latitude', 'LKP_Longitude', 'Speed_knots', 'Heading_deg',
    'Altitude_ft', 'Time_since_last_contact_min',
    'Wind_speed_knots', 'Wind_direction_deg', 'Aircraft_Name'
]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    df = pd.DataFrame([data])

    # Encode Aircraft_Name
    df['Aircraft_Name'] = le.transform(df['Aircraft_Name'])

    # Scale features (excluding Aircraft_Name if it's categorical)
    df[feature_columns[:-1]] = scaler.transform(df[feature_columns[:-1]])

    lat = xgb_lat.predict(df[feature_columns])[0]
    long = xgb_long.predict(df[feature_columns])[0]
    return jsonify({'Crash_Latitude': float(lat), 'Crash_Longitude': float(long)})

if __name__ == '__main__':
    app.run(port=5000)