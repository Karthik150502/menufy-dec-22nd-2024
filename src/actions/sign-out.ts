'use client'
import { signOut as logOut } from "next-auth/react";

export async function signOut() {
  await logOut();
}
