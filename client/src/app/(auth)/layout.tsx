import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4 py-12">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-md">
          TS
        </span>
        <span className="text-xl font-semibold tracking-tight">
          TechSol <span className="gradient-text">Media</span>
        </span>
      </Link>

      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
