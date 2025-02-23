import mongoose from "mongoose";

const PostDataSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  incomeMonthly: { type: Number, required: true },
  monthlyDebt: { type: Number, required: true },
  pan: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  employmentStatus: { type: String, required: true },
  defaults: { type: Number, required: true },
  loanPeriod: { type: Number, required: true },
  loanType: { type: String, required: true },
  creditScore: { type: Number, default: 700 }, // Assuming a default credit score
});

const PostData = mongoose.models.PostData || mongoose.model("PostData", PostDataSchema);

export default PostData;