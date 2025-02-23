import joblib
import preprocess
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# Load & preprocess dataset
df = preprocess.preprocess_data("loan_data.csv")

# Train-Test Split
X = df.drop(columns=['Loan Status'])  # Features
y = df['Loan Status'].map({'approved': 1, 'rejected': 0})  # Convert labels to 1/0

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Train Model
model = LogisticRegression(class_weight='balanced', max_iter=500)
model.fit(X_train, y_train)

# Evaluate Model
y_pred = model.predict(X_test)
print("✅ Accuracy:", accuracy_score(y_test, y_pred))
print("✅ Classification Report:\n", classification_report(y_test, y_pred))

# Save Model
joblib.dump(model, "models/loan_approval_model.pkl")
print("✅ Model training complete. Saved as 'models/loan_approval_model.pkl'")
