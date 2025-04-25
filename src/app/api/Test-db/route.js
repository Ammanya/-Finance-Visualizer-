import { connectDB } from "@/lib/mongo";

export async function GET() {
  try {
    await connectDB();
    return new Response(JSON.stringify({ message: "MongoDB connected ✅" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Connection failed ❌" }), {
      status: 500,
    });
  }
}
