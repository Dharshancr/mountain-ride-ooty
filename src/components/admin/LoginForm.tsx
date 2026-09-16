"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  loginAdmin,
  type LoginState,
} from "@/app/admin/login/actions";

const initialState: LoginState = { status: "idle" };

const inputClass =
  "w-full rounded-vintage border-2 border-brown/30 bg-white px-4 py-2.5 text-sm font-sans text-charcoal focus:outline-none focus:border-mustard";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full inline-flex justify-center items-center rounded-vintage bg-mustard text-forest-dark font-sans font-bold text-base px-6 py-3.5 hover:bg-mustard-light transition-colors disabled:opacity-60"
    >
      {pending ? "Signing in..." : "Sign In"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(
    loginAdmin,
    initialState
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.status === "error" && state.message && (
        <p className="text-sm text-cream bg-rust rounded-vintage px-4 py-3">
          {state.message}
        </p>
      )}

      <label className="block">
        <span className="block text-sm font-semibold text-cream mb-1.5">
          Email
        </span>

        <input
          type="email"
          name="email"
          className={inputClass}
          required
          autoFocus
        />
      </label>

      <label className="block">
        <span className="block text-sm font-semibold text-cream mb-1.5">
          Password
        </span>

        <input
          type="password"
          name="password"
          className={inputClass}
          required
        />
      </label>

      <SubmitButton />
    </form>
  );
}