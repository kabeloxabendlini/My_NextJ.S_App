import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  return NextResponse.json({
    message: `Hello ${name || "Guest"}`,
    status: "success"
  });
}