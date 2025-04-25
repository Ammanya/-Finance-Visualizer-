// components/DashboardSummary.jsx
"use client";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardSummary({ transactions }) {
  if (!transactions || transactions.length === 0) return null;

  // 💸 Total Expenses
  const totalExpenses = transactions.reduce((acc, txn) => acc + Number(txn.amount), 0);

  // 📂 Category Breakdown
  const categoryTotals = transactions.reduce((acc, txn) => {
    const category = txn.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + Number(txn.amount);
    return acc;
  }, {});

  // 🕒 Most Recent Transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      {/* 💸 Total Expenses */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2">Total Expenses</h2>
          <p className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</p>
        </CardContent>
      </Card>

      {/* 📂 Category Breakdown */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2">Category Breakdown</h2>
          <ul className="space-y-1">
            {Object.entries(categoryTotals).map(([category, amount]) => (
              <li key={category} className="flex justify-between">
                <span>{category}</span>
                <span>₹{amount.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 🕒 Recent Transactions */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
          <ul className="space-y-1">
            {recentTransactions.map((txn) => (
              <li key={txn._id || txn.id} className="flex justify-between text-sm">
                <span>{txn.description}</span>
                <span>₹{txn.amount}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
