import SignUpForm from "@/components/signup-form";

export default function SignUpPage() {
  return (
    <div className="bg-gradient-to-br from-[var(--gradient-from)] via-[var(--gradient-via)] to-[var(--gradient-to)] flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <SignUpForm />
    </div>
  );
}
