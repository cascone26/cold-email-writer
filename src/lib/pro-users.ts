// Simple in-memory pro user store
// In production, use a database
const proUsers: Map<string, { stripeCustomerId: string; stripeSubscriptionId: string }> = new Map();

export function setProUser(
  email: string,
  stripeCustomerId: string,
  stripeSubscriptionId: string
) {
  proUsers.set(email, { stripeCustomerId, stripeSubscriptionId });
}

export function removeProUser(email: string) {
  proUsers.delete(email);
}

export function isProUser(email: string): boolean {
  return proUsers.has(email);
}

export function getProUserData(email: string) {
  return proUsers.get(email) ?? null;
}
