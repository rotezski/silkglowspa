import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, Menu, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKING_URL, REVIEW_INTERVAL_MS, openingHours, spaServices } from "@/lib/spa-services";
import p1 from "@/assets/photo1.jpg";
import p2 from "@/assets/photo2.jpg";
import p3 from "@/assets/photo3.jpg";
import p4 from "@/assets/photo4.jpg";
import p5 from "@/assets/photo5.jpg";
import p6 from "@/assets/photo6.jpg";
import p7 from "@/assets/photo7.jpg";
import p8 from "@/assets/photo8.jpg";
import p9 from "@/assets/photo9.jpg";
import facial from "@/assets/hydrafacial.jpg";
import peel from "@/assets/peel.jpg";
import hero10 from "@/assets/hero10.jpg";
import hero11 from "@/assets/hero11.jpg";

const founder = p7;
const heroSlides = [
  { image: hero10, kicker: "Medical-grade skincare in Madison", title: <>Expert care.<br />Radiant skin.</> },
  { image: hero11, kicker: "Personalized facials", title: <>Your glow,<br />our specialty.</> },
];

const BOOK = BOOKING_URL;
const SMS = "sms:+16085138264";
const PHONE = "+1 (608) 513-8264";
const TEL = "tel:+16085138264";
const ADDRESS = "7475 Mineral Point Rd 42, Suite 102, Madison, WI 53717";
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SilkGlow Spa — Medical-Grade Skincare in Madison, WI" },
      { name: "description", content: "Personalized HydraFacials, peels, dermaplaning and acne treatments in Madison, Wisconsin." },
      { property: "og:title", content: "SilkGlow Spa — Your Glow, Our Specialty" },
      { property: "og:description", content: "Refined, medical-grade skincare personalized for your skin journey in Madison, WI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: hero10.url },
      { name: "twitter:image", content: hero10.url },
    ],
  }),
  component: Index,
});

const nav = [["Treatments", "#treatments"], ["About", "#about"], ["Results", "#results"], ["Reviews", "#reviews"], ["Visit", "#visit"]] as const;

const treatments = [
  { name: "New Client Special", price: "$250", time: "120 min", desc: "A complete first visit with a Deluxe HydraFacial, dermaplaning, Celluma LED and a full facial massage.", image: p1, label: "The complete introduction" },
  { name: "Deluxe HydraFacial", time: "45 min", desc: "Deep cleansing, exfoliation, extraction, hydration, a personalized booster and restorative LED therapy.", image: p3, label: "Hydrate + restore" },
  { name: "Platinum HydraFacial", time: "60 min", desc: "Lymphatic drainage followed by deep cleansing, extraction, hydration and LED light therapy.", image: p9, label: "Our elevated facial" },
  { name: "Dermaplaning", time: "30 min", desc: "Surface exfoliation and vellus hair removal for an immediately smoother, more luminous finish.", image: p4, label: "Polish + smooth" },
  { name: "Customized Smart Peels", time: "15–50 min", desc: "Brightening, clarifying and age-supporting peels selected around your skin and your goals.", image: peel, label: "Reveal fresh skin" },
  { name: "Acne Clarity", time: "50 min", desc: "A thoughtful corrective treatment combining clinical care with soothing support for clearer skin.", image: facial, label: "Clarify + calm" },
  { name: "Fire N Ice Facial", time: "55 min", desc: "A results-driven resurfacing facial that supports renewal, softens lines and restores visible radiance.", image: p8, label: "Resurface + glow" },
  { name: "Keravive Scalp Treatment", time: "60 min", desc: "Cleanses, stimulates, nourishes and hydrates your scalp for healthier, fuller-looking hair.", image: p6, label: "Scalp + hair health" },
];

const reviews = [
  ["Jennifer M.", "Silkglow Spa was a game changer for me. My skin feels amazing! Exceptional quality of care, noticeable results. It's a 5-star experience every time!"],
  ["Ashley R.", "Tami is super knowledgeable and informed me of each step. She is easy going yet very professional. I finally received my first HydraFacial and it was wonderful!"],
  ["Sandra K.", "Professional, courteous, and incredibly knowledgeable. My skin has never been in better hands. The treatments at Silkglow Spa are second to none. Simply outstanding!"],
  ["Lisa T.", "I really enjoyed my experiences at Silkglow Spa and highly recommend her Lira products. My skin felt so smooth and youthful. She recommends what works best for your skin."],
  ["Michelle B.", "Tami was easy to talk to, kind, and gave me great advice. I received a Dermaplane treatment and left glowing and feeling refreshed. Would absolutely recommend!"],
  ["Danielle W.", "I can't thank Silkglow Spa enough. My confidence has skyrocketed! Great customer service, fantastic results. Tami never disappoints!"],
];

