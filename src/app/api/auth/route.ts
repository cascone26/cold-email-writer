import { NextRequest, NextResponse } from "next/server";
import { isProUser } from "@/lib/pro-users";
import { setSessionCookie, clearSessionCookie } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const isPro = isProUser(normalizedEmail);

    const session = {
      email: normalizedEmail,
      isPro,
    };

    const response = NextResponse.json({
      success: true,
      email: normalizedEmail,
      isPro,
    });

    response.headers.set("Set-Cookie", setSessionCookie(session));

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.headers.set("Set-Cookie", clearSessionCookie());
  return response;
}
