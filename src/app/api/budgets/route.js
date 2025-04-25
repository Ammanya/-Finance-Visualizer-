import { connectDB } from "@/lib/mongo";
import { Budget } from "@/models/Budget";

export async function GET() {
  try {
    await connectDB();
    const budgets = await Budget.find();
    return new Response(JSON.stringify(budgets), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch budgets" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const newBudget = await Budget.create(body);
    return new Response(JSON.stringify(newBudget), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to add budget" }), { status: 500 });
  }
}
