import { NextRequest, NextResponse } from "next/server";
import { getGoogleOAuthClient } from "@/lib/googleAuth";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Authorization code missing" }, { status: 400 });
  }

  const oAuth2Client = getGoogleOAuthClient();
  const { tokens } = await oAuth2Client.getToken(code);

  // Save tokens.refresh_token somewhere (e.g., DB)
  console.log("Refresh Token:", tokens.refresh_token);

  return NextResponse.json({ success: true, tokens });
}
