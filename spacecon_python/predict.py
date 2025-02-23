import joblib
import pandas as pd

# Load Model & Scaler
model = joblib.load("models/loan_approval_model.pkl")
scaler = joblib.load("models/scaler.pkl")

def predict_loan_approval(data):
    # Convert input data to DataFrame
    columns = ['Credit Score', 'DTI', 'Defaults']
    df = pd.DataFrame([data], columns=columns)

    # Scale numerical data
    df[['Credit Score', 'DTI']] = scaler.transform(df[['Credit Score', 'DTI']])

    # Predict
    prediction = model.predict(df)
    return "You are eligible" if prediction[0] == 1 else "You are not eligible"

# Example user input
user_input = [800, 80, 0]  # Credit Score, DTI, Defaults (0 = No, 1 = Yes)
print(predict_loan_approval(user_input))
