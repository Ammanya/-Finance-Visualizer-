import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  date: Date,
  category: {
    type: String,
    enum: ["Groceries", "Bills", "Entertainment", "Transport", "Other"],
    default: "Other",
  },
});

export const Transaction =
  mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
