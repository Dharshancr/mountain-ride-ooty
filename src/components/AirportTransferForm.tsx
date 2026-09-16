"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  submitAirportTransfer,
  type AirportTransferState,
} from "@/app/(site)/airport-transfer/actions";
import { vehicleOptions } from "@/lib/fallback-content";
import { buildWhatsAppLink } from "@/lib/whatsapp";
const initialState: AirportTransferState = { status: "idle" };
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
      {" "}
      {pending ? "Submitting..." : "Book Airport Transfer"}{" "}
    </button>
  );
}
export default function AirportTransferForm({
  whatsappNumber,
}: {
  whatsappNumber: string;
}) {
  const [state, formAction] = useActionState(
    submitAirportTransfer,
    initialState,
  );
  if (state.status === "success") {
    return (
      <div className="bg-cream border-2 border-mustard rounded-vintage p-8 text-center shadow-vintage">
        {" "}
        <h3 className="font-display text-2xl text-forest tracking-wide">
          {" "}
          REQUEST RECEIVED{" "}
        </h3>{" "}
        <p className="text-sm text-charcoal/70 mt-3">
          {" "}
          Your reference number:{" "}
        </p>{" "}
        <p className="font-display text-3xl text-rust tracking-widest mt-1">
          {" "}
          {state.referenceId}{" "}
        </p>{" "}
        <p className="text-sm text-charcoal/70 mt-4">
          {" "}
          We&apos;ll confirm your pickup shortly.{" "}
        </p>{" "}
      </div>
    );
  }
  return (
    <form
      action={formAction}
      className="bg-cream border-2 border-brown/30 rounded-vintage p-6 md:p-8 shadow-vintage space-y-5"
    >
      {" "}
      {state.status === "error" && state.message && (
        <p className="text-sm text-cream bg-rust rounded-vintage px-4 py-3">
          {" "}
          {state.message}{" "}
        </p>
      )}{" "}
      <div className="grid md:grid-cols-2 gap-5">
        {" "}
        <label className="block">
          {" "}
          <span className="block text-sm font-semibold text-charcoal mb-1.5">
            {" "}
            Full Name{" "}
          </span>{" "}
          <input name="fullName" className={inputClass} required />{" "}
          {state.fieldErrors?.fullName && (
            <span className="text-xs text-rust">
              {" "}
              {state.fieldErrors.fullName}{" "}
            </span>
          )}{" "}
        </label>{" "}
        <label className="block">
          {" "}
          <span className="block text-sm font-semibold text-charcoal mb-1.5">
            {" "}
            Mobile Number{" "}
          </span>{" "}
          <input name="mobileNumber" className={inputClass} required />{" "}
          {state.fieldErrors?.mobileNumber && (
            <span className="text-xs text-rust">
              {" "}
              {state.fieldErrors.mobileNumber}{" "}
            </span>
          )}{" "}
        </label>{" "}
        <label className="block">
          {" "}
          <span className="block text-sm font-semibold text-charcoal mb-1.5">
            {" "}
            Pickup Date{" "}
          </span>{" "}
          <input
            type="date"
            name="pickupDate"
            className={inputClass}
            required
          />{" "}
        </label>{" "}
        <label className="block">
          {" "}
          <span className="block text-sm font-semibold text-charcoal mb-1.5">
            {" "}
            Flight Arrival Time{" "}
          </span>{" "}
          <input
            type="time"
            name="flightArrivalTime"
            className={inputClass}
            required
          />{" "}
        </label>{" "}
        <label className="block">
          {" "}
          <span className="block text-sm font-semibold text-charcoal mb-1.5">
            {" "}
            Passengers{" "}
          </span>{" "}
          <input
            type="number"
            min={1}
            name="passengers"
            className={inputClass}
            required
          />{" "}
        </label>{" "}
        <label className="block">
          {" "}
          <span className="block text-sm font-semibold text-charcoal mb-1.5">
            {" "}
            Luggage (optional){" "}
          </span>{" "}
          <input
            name="luggage"
            className={inputClass}
            placeholder="e.g. 2 large bags"
          />{" "}
        </label>{" "}
        <label className="block md:col-span-2">
          {" "}
          <span className="block text-sm font-semibold text-charcoal mb-1.5">
            {" "}
            Vehicle Required{" "}
          </span>{" "}
          <select
            name="vehicleRequired"
            className={inputClass}
            required
            defaultValue=""
          >
            {" "}
            <option value="" disabled>
              {" "}
              Select a vehicle{" "}
            </option>{" "}
            {vehicleOptions.map((v) => (
              <option key={v} value={v}>
                {" "}
                {v}{" "}
              </option>
            ))}{" "}
          </select>{" "}
        </label>{" "}
      </div>{" "}
      <SubmitButton />{" "}
      <a
        href={buildWhatsAppLink(
          whatsappNumber,
          "Hi, I'd like to book a Coimbatore Airport to Ooty transfer.",
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex justify-center items-center rounded-vintage border-2 border-forest text-forest font-bold px-6 py-4 hover:bg-forest hover:text-cream transition-colors"
      >
        {" "}
        WhatsApp Us Instead{" "}
      </a>{" "}
    </form>
  );
}
