import newClientImg from "@/assets/newclientspecial.jpeg";

export const BOOKING_URL = "https://silkglowspa.glossgenius.com";
export const REVIEW_INTERVAL_MS = 5000;

export const spaServices = [
{ name: "New Client Special", image: newClientImg, description: "Deluxe HydraFacial + Dermaplaning + Celluma LED + full facial massage.", price: "$250" },
{ name: "Deluxe HydraFacial", description: "Medical-grade cleansing, extraction, and hydration." },
{ name: "Platinum HydraFacial", description: "The ultimate experience for skin health and glow." },
{ name: "Dermaplaning", description: "Removes vellus facial hair and dead skin cells." },
{ name: "Customized Smart Peels", description: "From brightening to anti-aging tailored peels." },
{ name: "Firming Transformation Protocol", description: "Experience ultimate tightening and firming." },
{ name: "Fire N Ice Facial", description: "Results-driven facial designed to rapidly and safely resurface." },
{ name: "Keravive Hair", description: "Cleanses, stimulates, nourishes and hydrates scalp." },
{ name: "Ultrafusion Pen", description: "Ultrasound pen for anti-aging product penetration." },
] as const;

export const openingHours = [
["Monday", "10:00 AM – 6:00 PM"],
["Tuesday", "10:00 AM – 6:00 PM"],
["Wednesday", "10:00 AM – 6:00 PM"],
["Thursday", "10:00 AM – 6:00 PM"],
["Friday", "10:00 AM – 4:00 PM"],
["Saturday", "Closed"],
] as const;
