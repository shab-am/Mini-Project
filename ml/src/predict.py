# ml/src/predict.py
from flask import Flask, request, jsonify
import xgboost as xgb
import pandas as pd
import numpy as np
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load scaler parameters
with open("models/feature_scaler.json", "r") as f:
    scaler_params = json.load(f)

# Load label encoder mapping (save this as a dict during preprocessing)
with open("models/aircraft_label_encoder.json", "r") as f:
    le_mapping = json.load(f)

# Load models
xgb_lat = xgb.XGBRegressor()
xgb_lat.load_model("models/xgb_lat.json")
xgb_long = xgb.XGBRegressor()
xgb_long.load_model("models/xgb_long.json")

feature_columns = [
    'LKP_Latitude', 'LKP_Longitude', 'Speed_knots', 'Heading_deg',
    'Altitude_ft', 'Time_since_last_contact_min',
    'Wind_speed_knots', 'Wind_direction_deg', 'Aircraft_Name'
]

@app.route('/')
def home():
    return "<h2>Flask ML Prediction API is running on port 5050!</h2><p>Use POST /predict to get predictions.</p>"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    df = pd.DataFrame([data])

    # Encode Aircraft_Name
    df['Aircraft_Name'] = df['Aircraft_Name'].map(le_mapping)

    # Scale features
    for i, col in enumerate(feature_columns[:-1]):
        df[col] = (df[col] - scaler_params['mean_'][i]) / scaler_params['scale_'][i]

    # Predict
    lat = xgb_lat.predict(df[feature_columns])[0]
    long = xgb_long.predict(df[feature_columns])[0]
    return jsonify({'Crash_Latitude': float(lat), 'Crash_Longitude': float(long)})

if __name__ == '__main__':
    print("==============================================")
    print("  Flask ML Prediction API is UP on port 5050! ")
    print("  Visit http://127.0.0.1:5050/ to check.      ")
    print("==============================================")
    app.run(port=5050)