import { connectDB } from "@/lib/mongo";
import { Transaction } from "@/models/Transaction";

export async function GET() {
  try {
    await connectDB();
    const txns = await Transaction.find().sort({ date: -1 });
    return new Response(JSON.stringify(txns), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const newTxn = await Transaction.create(body);
    return new Response(JSON.stringify(newTxn), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to add" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
