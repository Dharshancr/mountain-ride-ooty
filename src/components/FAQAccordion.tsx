"use client";

import { useState } from "react";

export type FaqData = { id: string; question: string; answer: string };

export default function FAQAccordion({ items }: { items: FaqData[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y-2 divide-brown/20 border-2 border-brown/30 rounded-vintage bg-cream overflow-hidden">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-sans font-semibold text-charcoal hover:bg-brown/5"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span className={`text-rust text-xl transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
            </button>
            <div
              className={`px-5 overflow-hidden transition-[max-height,padding] duration-300 ${
                isOpen ? "max-h-60 pb-4" : "max-h-0"
              }`}
            >
              <p className="text-sm text-charcoal/75">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
