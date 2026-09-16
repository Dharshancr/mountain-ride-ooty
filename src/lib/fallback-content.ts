// Shared content used to seed the database and as a safe fallback if the
// database is briefly unreachable. All of this is editable later from the
// admin dashboard — nothing here is fabricated pricing or reviews.

export const fallbackVehicles = [
  {
    name: "Sedan",
    slug: "sedan",
    capacityLabel: "Up to 4 passengers + driver",
    idealUsage: "Solo travellers, couples & small families",
    description:
      "A comfortable, fuel-efficient sedan ideal for Ooty sightseeing, airport transfers and short outstation trips.",
    imageUrl: "/images/vehicles/sedan.jpg",
    displayOrder: 1,
  },
  {
    name: "Kia Carens",
    slug: "kia-carens",
    capacityLabel: "Up to 6/7 passengers + driver",
    idealUsage: "Small families and friend groups",
    description:
      "A modern, spacious MPV with extra boot space — a great middle ground between a sedan and a full SUV.",
    imageUrl: "/images/vehicles/kia-carens.jpg",
    displayOrder: 2,
  },
  {
    name: "Toyota Innova",
    slug: "toyota-innova",
    capacityLabel: "Up to 7/8 passengers + driver",
    idealUsage: "Families, group sightseeing and outstation travel",
    description:
      "The trusted workhorse of Indian road trips — reliable, roomy and well suited to the Nilgiri hills.",
    imageUrl: "/images/vehicles/innova.jpg",
    displayOrder: 3,
  },
  {
    name: "Toyota Innova Crysta",
    slug: "toyota-innova-crysta",
    capacityLabel: "Up to 7 passengers + driver",
    idealUsage: "Premium family and business travel",
    description:
      "Our premium comfort option, with a refined cabin, better ride quality and extra legroom for longer journeys.",
    imageUrl: "/images/vehicles/innova-crysta.jpg",
    displayOrder: 4,
  },
  {
    name: "Tempo Traveller",
    slug: "tempo-traveller",
    capacityLabel: "12 or 17 seater configurations available",
    idealUsage: "Group travel, office outings and large families",
    description:
      "Spacious group transportation for larger parties visiting Ooty together, with seating configuration confirmed at booking.",
    imageUrl: "/images/vehicles/tempo-traveller.jpg",
    displayOrder: 5,
  },
  {
    name: "Force Urbania",
    slug: "force-urbania",
    capacityLabel: "Up to 16/17 passengers depending on configuration",
    idealUsage: "Large groups and corporate travel",
    description:
      "A premium large-group vehicle offering extra comfort for bigger parties travelling through the Nilgiris.",
    imageUrl: "/images/vehicles/urbania.jpg",
    displayOrder: 6,
  },
];

export const fallbackServices = [
  {
    title: "Ooty Taxi Service",
    slug: "ooty-taxi-service",
    description: "Reliable local taxi service across Ooty town and nearby areas, any time of day.",
    icon: "car",
    ctaLabel: "Book a Taxi",
    ctaHref: "/booking",
    displayOrder: 1,
  },
  {
    title: "Ooty Sightseeing",
    slug: "ooty-sightseeing",
    description: "Curated sightseeing routes covering Ooty's most-loved viewpoints, gardens and lakes.",
    icon: "compass",
    ctaLabel: "View Sightseeing",
    ctaHref: "/sightseeing",
    displayOrder: 2,
  },
  {
    title: "Airport Transfers",
    slug: "airport-transfers",
    description: "Direct transfers between Coimbatore Airport and Ooty, pre-booked so your driver is ready.",
    icon: "plane",
    ctaLabel: "Book Airport Transfer",
    ctaHref: "/airport-transfer",
    displayOrder: 3,
  },
  {
    title: "Railway Transfers",
    slug: "railway-transfers",
    description: "Pickup and drop from Mettupalayam and Coimbatore railway stations, timed to your train.",
    icon: "train",
    ctaLabel: "Book Now",
    ctaHref: "/booking",
    displayOrder: 4,
  },
  {
    title: "Group Travel",
    slug: "group-travel",
    description: "Tempo Traveller and Urbania options for families, office groups and tour parties.",
    icon: "users",
    ctaLabel: "Get Group Quote",
    ctaHref: "/booking",
    displayOrder: 5,
  },
  {
    title: "Outstation Taxi",
    slug: "outstation-taxi",
    description: "One-way and round-trip journeys connecting Ooty to Coimbatore, Mysore, Bangalore and beyond.",
    icon: "map",
    ctaLabel: "Get Outstation Quote",
    ctaHref: "/outstation",
    displayOrder: 6,
  },
  {
    title: "Tour & Hotel Assistance",
    slug: "tour-hotel-assistance",
    description: "Local guidance on itineraries and stay options to help plan a smoother Nilgiri trip.",
    icon: "hotel",
    ctaLabel: "Plan My Trip",
    ctaHref: "/custom-tour",
    displayOrder: 7,
  },
];

