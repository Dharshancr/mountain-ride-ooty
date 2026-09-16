"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  submitCustomTour,
  type CustomTourState,
} from "@/app/(site)/custom-tour/actions";
import { vehicleOptions } from "@/lib/fallback-content";

const initialState: CustomTourState = { status: "idle" };

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
      {pending ? "Submitting..." : "Plan My Trip"}
    </button>
  );
}

export default function CustomTourForm() {
  const [state, formAction] = useActionState(
    submitCustomTour,
    initialState
  );

  if (state.status === "success") {
    return (
      <div className="bg-cream border-2 border-mustard rounded-vintage p-8 text-center shadow-vintage">
        <h3 className="font-display text-2xl text-forest tracking-wide">
          TRIP REQUEST RECEIVED
        </h3>

        <p className="text-sm text-charcoal/70 mt-3">
          Your reference number:
        </p>

        <p className="font-display text-3xl text-rust tracking-widest mt-1">
          {state.referenceId}
        </p>

        <p className="text-sm text-charcoal/70 mt-4">
          Our team will get in touch to plan the details.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="bg-cream border-2 border-brown/30 rounded-vintage p-6 md:p-8 shadow-vintage space-y-5"
      style={{
        backgroundImage:
          "repeating-linear-gradient(rgba(107,74,49,0.06) 0px, rgba(107,74,49,0.06) 1px, transparent 1px, transparent 28px)",
      }}
    >
      {state.status === "error" && state.message && (
        <p className="text-sm text-cream bg-rust rounded-vintage px-4 py-3">
          {state.message}
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        <label className="block">
          <span className="block text-sm font-semibold text-charcoal mb-1.5">
            Full Name
          </span>

          <input
            name="fullName"
            className={inputClass}
            required
          />
        </label>

        <label className="block">
          <span className="block text-sm font-semibold text-charcoal mb-1.5">
            Mobile Number
          </span>

          <input
            name="mobileNumber"
            className={inputClass}
            required
          />
        </label>

        <label className="block md:col-span-2">
          <span className="block text-sm font-semibold text-charcoal mb-1.5">
            Destinations
          </span>

          <input
            name="destinations"
            className={inputClass}
            placeholder="e.g. Ooty, Coonoor, Pykara"
            required
          />
        </label>

        <label className="block">
          <span className="block text-sm font-semibold text-charcoal mb-1.5">
            Number of People
          </span>

          <input
            type="number"
            min={1}
            name="numberOfPeople"
            className={inputClass}
            required
          />
        </label>

        <label className="block">
          <span className="block text-sm font-semibold text-charcoal mb-1.5">
            Number of Days
          </span>

          <input
            type="number"
            min={1}
            name="numberOfDays"
            className={inputClass}
            required
          />
        </label>

        <label className="block">
          <span className="block text-sm font-semibold text-charcoal mb-1.5">
            Travel Dates
          </span>

          <input
            name="travelDates"
            className={inputClass}
            placeholder="e.g. 12–15 Dec"
            required
          />
        </label>

        <label className="block">
          <span className="block text-sm font-semibold text-charcoal mb-1.5">
            Pickup Location
          </span>

          <input
            name="pickupLocation"
            className={inputClass}
            required
          />
        </label>

        <label className="block md:col-span-2">
          <span className="block text-sm font-semibold text-charcoal mb-1.5">
            Preferred Vehicle
          </span>

          <select
            name="preferredVehicle"
            className={inputClass}
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select a vehicle
            </option>

            {vehicleOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
      </div>

      <SubmitButton />
    </form>
  );
}