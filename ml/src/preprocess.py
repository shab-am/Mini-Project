import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder

df = pd.read_csv("ml/data/raw/sar_dataset.csv")

df = df.drop_duplicates()
df = df.dropna()

le = LabelEncoder()
df['Aircraft_Name'] = le.fit_transform(df['Aircraft_Name'])

feature_columns = [
    'LKP_Latitude', 'LKP_Longitude', 'Speed_knots', 'Heading_deg',
    'Altitude_ft', 'Time_since_last_contact_min',
    'Wind_speed_knots', 'Wind_direction_deg'
]
scaler = StandardScaler()
df[feature_columns] = scaler.fit_transform(df[feature_columns])

import joblib
joblib.dump(scaler, "ml/models/feature_scaler.pkl")

df.to_csv("ml/data/processed/sar_preprocessed_dataset.csv", index=False)
print("Preprocessing complete. Cleaned file saved as 'ml/data/processed/sar_preprocessed_dataset.csv'")