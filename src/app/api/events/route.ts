import { NextResponse } from "next/server";

export async function GET() {
  const events = [
    { id: "s1", name: "Cricket", type: "Sports", time: "10:00 AM", venue: "Main Grounds" },
    { id: "c1", name: "Dance Off", type: "Cultural", time: "05:00 PM", venue: "Open Air Theatre" }
  ];

  return NextResponse.json({ success: true, data: events });
}