export const fallbackSightseeing = [
  {
    name: "Ooty Botanical Garden",
    slug: "ooty-botanical-garden",
    description: "Terraced lawns, rare trees and seasonal flower displays in the heart of Ooty.",
    imageUrl: "/images/sightseeing/botanical-garden.jpg",
    stampLabel: "NILGIRIS",
    displayOrder: 1,
  },
  {
    name: "Ooty Lake",
    slug: "ooty-lake",
    description: "A calm boating lake ringed by eucalyptus trees, popular at sunrise and sunset.",
    imageUrl: "/images/sightseeing/ooty-lake.jpg",
    stampLabel: "OOTY",
    displayOrder: 2,
  },
  {
    name: "Doddabetta Peak",
    slug: "doddabetta-peak",
    description: "The highest point in the Nilgiris, with a telescope house and sweeping valley views.",
    imageUrl: "/images/sightseeing/doddabetta.jpg",
    stampLabel: "PEAK",
    displayOrder: 3,
  },
  {
    name: "Pine Forest",
    slug: "pine-forest",
    description: "A photogenic stretch of tall pines, a favourite stop on the way out of town.",
    imageUrl: "/images/sightseeing/pine-forest.jpg",
    stampLabel: "FOREST",
    displayOrder: 4,
  },
  {
    name: "Pykara",
    slug: "pykara",
    description: "Waterfalls, a boating lake and rolling grasslands about 20km from Ooty town.",
    imageUrl: "/images/sightseeing/pykara.jpg",
    stampLabel: "PYKARA",
    displayOrder: 5,
  },
  {
    name: "Avalanche",
    slug: "avalanche",
    description: "A remote reserve-forest lake known for its untouched, misty scenery.",
    imageUrl: "/images/sightseeing/avalanche.jpg",
    stampLabel: "RESERVE",
    displayOrder: 6,
  },
  {
    name: "Coonoor",
    slug: "coonoor",
    description: "A quieter hill town nearby, known for its tea estates and Sim's Park.",
    imageUrl: "/images/sightseeing/coonoor.jpg",
    stampLabel: "COONOOR",
    displayOrder: 7,
  },
];

