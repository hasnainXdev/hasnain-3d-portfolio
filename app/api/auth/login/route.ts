import { NextResponse } from "next/server";
import { generateAuthUrl } from "@/lib/googleAuth";

export async function GET() {
  const url = generateAuthUrl();
  return NextResponse.redirect(url);
}
