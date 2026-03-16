import { cookies } from "next/headers";

export interface Session {
  email: string;
  isPro: boolean;
  stripeCustomerId?: string;
}

export function getSession(): Session | null {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("colddraft_session");
  if (!sessionCookie) return null;

  try {
    return JSON.parse(sessionCookie.value) as Session;
  } catch {
    return null;
  }
}

export function setSessionCookie(session: Session): string {
  return `colddraft_session=${JSON.stringify(session)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`;
}

export function clearSessionCookie(): string {
  return `colddraft_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
