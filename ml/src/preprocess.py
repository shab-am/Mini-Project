import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder
import json
import os

df = pd.read_csv("data/raw/sar_dataset.csv")

df = df.drop_duplicates()
df = df.dropna()

le = LabelEncoder()
df['Aircraft_Name'] = le.fit_transform(df['Aircraft_Name'])

# Save the mapping as a dict: {original_name: encoded_value}
le_mapping = {name: int(code) for name, code in zip(le.classes_, le.transform(le.classes_))}

os.makedirs("models", exist_ok=True)
with open("models/aircraft_label_encoder.json", "w") as f:
    json.dump(le_mapping, f)

feature_columns = [
    'LKP_Latitude', 'LKP_Longitude', 'Speed_knots', 'Heading_deg',
    'Altitude_ft', 'Time_since_last_contact_min',
    'Wind_speed_knots', 'Wind_direction_deg'
]
scaler = StandardScaler()
df[feature_columns] = scaler.fit_transform(df[feature_columns])

# Save scaler parameters as JSON
scaler_params = {
    "mean_": scaler.mean_.tolist(),
    "scale_": scaler.scale_.tolist(),
    "var_": scaler.var_.tolist(),
    "n_features_in_": scaler.n_features_in_
}
with open("models/feature_scaler.json", "w") as f:
    json.dump(scaler_params, f)

os.makedirs("data/processed", exist_ok=True)
df.to_csv("data/processed/sar_preprocessed_dataset.csv", index=False)
print("Preprocessing complete. Cleaned file saved as 'data/processed/sar_preprocessed_dataset.csv'")
print("Scaler parameters saved as 'models/feature_scaler.json'")
print("Label encoder mapping saved as 'models/aircraft_label_encoder.json'")