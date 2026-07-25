import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/features/auth/components";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Set a new password for your TechSol Media account.",
};

function ResetPasswordContent({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  return (
    <Suspense fallback={<div className="glass-card rounded-2xl p-8 animate-pulse h-80" />}>
      <ResetPasswordWrapper searchParams={searchParams} />
    </Suspense>
  );
}

async function ResetPasswordWrapper({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <p className="text-muted-foreground">
          Invalid or missing reset token. Please request a new password reset
          link.
        </p>
      </div>
    );
  }

  return <ResetPasswordForm token={token} />;
}

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  return <ResetPasswordContent searchParams={searchParams} />;
}
