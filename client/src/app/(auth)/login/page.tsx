import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your TechSol Media account.",
};

export default function LoginPage() {
  return <LoginForm />;
}
