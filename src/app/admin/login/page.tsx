import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";
import Logo from "@/components/Logo";

export const metadata: Metadata = { title: "Admin Login | Mountain Ride Ooty" };

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-forest-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo dark />
        </div>
        <div className="bg-forest border-2 border-mustard/30 rounded-vintage p-8 shadow-vintage">
          <h1 className="font-display text-xl text-cream tracking-wide text-center mb-6">ADMIN LOGIN</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
