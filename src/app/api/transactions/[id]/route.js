import { connectDB } from "@/lib/mongo";
import { Transaction } from "@/models/Transaction";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const updated = await Transaction.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!updated) {
      return new Response(JSON.stringify({ error: "Transaction not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to update" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Transaction.findByIdAndDelete(params.id);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to delete" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
