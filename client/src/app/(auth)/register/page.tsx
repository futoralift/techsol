import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your TechSol Media account.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
