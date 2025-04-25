"use client";

export default function SpendingInsights({ budgets, transactions }) {
  if (!budgets || !transactions) return null;

  // Calculate total spent per category
  const actualSpending = transactions.reduce((acc, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + Number(txn.amount);
    return acc;
  }, {});

  // Compare each budget category with actual spent
  const insights = budgets.map((b) => {
    const spent = actualSpending[b.category] || 0;
    return {
      category: b.category,
      budget: Number(b.limit),
      spent,
      status: spent > b.limit ? "overspent" : "within",
    };
  });

  // Get top 3 spending categories
  const topSpending = Object.entries(actualSpending)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold mb-2">🧠 Spending Insights</h2>

      <div className="space-y-2">
        <h3 className="font-semibold">📌 Budget Check</h3>
        {insights.map((insight) => (
          <div
            key={insight.category}
            className={`border p-3 rounded ${
              insight.status === "overspent" ? "border-red-400 bg-red-50" : "border-green-400 bg-green-50"
            }`}
          >
            <p>
              <strong>{insight.category}</strong>: You{" "}
              {insight.status === "overspent" ? (
                <>
                  <span className="text-red-600 font-semibold">overspent</span>{" "}
                  by ${insight.spent - insight.budget}
                </>
              ) : (
                <>
                  are <span className="text-green-600 font-semibold">within budget</span> – good job!
                </>
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="font-semibold">💸 Top Spending Categories</h3>
        {topSpending.map(([cat, amount]) => (
          <div key={cat} className="border p-2 rounded">
            <strong>{cat}</strong>: ${amount}
          </div>
        ))}
      </div>
    </div>
  );
}
