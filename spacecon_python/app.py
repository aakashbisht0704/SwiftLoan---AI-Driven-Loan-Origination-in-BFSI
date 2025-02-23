from pymongo import MongoClient
import joblib
import pandas as pd
import time

# Connect to MongoDB Atlas
uri = "mongodb+srv://jai:jai123@cluster0.2m2ro.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)

# Get collections
db = client["spaceCon"]
req_details = db["postdatas"]  # Source collection
result_collection = db["zeroTest"]  # Destination collection

print("✅ Connected to MongoDB Atlas!")

# Load ML Model & Scaler
model = joblib.load("models/loan_approval_model.pkl")
scaler = joblib.load("models/scaler.pkl")


def process_and_predict(data):
    """Extracts required fields, preprocesses, and predicts loan approval."""
    try:
        credit_score = float(data.get("creditScore", 0))  # Ensure float
        dti = float(data.get("dti", 0))
        defaults = 1 if int(data.get("defaults", 0)) > 0 else 0  # Convert to binary

        # Create DataFrame for model input
        input_df = pd.DataFrame([[credit_score, dti, defaults]], columns=["Credit Score", "DTI", "Defaults"])

        # Scale numerical features
        input_df[["Credit Score", "DTI"]] = scaler.transform(input_df[["Credit Score", "DTI"]])

        # Predict Loan Status
        prediction = model.predict(input_df)[0]
        loan_status = "You are Eligible" if prediction == 1 else "You are not Eligible"

        return loan_status
    except Exception as e:
        print(f"⚠️ Error processing data: {e}")
        return None


def process_and_store(data):
    """Processes the data, predicts, and stores it in zeroTest."""
    if result_collection.find_one({"_id": data["_id"]}):
        print(f"⏩ Skipping duplicate: {data['_id']} (Already processed)")
        return  # Skip if already processed

    loan_status = process_and_predict(data)
    if loan_status:
        data["loanstatus"] = loan_status  # Add prediction to document
        result_collection.insert_one(data)  # Store in zeroTest
        print(f"📜 Stored Data in zeroTest: {data['_id']} - {loan_status}")


def fetch_past_data():
    """Fetch and process past data."""
    past_data = req_details.find()
    for data in past_data:
        process_and_store(data)


def watch_real_time():
    """Watch for new incoming data in real-time."""
    with req_details.watch() as stream:
        for change in stream:
            if "fullDocument" in change:
                full_doc = change["fullDocument"]
                process_and_store(full_doc)


# Run past data processing
fetch_past_data()

# Start real-time listening
while True:
    try:
        print("🚀 Watching for real-time updates...")
        watch_real_time()
    except Exception as e:
        print(f"⚠️ Error in watch stream: {e}. Restarting in 5 seconds...")
        time.sleep(5)  # Prevent crash loop
