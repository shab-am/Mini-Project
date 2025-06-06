# ml/src/train.py
import pandas as pd
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    mean_absolute_error, mean_squared_error, r2_score,
    explained_variance_score, max_error
)
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import joblib

# Load preprocessed data
df = pd.read_csv("data/processed/sar_preprocessed_dataset.csv")

# Features and targets
feature_columns = [
    'LKP_Latitude', 'LKP_Longitude', 'Speed_knots', 'Heading_deg',
    'Altitude_ft', 'Time_since_last_contact_min',
    'Wind_speed_knots', 'Wind_direction_deg', 'Aircraft_Name'
]
target_lat = 'Crash_Latitude'
target_long = 'Crash_Longitude'

X = df[feature_columns]
y = df[[target_lat, target_long]]

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train separate models for latitude and longitude
xgb_lat = XGBRegressor(objective='reg:squarederror', n_estimators=100, random_state=42, learning_rate=0.03)
xgb_long = XGBRegressor(objective='reg:squarederror', n_estimators=100, random_state=42, learning_rate=0.03)

xgb_lat.fit(X_train, y_train[target_lat])
xgb_long.fit(X_train, y_train[target_long])

# Save models
xgb_lat.save_model("models/xgb_lat.json")
xgb_long.save_model("models/xgb_long.json")

# Predict
y_pred_lat = xgb_lat.predict(X_test)
y_pred_long = xgb_long.predict(X_test)
y_pred_xgb = np.column_stack((y_pred_lat, y_pred_long))

# Metrics
mae_xgb = mean_absolute_error(y_test, y_pred_xgb)
mse_xgb = mean_squared_error(y_test, y_pred_xgb)
rmse_xgb = np.sqrt(mse_xgb)
r2_xgb = r2_score(y_test, y_pred_xgb)
explained_var_xgb = explained_variance_score(y_test, y_pred_xgb)
max_err_lat = max_error(y_test[target_lat], y_pred_lat)
max_err_long = max_error(y_test[target_long], y_pred_long)
mean_target_xgb = np.mean(np.abs(y_test.values))
accuracy_xgb = 100 - (mae_xgb / mean_target_xgb * 100)

print("===== XGBoost Performance =====")
print(f"Mean Absolute Error (MAE): {mae_xgb:.4f}")
print(f"Mean Squared Error (MSE): {mse_xgb:.4f}")
print(f"Root Mean Squared Error (RMSE): {rmse_xgb:.4f}")
print(f"R² Score: {r2_xgb:.4f}")
print(f"Explained Variance: {explained_var_xgb:.4f}")
print(f"Max Error - Latitude: {max_err_lat:.4f}")
print(f"Max Error - Longitude: {max_err_long:.4f}")
print(f"Accuracy (based on MAE): {accuracy_xgb:.2f}%")

plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
sns.scatterplot(x=y_test[target_lat], y=y_pred_lat, alpha=0.5, color='orange')
plt.xlabel("Actual Latitude")
plt.ylabel("Predicted Latitude")
plt.title("XGBoost - Actual vs Predicted Latitude")

plt.subplot(1, 2, 2)
sns.scatterplot(x=y_test[target_long], y=y_pred_long, alpha=0.5, color='purple')
plt.xlabel("Actual Longitude")
plt.ylabel("Predicted Longitude")
plt.title("XGBoost - Actual vs Predicted Longitude")

plt.tight_layout()
plt.show()