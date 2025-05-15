import { LoginForm } from "@/components/login-form";
import PublicRoute from "@/components/providers/PublicRoute";

export default function LoginPage() {
  return (
    <PublicRoute>
      <div className="bg-gradient-to-br from-[var(--gradient-from)] via-[var(--gradient-via)] to-[var(--gradient-to)] flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <LoginForm />
      </div>
    </PublicRoute>
  );
}
