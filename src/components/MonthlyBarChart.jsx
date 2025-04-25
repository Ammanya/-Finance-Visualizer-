"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyBarChart({ data }) {
  const monthlyData = data.reduce((acc, txn) => {
    if (!txn.date || !txn.amount) return acc;
    const date = new Date(txn.date);
    if (isNaN(date)) return acc;
    const month = date.toLocaleString("default", { month: "short", year: "numeric" });
    acc[month] = (acc[month] || 0) + Number(txn.amount);
    return acc;
  }, {});

  const chartData = Object.entries(monthlyData).map(([month, total]) => ({
    month,
    total,
  }));

  console.log("Chart data for bar chart:", chartData);

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" type="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
