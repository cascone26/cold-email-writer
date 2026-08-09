import { NextRequest, NextResponse } from "next/server";
import { getAnthropic, SYSTEM_PROMPT } from "@/lib/anthropic";
import { checkRateLimit } from "@/lib/rate-limit";
import { isProUser } from "@/lib/pro-users";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productName, productDescription, targetAudience, senderName, senderTitle } = body;

    if (!productName || !productDescription || !targetAudience || !senderName) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Check if user is pro (via cookie)
    let isPro = false;
    const sessionCookie = req.cookies.get("colddraft_session");
    if (sessionCookie) {
      try {
        const session = JSON.parse(sessionCookie.value);
        isPro = isProUser(session.email);
      } catch {
        // ignore
      }
    }

    // Rate limit for free users
    if (!isPro) {
      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("x-real-ip") ||
        "unknown";
      const limit = checkRateLimit(ip);

      if (!limit.allowed) {
        return NextResponse.json(
          {
            error: "Free daily limit reached. Upgrade to Pro for unlimited generations.",
            resetAt: limit.resetAt,
          },
          { status: 429 }
        );
      }

      // Generate with remaining count for free users
      const emails = await generateEmails(
        productName,
        productDescription,
        targetAudience,
        senderName,
        senderTitle
      );

      return NextResponse.json({ emails, remaining: limit.remaining });
    }

    // Pro user — no limits
    const emails = await generateEmails(
      productName,
      productDescription,
      targetAudience,
      senderName,
      senderTitle
    );

    return NextResponse.json({ emails });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate emails. Please try again." },
      { status: 500 }
    );
  }
}

async function generateEmails(
  productName: string,
  productDescription: string,
  targetAudience: string,
  senderName: string,
  senderTitle: string
) {
  const userMessage = `Generate 3 cold email variants for:

Product/Service: ${productName}
What it does: ${productDescription}
Target audience: ${targetAudience}
Sender name: ${senderName}
Sender title: ${senderTitle || "N/A"}

Remember: return ONLY the JSON array, no markdown or code fences.`;

  const response = await getAnthropic().messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Parse the JSON response
  const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const emails = JSON.parse(cleaned);

  return emails;
}
