"use client";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import {
  submitBooking,
  type BookingActionState,
} from "@/app/(site)/booking/actions";
import { vehicleOptions, serviceOptions } from "@/lib/fallback-content";
import { buildBookingWhatsAppMessage, buildWhatsAppLink } from "@/lib/whatsapp";
const initialState: BookingActionState = { status: "idle" };
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full inline-flex justify-center items-center rounded-vintage bg-rust text-cream font-sans font-bold text-base px-6 py-4 shadow-vintage hover:bg-rust-light transition-colors disabled:opacity-60"
    >
      {" "}
      {pending ? "Submitting..." : "Submit Booking Request"}{" "}
    </button>
  );
}
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      {" "}
      <span className="block text-sm font-sans font-semibold text-charcoal mb-1.5">
        {" "}
        {label}{" "}
      </span>{" "}
      {children}{" "}
      {error && (
        <span className="block text-xs text-rust mt-1"> {error} </span>
      )}{" "}
    </label>
  );
}
const inputClass =
  "w-full rounded-vintage border-2 border-brown/30 bg-white/70 px-4 py-2.5 text-sm font-sans text-charcoal focus:outline-none focus:border-rust";
export default function BookingForm({
  whatsappNumber,
}: {
  whatsappNumber: string;
}) {
  const [state, formAction] = useActionState(submitBooking, initialState);
  const params = useSearchParams();
  const presetVehicle = params.get("vehicle") || "";
  const presetPackage = params.get("package") || "";
  const [values, setValues] = useState({
    fullName: "",
    mobileNumber: "",
    travelDate: "",
    pickupLocation: "",
    dropLocation: "",
    passengers: "",
    vehicleRequired: presetVehicle,
    serviceRequired: presetPackage ? "CUSTOM_PACKAGE" : "",
  });
  if (state.status === "success") {
    const waMessage = buildBookingWhatsAppMessage({
      fullName: values.fullName,
      travelDate: values.travelDate,
      pickupLocation: values.pickupLocation,
      dropLocation: values.dropLocation,
      passengers: values.passengers,
      vehicleRequired: values.vehicleRequired,
      serviceRequired: values.serviceRequired,
    });
    return (
      <div className="bg-cream border-2 border-mustard rounded-vintage p-8 text-center shadow-vintage">
        {" "}
        <span className="inline-block h-14 w-14 rounded-full bg-forest text-mustard flex items-center justify-center mx-auto mb-4">
          {" "}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {" "}
            <path d="M20 6L9 17l-5-5" />{" "}
          </svg>{" "}
        </span>{" "}
        <h3 className="font-display text-2xl text-forest tracking-wide">
          {" "}
          YOUR MOUNTAIN RIDE REQUEST HAS BEEN RECEIVED{" "}
        </h3>{" "}
        <p className="text-sm text-charcoal/70 mt-3">
          {" "}
          Your booking reference is:{" "}
        </p>{" "}
        <p className="font-display text-3xl text-rust tracking-widest mt-1">
          {" "}
          {state.referenceId}{" "}
        </p>{" "}
        <p className="text-sm text-charcoal/70 mt-4">
          {" "}
          Our team will contact you shortly to confirm your ride. You can also
          reach us directly:{" "}
        </p>{" "}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-5">
          {" "}
          <a
            href={buildWhatsAppLink(whatsappNumber, waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center rounded-vintage bg-forest text-cream font-semibold text-sm px-6 py-3"
          >
            {" "}
            Message Us on WhatsApp{" "}
          </a>{" "}
          <a
            href={`tel:+91${whatsappNumber.replace(/\D/g, "").slice(-10)}`}
            className="inline-flex justify-center items-center rounded-vintage bg-mustard text-forest-dark font-semibold text-sm px-6 py-3"
          >
            {" "}
            Call Us Now{" "}
          </a>{" "}
        </div>{" "}
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
        <Field label="Full Name" error={state.fieldErrors?.fullName}>
          {" "}
          <input
            name="fullName"
            className={inputClass}
            value={values.fullName}
            onChange={(e) =>
              setValues((v) => ({ ...v, fullName: e.target.value }))
            }
            required
          />{" "}
        </Field>{" "}
        <Field label="Mobile Number" error={state.fieldErrors?.mobileNumber}>
          {" "}
          <input
            name="mobileNumber"
            className={inputClass}
            value={values.mobileNumber}
            onChange={(e) =>
              setValues((v) => ({ ...v, mobileNumber: e.target.value }))
            }
            placeholder="10-digit mobile number"
            required
          />{" "}
        </Field>{" "}
        <Field
          label="WhatsApp Number (optional)"
          error={state.fieldErrors?.whatsappNumber}
        >
          {" "}
          <input
            name="whatsappNumber"
            className={inputClass}
            placeholder="If different from mobile"
          />{" "}
        </Field>{" "}
        <Field label="Travel Date" error={state.fieldErrors?.travelDate}>
          {" "}
          <input
            type="date"
            name="travelDate"
            className={inputClass}
            value={values.travelDate}
            onChange={(e) =>
              setValues((v) => ({ ...v, travelDate: e.target.value }))
            }
            required
          />{" "}
        </Field>{" "}
        <Field
          label="Pickup Location"
          error={state.fieldErrors?.pickupLocation}
        >
          {" "}
          <input
            name="pickupLocation"
            className={inputClass}
            value={values.pickupLocation}
            onChange={(e) =>
              setValues((v) => ({ ...v, pickupLocation: e.target.value }))
            }
            required
          />{" "}
        </Field>{" "}
        <Field
          label="Drop Location (optional)"
          error={state.fieldErrors?.dropLocation}
        >
          {" "}
          <input
            name="dropLocation"
            className={inputClass}
            value={values.dropLocation}
            onChange={(e) =>
              setValues((v) => ({ ...v, dropLocation: e.target.value }))
            }
          />{" "}
        </Field>{" "}
        <Field
          label="Number of Passengers"
          error={state.fieldErrors?.passengers}
        >
          {" "}
          <input
            type="number"
            min={1}
            name="passengers"
            className={inputClass}
            value={values.passengers}
            onChange={(e) =>
              setValues((v) => ({ ...v, passengers: e.target.value }))
            }
            required
          />{" "}
        </Field>{" "}
        <Field
          label="Vehicle Required"
          error={state.fieldErrors?.vehicleRequired}
        >
          {" "}
          <select
            name="vehicleRequired"
            className={inputClass}
            value={values.vehicleRequired}
            onChange={(e) =>
              setValues((v) => ({ ...v, vehicleRequired: e.target.value }))
            }
            required
          >
            {" "}
            <option value="">Select a vehicle</option>{" "}
            {vehicleOptions.map((v) => (
              <option key={v} value={v}>
                {" "}
                {v}{" "}
              </option>
            ))}{" "}
          </select>{" "}
        </Field>{" "}
        <Field
          label="Service Required"
          error={state.fieldErrors?.serviceRequired}
        >
          {" "}
          <select
            name="serviceRequired"
            className={inputClass}
            value={values.serviceRequired}
            onChange={(e) =>
              setValues((v) => ({ ...v, serviceRequired: e.target.value }))
            }
            required
          >
            {" "}
            <option value="">Select a service</option>{" "}
            {serviceOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {" "}
                {s.label}{" "}
              </option>
            ))}{" "}
          </select>{" "}
        </Field>{" "}
      </div>{" "}
      <Field label="Message / Special Requirements (optional)">
        {" "}
        <textarea name="message" rows={3} className={inputClass} />{" "}
      </Field>{" "}
      <SubmitButton />{" "}
      <div className="text-center text-sm text-charcoal/60"> or </div>{" "}
      <a
        href={buildWhatsAppLink(
          whatsappNumber,
          buildBookingWhatsAppMessage({
            fullName: values.fullName || "(your name)",
            travelDate: values.travelDate || "(travel date)",
            pickupLocation: values.pickupLocation || "(pickup location)",
            dropLocation: values.dropLocation,
            passengers: values.passengers || "(passengers)",
            vehicleRequired: values.vehicleRequired || "(vehicle)",
            serviceRequired: values.serviceRequired || "(service)",
          }),
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex justify-center items-center rounded-vintage border-2 border-forest text-forest font-sans font-bold text-base px-6 py-4 hover:bg-forest hover:text-cream transition-colors"
      >
        {" "}
        Book via WhatsApp{" "}
      </a>{" "}
    </form>
  );
}
