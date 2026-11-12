import { describe, expect, it } from "vitest";
import { BOOKING_URL, REVIEW_INTERVAL_MS, spaServices } from "@/lib/spa-services";

describe("Spa booking and review rules", () => {
  it("books appointments at Silkglow Spa's GlossGenius page", () => {
    expect(BOOKING_URL).toBe("https://silkglowspa.glossgenius.com");
  });
  it("changes reviews every five seconds", () => {
    expect(REVIEW_INTERVAL_MS).toBe(5000);
  });
});

describe("Approved appointment durations", () => {
  it.each([
    ["New Client Special", "120 min"],
    ["Deluxe HydraFacial", "45 min"],
    ["Platinum HydraFacial", "60 min"],
    ["Dermaplaning", "30 min"],
    ["Customized Smart Peels", "15–50 min"],
    ["Firming Transformation Protocol", "1hr 30 min"],
    ["Fire N Ice Facial", "55 min"],
    ["Keravive Hair", "45 min"],
    ["Ultrafusion Pen", "45 min"],
  ])("%s lasts %s", (name, duration) => {
    expect(spaServices.find((service) => service.name === name)?.duration).toBe(duration);
  });
});