"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const BudgetBarChart = dynamic(() => import("../components/BudgetBarChart"), { ssr: false });



const MonthlyBarChart = dynamic(() => import("../components/MonthlyBarChart"), { ssr: false });
const CategoryPieChart = dynamic(() => import("../components/CategoryPieChart"), { ssr: false });
const SpendingInsights = dynamic(() => import("../components/SpendingInsights"), { ssr: false });


import DashboardSummary from "@/components/DashboardSummary";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: "",
    category: "Other",
  });
  const [budgetForm, setBudgetForm] = useState({
    category: "",
    limit: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(Array.isArray(data) ? data : []));

    fetch("/api/budgets")
      .then((res) => res.json())
      .then((data) => setBudgets(Array.isArray(data) ? data : []));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `/api/transactions/${editId}` : "/api/transactions";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (isEditing) {
      setTransactions(transactions.map((txn) => (txn._id === editId ? data : txn)));
      setIsEditing(false);
      setEditId(null);
    } else {
      setTransactions([data, ...transactions]);
    }

    setForm({ amount: "", description: "", date: "", category: "Other" });
  };

  const handleDelete = async (id) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    setTransactions(transactions.filter((txn) => txn._id !== id));
  };

  const handleBudgetChange = (e) => {
    setBudgetForm({ ...budgetForm, [e.target.name]: e.target.value });
  };

  const handleBudgetSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(budgetForm),
    });
    const newBudget = await res.json();
    setBudgets([newBudget, ...budgets]);
    setBudgetForm({ category: "", limit: "" });
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">💰 Aone Finance</h1>

      {/* 💡 Summary Cards */}
      <DashboardSummary transactions={transactions} />

      {/* ➕ Transaction Form */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Groceries">Groceries</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Transport">Transport</option>
          <option value="Other">Other</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>

      {/* 📋 Transaction List */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">📋 Transactions</h2>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <ul className="space-y-2">
            {transactions.map((txn) => (
              <li
                key={txn._id}
                className="border p-3 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{txn.description}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(txn.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Category: {txn.category}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="font-bold">${txn.amount}</span>
                  <button
                    onClick={() => {
                      setForm({
                        amount: txn.amount,
                        description: txn.description,
                        date: txn.date.slice(0, 10),
                        category: txn.category,
                      });
                      setEditId(txn._id);
                      setIsEditing(true);
                    }}
                    className="text-yellow-500 hover:text-yellow-700 ml-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(txn._id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🎯 Budgets */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🎯 Set Budgets</h2>
        <form onSubmit={handleBudgetSubmit} className="space-y-3 mb-4">
          <select
            name="category"
            value={budgetForm.category}
            onChange={handleBudgetChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Groceries">Groceries</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Transport">Transport</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="number"
            name="limit"
            placeholder="Limit"
            value={budgetForm.limit}
            onChange={handleBudgetChange}
            className="w-full border p-2 rounded"
            required
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            type="submit"
          >
            Save Budget
          </button>
        </form>

        <ul className="space-y-2">
          {budgets.length === 0 ? (
            <p className="text-sm text-gray-600">No budgets set yet.</p>
          ) : (
            budgets.map((b) => (
              <li key={b._id} className="border p-3 rounded">
                <p className="font-medium">
                  {b.category}: <span className="font-bold">${b.limit}</span>
                </p>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* 📊 Charts */}
      <CategoryPieChart data={transactions} />
      <h2 className="text-xl font-semibold mb-2">📊 Monthly Expenses</h2>
      <MonthlyBarChart data={transactions} />
      <BudgetBarChart budgets={budgets} transactions={transactions} />
      <SpendingInsights budgets={budgets} transactions={transactions} />

    </main>
  );
}
