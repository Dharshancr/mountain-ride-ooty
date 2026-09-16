export type ReviewCardData = {
  id: string;
  customerName: string;
  rating: number;
  reviewText: string;
};

export default function ReviewCard({ review }: { review: ReviewCardData }) {
  return (
    <div className="bg-cream border-2 border-brown/30 rounded-vintage p-6 shadow-vintage relative">
      <div className="absolute -top-3 -right-3 stamp bg-mustard text-forest text-[10px] font-bold px-2 py-1 rotate-6">
        VERIFIED GUEST
      </div>
      <div className="flex gap-1 text-mustard mb-3" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
            <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 21.5 12 17.5 5.5 21.5 7 14.5 2 9.5 9 9" />
          </svg>
        ))}
      </div>
      <p className="text-sm text-charcoal/80 italic">&ldquo;{review.reviewText}&rdquo;</p>
      <p className="mt-4 font-display text-forest tracking-wide">{review.customerName}</p>
    </div>
  );
}