export const fallbackPackages = [
  {
    title: "Ooty 1-Day Sightseeing",
    slug: "ooty-1-day-sightseeing",
    description: "A full day covering Ooty's key sights at a relaxed pace.",
    attractions: "Botanical Garden, Ooty Lake, Doddabetta Peak, Rose Garden",
    durationLabel: "1 Day",
    startingPrice: null,
    imageUrl: "/images/packages/ooty-1-day.jpg",
    displayOrder: 1,
  },
  {
    title: "Ooty + Coonoor",
    slug: "ooty-coonoor",
    description: "Combine Ooty's highlights with a scenic run through Coonoor's tea country.",
    attractions: "Doddabetta Peak, Sim's Park, Tea Estates, Dolphin's Nose",
    durationLabel: "1 Day",
    startingPrice: null,
    imageUrl: "/images/packages/ooty-coonoor.jpg",
    displayOrder: 2,
  },
  {
    title: "Ooty + Pykara",
    slug: "ooty-pykara",
    description: "Ooty town plus the open grasslands and lake at Pykara.",
    attractions: "Ooty Lake, Pykara Lake, Pykara Falls",
    durationLabel: "1 Day",
    startingPrice: null,
    imageUrl: "/images/packages/ooty-pykara.jpg",
    displayOrder: 3,
  },
  {
    title: "Avalanche Tour",
    slug: "avalanche-tour",
    description: "A quieter day trip into the Avalanche reserve-forest area.",
    attractions: "Avalanche Lake, Forest Trails",
    durationLabel: "1 Day",
    startingPrice: null,
    imageUrl: "/images/packages/avalanche.jpg",
    displayOrder: 4,
  },
  {
    title: "Ooty + Coonoor + Pykara",
    slug: "ooty-coonoor-pykara",
    description: "A fuller multi-area day for travellers who want to see as much of the Nilgiris as possible.",
    attractions: "Doddabetta, Tea Estates, Ooty Lake, Pykara Lake",
    durationLabel: "1 Day (extended)",
    startingPrice: null,
    imageUrl: "/images/packages/ooty-coonoor-pykara.jpg",
    displayOrder: 5,
  },
];

export const fallbackFaqs = [
  {
    question: "What areas do you cover?",
    answer:
      "We primarily operate across Ooty and the wider Nilgiris, including Coonoor, Pykara and Avalanche, plus outstation routes to Coimbatore, Mysore, Bangalore, Chennai, Wayanad, Kozhikode and Kochi.",
    displayOrder: 1,
  },
  {
    question: "Do you provide airport pickup?",
    answer:
      "Yes. We handle pre-booked pickups from Coimbatore Airport straight to Ooty, and drops back to the airport for your return flight.",
    displayOrder: 2,
  },
  {
    question: "Can I book a vehicle for one day?",
    answer:
      "Yes, one-day sightseeing and local bookings are available. Just select your preferred vehicle and travel date on the booking page.",
    displayOrder: 3,
  },
  {
    question: "Do you provide Tempo Travellers?",
    answer:
      "Yes, we offer Tempo Traveller and Force Urbania options for larger groups, with seating configuration confirmed at the time of booking.",
    displayOrder: 4,
  },
  {
    question: "Can I choose my vehicle?",
    answer:
      "You can select a preferred vehicle on the booking form. Exact vehicle availability is confirmed by our team after you submit your request.",
    displayOrder: 5,
  },
  {
    question: "Do you provide outstation trips?",
    answer:
      "Yes, both one-way and round-trip outstation journeys are available to destinations across South India.",
    displayOrder: 6,
  },
  {
    question: "How can I book?",
    answer:
      "Use the booking form on our website, message us directly on WhatsApp, or call either of our listed numbers.",
    displayOrder: 7,
  },
  {
    question: "Can you create a customized itinerary?",
    answer:
      "Yes — use the Custom Tour page to tell us your destinations, dates, group size and preferred vehicle, and we'll help plan it.",
    displayOrder: 8,
  },
];

export const outstationRoutes = [
  "Ooty ↔ Coimbatore",
  "Ooty ↔ Mysore",
  "Ooty ↔ Bangalore",
  "Ooty ↔ Chennai",
  "Ooty ↔ Wayanad",
  "Ooty ↔ Kozhikode",
  "Ooty ↔ Kochi",
];

export const vehicleOptions = [
  "Sedan",
  "Kia Carens",
  "Innova",
  "Innova Crysta",
  "Tempo Traveller",
  "Urbania",
  "Not Sure",
];

export const serviceOptions: { value: string; label: string }[] = [
  { value: "OOTY_SIGHTSEEING", label: "Ooty Sightseeing" },
  { value: "AIRPORT_TRANSFER", label: "Airport Transfer" },
  { value: "ONE_WAY", label: "One Way" },
  { value: "ROUND_TRIP", label: "Round Trip" },
  { value: "OUTSTATION", label: "Outstation" },
  { value: "CUSTOM_PACKAGE", label: "Custom Package" },
];