const results = [
  { image: p3, label: "Personalized care", title: "Visible transformation", description: "Thoughtful, personalized care brings your skin goals into focus. Each visit is shaped around your skin’s needs." },
  { image: p5, label: "HydraFacial", title: "Brighter, renewed skin", description: "Deep cleansing, exfoliation and hydration help reveal a fresh, radiant-looking complexion." },
  { image: p1, label: "Glow facial", title: "Deep hydration glow", description: "A restorative moment for your skin, with personalized treatment and a relaxing facial massage." },
  { image: p4, label: "Dermaplaning", title: "Smooth, luminous finish", description: "Gentle surface exfoliation removes dead cells so your products penetrate deeper, giving you the results you’re looking for along with that beautiful glow to leave your skin feeling smoother and refreshed." },
];

function Logo() {
  return <span className="brand-mark">SILKGLOW <span>SPA</span></span>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [review, setReview] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const heroTouch = useRef<number | null>(null);
  const touchStart = useRef<number | null>(null);

  const moveTreatment = (direction: number) => {
    setActive((current) => (current + direction + treatments.length) % treatments.length);
  };

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal], [data-text-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reviewTimer = window.setInterval(() => {
      setReview((current) => (current + 1) % reviews.length);
    }, REVIEW_INTERVAL_MS);
    return () => window.clearInterval(reviewTimer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % treatments.length);
    }, 6000);
    const heroTimer = window.setInterval(() => setHeroIndex((c) => (c + 1) % heroSlides.length), 6000);
    return () => { window.clearInterval(timer); window.clearInterval(heroTimer); };
  }, []);

  return (
    <main className="site-shell">
      <header className="topbar">
        <a href="#top" aria-label="SilkGlow Spa home"><Logo /></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([label, href], index) => (
            <a key={href} href={href}>{label}{index < 2 && <ChevronDown aria-hidden="true" />}</a>
          ))}
        </nav>
        <div className="top-actions">
          <a className="text-link" href={TEL}>Call us</a>
          <Button asChild variant="outline" className="pill-button glass-button"><a href="#treatments">Explore services</a></Button>
          <Button type="button" variant="ghost" size="icon" className="menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
      </header>
      {menuOpen && <nav className="mobile-menu" aria-label="Mobile navigation">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowRight /></a>)}<a href={SMS}>Message us<ArrowRight /></a></nav>}

      <section id="top" className="hero-stage" onTouchStart={(e) => { heroTouch.current = e.touches[0]?.clientX ?? null; }} onTouchEnd={(e) => { const end = e.changedTouches[0]?.clientX; if (heroTouch.current === null || end === undefined) return; const d = heroTouch.current - end; if (Math.abs(d) > 45) setHeroIndex((c) => (c + (d > 0 ? 1 : -1) + heroSlides.length) % heroSlides.length); heroTouch.current = null; }}>
        {heroSlides.map((slide, i) => (
          <img key={i} src={slide.image} alt="SilkGlow Spa" className={`hero-media ${i === heroIndex ? "is-active" : ""}`} loading={i === 0 ? "eager" : "lazy"} />
        ))}

        <div className="hero-copy" key={heroIndex}>
          <p className="hero-kicker">{heroSlides[heroIndex]?.kicker}</p>
          <h1>{heroSlides[heroIndex]?.title}</h1>
          <p className="hero-intro">Personalized treatments that meet your skin where it is—and help it become its healthiest, brightest self.</p>
          <div className="hero-buttons">
            <Button asChild className="pill-button light-button"><a href={BOOK} target="_blank" rel="noreferrer">Book an appointment</a></Button>
            <Button asChild className="pill-button acid-button"><a href="#treatments">View services <ArrowRight /></a></Button>
          </div>
        </div>
        <div className="hero-dots">{heroSlides.map((_, i) => <Button key={i} variant="ghost" size="icon" type="button" aria-label={`Show slide ${i + 1}`} aria-pressed={i === heroIndex} className={i === heroIndex ? "is-active" : ""} onClick={() => setHeroIndex(i)} />)}</div>
      </section>

      <section className="trust-strip" aria-label="Our approach">
        {[
          ["🏆", "Medical-Grade Treatments", "One of few in Madison offering medical-grade HydraFacial"],
          ["⭐", "4.9 Star Rating", "Trusted by 100+ satisfied clients across Madison, WI"],
          ["🎓", "Certified Acne Expert", "Science-backed methods, cutting-edge technologies"],
          ["💜", "100% Personalized", "Every treatment plan tailored to your unique skin"],
        ].map(([icon, title, description]) => <div key={title} data-reveal><span className="trust-icon" aria-hidden="true">{icon}</span><h3>{title}</h3><p>{description}</p></div>)}
      </section>

      <section id="treatments" className="treatment-section">
        <div className="section-intro" data-reveal>
          <h2 data-text-reveal>One thoughtful approach<br />for your <em>best skin.</em></h2>
        </div>
        <div className="treatment-carousel" onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { const end = event.changedTouches[0]?.clientX; if (touchStart.current === null || end === undefined) return; const distance = touchStart.current - end; if (Math.abs(distance) > 45) moveTreatment(distance > 0 ? 1 : -1); touchStart.current = null; }}>
          <div className="slides-window">
            <div className="slides-track" style={{ transform: `translateX(calc(-${active} * var(--slide-step)))` }}>
              {treatments.map((treatment, index) => (
                <article key={treatment.name} className={`treatment-slide ${index === active ? "is-active" : ""}`}>
                  <img src={treatment.image} alt="" loading={index === 0 ? "eager" : "lazy"} />
                  <div className="slide-copy">
                    <span className="eyebrow">{treatment.label}</span>
                    <h3>{treatment.name}</h3>
                    <p>{treatment.desc}</p>
                    {treatment.price && <strong>{treatment.price}</strong>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="welcome-section" aria-labelledby="welcome-title">
        <p className="eyebrow" data-reveal>WELCOME TO SILKGLOW SPA</p>
        <h2 id="welcome-title" data-text-reveal>Modern Skincare<br /><em>Designed Around You</em></h2>
        <div className="welcome-text" data-reveal>
          <p>At Silkglow Spa, we believe that looking and feeling your best go hand in hand. Located in Madison, WI, I'm dedicated to providing personalized, cutting-edge treatments that enhance your natural beauty and overall skin wellness.</p>
          <p>Whether you're struggling with acne, rosacea, hyperpigmentation, fine lines, or just want that healthy glow — I'm here to guide you every step of the way using science-backed methods and state-of-the-art technology.</p>
          <p>Not sure where to start? Try the client favorite New Client Special — a 120-minute customized facial including consultation, personalized treatment, and relaxing massage.</p>
        </div>
        <ul className="certification-list" data-reveal>{["CERTIFIED AESTHETICIAN", "ACNE EXPERT", "HYDRAFACIAL PRO", "LIRA CERTIFIED"].map((label) => <li key={label}>{label}</li>)}</ul>
        <div className="welcome-actions"><Button asChild className="pill-button dark-button"><a href="#about">ABOUT TAMI</a></Button><Button asChild variant="outline" className="pill-button"><a href="#services">VIEW SERVICES</a></Button></div>
      </section>

      <section id="services" className="services-section" aria-labelledby="services-title">
        <div className="services-heading" data-reveal><div><p className="eyebrow">WHAT WE OFFER</p><h2 id="services-title">Treatments for<br /><em>Every Skin Concern</em></h2></div><span className="eyebrow">SERVICES</span></div>
        <div className="service-list">{spaServices.map((service) => <Button asChild variant="ghost" className="service-row" key={service.name}><a href={BOOK} target="_blank" rel="noreferrer" aria-label={`Book ${service.name}`}><span className="service-details"><strong>{service.name}</strong><span>{service.description}</span></span><span className="service-duration">{service.duration}</span><span className="service-book">BOOK NOW <ArrowRight aria-hidden="true" /></span></a></Button>)}</div>
      </section>

      <section id="about" className="about-band">
<div className="about-image" data-reveal><img src={founder} className="w-full h-full object-cover object-center" alt="founder" loading="lazy" /></div>        <div className="about-copy" data-reveal>
          <p className="eyebrow">Care built around you</p>
          <h2 data-text-reveal>Skin expertise,<br /><em>made personal.</em></h2>
          <p data-text-reveal>Every appointment begins with listening. Together, we build a treatment experience around what you see, how you feel and where you want your skin to go.</p>
          <p className="credentials" data-text-reveal>A certified acne expert, HydraFacial specialist and Lira Clinical provider, Tami blends advanced peels and clinical care with a warm, personal touch.</p>
          <Button asChild className="pill-button dark-button"><a href={BOOK} target="_blank" rel="noreferrer">Meet your skin goals <ArrowRight /></a></Button>
        </div>
      </section>

      <section id="results" className="results-section">
        <div className="results-heading" data-reveal><p className="eyebrow">Real treatment results</p><h2 data-text-reveal>Glow that speaks<br />for <em>itself.</em></h2></div>
        <div className="result-grid">
          {results.map((item) => <figure key={item.label} className="result-row" data-reveal><div className="result-photo"><img src={item.image} alt={item.title} loading="lazy" /></div><figcaption><span className="eyebrow">{item.label}</span><h3>{item.title}</h3><p>{item.description}</p></figcaption></figure>)}
        </div>
      </section>

      <div className="marquee" aria-hidden="true"><div>PERSONALIZED CARE · MEDICAL-GRADE RESULTS · SKIN CONFIDENCE · PERSONALIZED CARE · MEDICAL-GRADE RESULTS · SKIN CONFIDENCE ·&nbsp;</div></div>

      <section id="reviews" className="reviews-section">
        <div className="reviews-heading" data-reveal><p className="eyebrow">Client love</p><h2>Kind words.<br /><em>Real confidence.</em></h2><p>4.9 out of 5 · Google reviews</p></div>
        <div className="review-panel" data-reveal>
          <div className="review-meta" key={`m${review}`}><span className="google-badge" aria-label="Google review"><GoogleIcon /></span><div><strong>{reviews[review]?.[0]}</strong><span>Google review</span></div></div>
          <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
          <div className="review-body">
            <div>
              <blockquote key={review} className="review-quote">“{reviews[review]?.[1]}”</blockquote>
            </div>
          </div>
          <div className="review-nav"><span>{String(review + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}</span><div><Button variant="ghost" size="icon" onClick={() => setReview((review - 1 + reviews.length) % reviews.length)} aria-label="Previous review"><ArrowLeft /></Button><Button variant="ghost" size="icon" onClick={() => setReview((review + 1) % reviews.length)} aria-label="Next review"><ArrowRight /></Button></div></div>
        </div>
      </section>

      <section id="visit" className="visit-section">
        <div className="visit-copy" data-reveal>
          <p className="eyebrow">Madison, Wisconsin</p><h2 data-text-reveal>Your next glow<br />starts <em>here.</em></h2>
          <p data-text-reveal>{ADDRESS}</p><a href={TEL}>{PHONE}</a>
          <dl className="visit-hours" aria-label="Opening hours" data-reveal>{openingHours.map(([day, hours]) => <div key={day}><dt>{day}</dt><dd>{hours}</dd></div>)}</dl>
          <div className="visit-actions"><Button asChild className="pill-button acid-button"><a href={BOOK} target="_blank" rel="noreferrer">Book now <ArrowRight /></a></Button><Button asChild variant="outline" className="pill-button outline-light"><a href={MAPS} target="_blank" rel="noreferrer">Get directions</a></Button></div>
        </div>
      </section>

      <footer>
        <div className="footer-main"><Logo /><h2>Healthy skin looks<br /><em>good on you.</em></h2><Button asChild className="pill-button dark-button"><a href={BOOK} target="_blank" rel="noreferrer">Book your visit <ArrowRight /></a></Button></div>
        <div className="footer-bottom"><p>© SilkGlow Spa LLC · Madison, WI</p><nav>{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}<a href="https://instagram.com/glambytamaesthetics" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/p/Glam-by-Tam-Aesthetics-LLC-61573589290237/" target="_blank" rel="noreferrer">Facebook</a></nav><p>By appointment only</p></div>
      </footer>

      <Button asChild className="floating-book" aria-label="Message SilkGlow Spa"><a href={SMS} aria-label="Message SilkGlow Spa"><MessageCircle /></a></Button>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="var(--google-blue)" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="var(--google-green)" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24z" />
      <path fill="var(--google-yellow)" d="M5.27 14.29A7.2 7.2 0 0 1 4.89 12c0-.8.14-1.57.38-2.29V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09z" />
      <path fill="var(--google-red)" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42A11.97 11.97 0 0 0 12 0 11.99 11.99 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}