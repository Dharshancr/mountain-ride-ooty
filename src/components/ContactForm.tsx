"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  submitContactEnquiry,
  type ContactState,
} from "@/app/(site)/contact/actions";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "w-full rounded-vintage border-2 border-brown/30 bg-white/70 px-4 py-2.5 text-sm font-sans text-charcoal focus:outline-none focus:border-rust";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full inline-flex justify-center items-center rounded-vintage bg-rust text-cream font-sans font-bold text-base px-6 py-4 shadow-vintage hover:bg-rust-light transition-colors disabled:opacity-60"
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(
    submitContactEnquiry,
    initialState
  );

  if (state.status === "success") {
    return (
      <div className="bg-cream border-2 border-mustard rounded-vintage p-8 text-center shadow-vintage">
        <h3 className="font-display text-xl text-forest tracking-wide">
          MESSAGE SENT
        </h3>

        <p className="text-sm text-charcoal/70 mt-3">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="bg-cream border-2 border-brown/30 rounded-vintage p-6 md:p-8 shadow-vintage space-y-5"
    >
      {state.status === "error" && state.message && (
        <p className="text-sm text-cream bg-rust rounded-vintage px-4 py-3">
          {state.message}
        </p>
      )}

      <label className="block">
        <span className="block text-sm font-semibold text-charcoal mb-1.5">
          Name
        </span>

        <input
          name="name"
          className={inputClass}
          required
        />
      </label>

      <label className="block">
        <span className="block text-sm font-semibold text-charcoal mb-1.5">
          Mobile Number
        </span>

        <input
          name="mobile"
          className={inputClass}
          required
        />
      </label>

      <label className="block">
        <span className="block text-sm font-semibold text-charcoal mb-1.5">
          Email (optional)
        </span>

        <input
          type="email"
          name="email"
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className="block text-sm font-semibold text-charcoal mb-1.5">
          Message
        </span>

        <textarea
          name="message"
          rows={4}
          className={inputClass}
          required
        />
      </label>

      <SubmitButton />
    </form>
  );
}