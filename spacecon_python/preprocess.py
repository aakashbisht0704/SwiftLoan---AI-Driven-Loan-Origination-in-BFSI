import pandas as pd
import joblib
from sklearn.preprocessing import StandardScaler

def preprocess_data(file_path):
    df = pd.read_csv("exported_data.csv")  # Load CSV data

    # Fill missing values
    df.fillna(df.median(numeric_only=True), inplace=True)
    df.fillna(df.mode().iloc[0], inplace=True)

    # Select only relevant features
    selected_features = ['Credit Score', 'DTI', 'Defaults', 'Loan Status']
    df = df[selected_features]

    # Convert categorical feature "Defaults" (Yes/No) into binary (0/1)
    df['Defaults'] = df['Defaults'].map({'Yes': 1, 'No': 0})

    # Feature Scaling for numerical columns
    scaler = StandardScaler()
    df[['Credit Score', 'DTI']] = scaler.fit_transform(df[['Credit Score', 'DTI']])

    # Save the scaler for future use
    joblib.dump(scaler, "models/scaler.pkl")
    print("✅ Scaler saved as 'models/scaler.pkl'")

    return df

# Run preprocessing and save processed data
if __name__ == "__main__":
    df = preprocess_data("loan_data.csv")
    df.to_csv("processed_loan_data.csv", index=False)  # Save processed data
    print("✅ Preprocessed data saved as 'processed_loan_data.csv'")
