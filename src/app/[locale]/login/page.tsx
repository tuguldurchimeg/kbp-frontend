import { LoginForm } from "@/components/login-form";
import PublicRoute from "@/components/PublicRoute";

export default function LoginPage() {
  return (
    <PublicRoute>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm />
        </div>
      </div>
    </PublicRoute>
  );
}
