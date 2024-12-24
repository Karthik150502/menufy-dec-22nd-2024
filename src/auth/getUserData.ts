import { getSession } from "@/auth/getSession";

export async function currentUser() {
  const session = await getSession();

  return session?.user;
}

export async function currentRole() {
  const session = await getSession();

  return session?.user?.role;
}
