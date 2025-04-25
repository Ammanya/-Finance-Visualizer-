"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BudgetBarChart({ budgets, transactions }) {
  if (!budgets || !transactions) return null;

  // Group actual expenses by category
  const actualSpending = transactions.reduce((acc, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + Number(txn.amount);
    return acc;
  }, {});

  // Prepare data for chart
  const data = budgets.map((budget) => ({
    category: budget.category,
    budget: Number(budget.limit),
    spent: actualSpending[budget.category] || 0,
  }));

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold mb-2">📊 Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" name="Budget Limit" />
          <Bar dataKey="spent" fill="#82ca9d" name="Actual Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
