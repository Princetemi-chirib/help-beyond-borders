"use client";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

const brand = {
  orange: "#f97316",
  green: "#16a34a",
  blue: "#2563eb",
  white: "#ffffff",
  black: "#111827",
};

const galleryImages = [
  "472557106_122135537984428483_7349754113608073538_n.jpg",
  "472695257_122135537990428483_333234654832985239_n.jpg",
  "472787607_122135538266428483_2552163795771427060_n.jpg",
  "472789314_122135538632428483_6387892058767781815_n.jpg",
  "473065993_122135538356428483_403037526218626970_n.jpg",
  "473080365_122136501122428483_4420928979589573851_n.jpg",
  "473573347_122136496178428483_6199626131490328684_n.jpg",
  "476653903_122140310600428483_6164808925201141694_n.jpg",
  "476805323_122140310480428483_5193103492657583064_n.jpg",
];

// Simple on-scroll reveal component
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      {children}
    </div>
  );
}

type Testimonial = { quote: string; name: string; img: string };
const testimonials: Testimonial[] = [
  {
    quote: "HBB gave me confidence to start my small food business.",
    name: "Aisha, Ikota",
    img: "/472695257_122135537990428483_333234654832985239_n.jpg",
  },
  {
    quote: "The hospital visit meant the world to my family.",
    name: "Emeka, Akodo",
    img: "/473080365_122136501122428483_4420928979589573851_n.jpg",
  },
  {
    quote: "With the reading glasses, I can work and read again.",
    name: "Mama Titi, Ajah",
    img: "/472787607_122135538266428483_2552163795771427060_n.jpg",
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const sectionIds = ["about", "events", "gallery", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent("Website contact: Help Beyond Borders");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);
    window.location.href = `mailto:info@helpbeyondborders.ng?subject=${subject}&body=${body}`;
  };
  // Hero interactive motion
  const heroRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const groupParallaxX = useTransform(mouseX, [-1, 1], [-10, 10]);
  const groupParallaxY = useTransform(mouseY, [-1, 1], [-6, 6]);
  const tile1X = useTransform(mouseX, [-1, 1], [-6, 6]);
  const tile1Y = useTransform(mouseY, [-1, 1], [-4, 4]);
  const tile2X = useTransform(mouseX, [-1, 1], [5, -5]);
  const tile2Y = useTransform(mouseY, [-1, 1], [-3, 3]);
  const tile3X = useTransform(mouseX, [-1, 1], [-4, 4]);
  const tile3Y = useTransform(mouseY, [-1, 1], [3, -3]);
  const tile4X = useTransform(mouseX, [-1, 1], [3, -3]);
  const tile4Y = useTransform(mouseY, [-1, 1], [-2, 2]);
  return (
    <div className={`${inter.className} min-h-screen bg-[#f5f5f5] text-gray-900`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-black text-white px-3 py-2 rounded">Skip to content</a>
      <header className={`w-full sticky top-0 z-50 transition-all ${scrolled ? "bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm" : "bg-white"}`} role="banner">
        <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/Help Beyond Borders 2.png" alt="Help Beyond Borders logo" width={96} height={96} className="w-10 h-10 sm:w-14 sm:h-14 md:w-24 md:h-24" />
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm" aria-label="Primary">
            <a href="#about" className={activeSection === "about" ? "text-gray-900" : "text-gray-600 hover:text-gray-900"}>About</a>
            <a href="#events" className={activeSection === "events" ? "text-gray-900" : "text-gray-600 hover:text-gray-900"}>Impact</a>
            <a href="#how" className={activeSection === "how" ? "text-gray-900" : "text-gray-600 hover:text-gray-900"}>How it works</a>
            <a href="#gallery" className={activeSection === "gallery" ? "text-gray-900" : "text-gray-600 hover:text-gray-900"}>Gallery</a>
            <a href="#contact" className={activeSection === "contact" ? "text-gray-900" : "text-gray-600 hover:text-gray-900"}>Contact</a>
          </nav>
          <Link
            href="https://www.facebook.com/profile.php?id=61562854497628"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Help Beyond Borders Nigeria Facebook page (opens in a new tab)"
            className="rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ backgroundColor: brand.green }}
          >
            Follow on Facebook
          </Link>
        </div>
      </header>

      <main id="main" role="main">
        {/* HERO: Full-bleed image with overlay */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image src="/476653903_122140310600428483_6164808925201141694_n.jpg" alt="Help Beyond Borders outreach" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
          </div>
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-28 lg:py-36" ref={heroRef}
            onMouseMove={(e) => {
              const el = heroRef.current;
              if (!el) return;
              const rect = el.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1..1
              const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1..1
              mouseX.set(Math.max(-1, Math.min(1, x)));
              mouseY.set(Math.max(-1, Math.min(1, y)));
            }}
          >
            <motion.div
              className="flex items-start justify-between gap-6"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            >
              <div className="max-w-2xl">
                <motion.div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/20 backdrop-blur" style={{ color: brand.orange }} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                  Lagos, Nigeria • Non-Governmental Organisation
                </motion.div>
                <motion.h1 className="mt-4 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight" style={{ color: brand.orange }} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                  Help <span style={{ color: brand.blue }}>Beyond</span> Borders
                </motion.h1>
                <motion.p className="mt-3 text-base md:text-xl" style={{ color: brand.orange }} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                  Household food support, women-led enterprise, and healthcare visits  building resilient communities across Lagos.
                </motion.p>
                <motion.div className="mt-6 flex flex-wrap gap-3" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
                  <a href="#contact" className="rounded-md px-4 py-2 md:px-5 md:py-3 text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2" style={{ backgroundColor: brand.green }}>Volunteer with us</a>
                  <a href="#events" className="rounded-md px-4 py-2 md:px-5 md:py-3 text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2" style={{ backgroundColor: brand.blue }}>See impact</a>
                </motion.div>
              </div>
              <motion.div className="relative hidden sm:block w-[280px] h-[220px] md:w-[380px] md:h-[300px]" style={{ x: groupParallaxX, y: groupParallaxY }}>
                <div className="absolute -z-10 inset-0 rounded-[40px] opacity-25" style={{ background: `radial-gradient(480px 220px at 55% 45%, ${brand.blue}15, transparent)` }} />
                <motion.div className="group absolute top-0 left-4 z-[3]" animate={{ y: [0, -6, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} style={{ x: tile1X, y: tile1Y }}>
                  <div className="overflow-hidden shadow-md ring-1 ring-white/20" style={{ borderRadius: 40 }}>
                    <Image src="/472695257_122135537990428483_333234654832985239_n.jpg" alt="Hero collage 1" width={140} height={140} className="object-cover transition-transform duration-300 ease-out group-hover:scale-105" style={{ transform: "rotate(-2deg)" }} />
                  </div>
                </motion.div>
                <motion.div className="group absolute top-8 right-0 z-[2]" animate={{ y: [0, 5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} style={{ x: tile2X, y: tile2Y }}>
                  <div className="overflow-hidden shadow-md ring-1 ring-white/20" style={{ borderRadius: 40 }}>
                    <Image src="/472787607_122135538266428483_2552163795771427060_n.jpg" alt="Hero collage 2" width={120} height={120} className="object-cover transition-transform duration-300 ease-out group-hover:scale-110" style={{ transform: "rotate(6deg)" }} />
                  </div>
                </motion.div>
                <motion.div className="group absolute bottom-2 left-16 z-[1]" animate={{ y: [0, -4, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }} style={{ x: tile3X, y: tile3Y }}>
                  <div className="overflow-hidden shadow-md ring-1 ring-white/20" style={{ borderRadius: 40 }}>
                    <Image src="/473080365_122136501122428483_4420928979589573851_n.jpg" alt="Hero collage 3" width={130} height={130} className="object-cover transition-transform duration-300 ease-out group-hover:scale-108" style={{ transform: "rotate(1.5deg)" }} />
                  </div>
                </motion.div>
                <motion.div className="group absolute bottom-8 right-10 z-[4]" animate={{ y: [0, 4, 0] }} transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }} style={{ x: tile4X, y: tile4Y }}>
                  <div className="overflow-hidden shadow-md ring-1 ring-white/20" style={{ borderRadius: 40 }}>
                    <Image src="/473573347_122136496178428483_6199626131490328684_n.jpg" alt="Hero collage 4" width={115} height={115} className="object-cover transition-transform duration-300 ease-out group-hover:scale-110" style={{ transform: "rotate(-5deg)" }} />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section aria-labelledby="why-heading" className="bg-[#fafafa]">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 id="why-heading" className="text-2xl font-bold mb-6" style={{ color: brand.black }}>Why Nigerians choose Help Beyond Borders</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[{
                title: "Trusted community",
                copy: "Our coordinators live in the communities we serve. Every drive is planned with local leaders, vendors, and clinics so support is safe, culturally appropriate, and reaches the right households first.",
                color: brand.green,
              }, {
                title: "Real impact, real people",
                copy: "We prioritize essentials that change daily life: cooked meals, staple packs, sanitary items, reading glasses, and hospital visits. Women-focused pep talks and microgrants help families create sustainable income.",
                color: brand.orange,
              }, {
                title: "Transparent updates",
                copy: "Photos, short reports, and quick highlights are shared after each outreach. You can track where we went, what was delivered, and the number of residents supported — no guesswork, just clear outcomes.",
                color: brand.blue,
              }].map((f) => (
                <Reveal key={f.title}>
                  <div className="rounded-2xl border border-gray-100 p-7 shadow-sm bg-white">
                    <div className="text-lg font-semibold mb-2" style={{ color: f.color }}>{f.title}</div>
                    <p className="text-gray-700 text-base leading-7">{f.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" aria-labelledby="how-heading" className="bg-[#fff8f3]">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 id="how-heading" className="text-2xl font-bold mb-8" style={{ color: brand.black }}>How it works</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <Reveal>
                  <div className="rounded-xl bg-white p-5 border border-gray-100 shadow-sm">
                    <div className="text-sm font-semibold mb-1" style={{ color: brand.green }}>For Residents</div>
                    <p className="text-gray-700 text-base leading-7">Register during our community announcements or via local coordinators. We verify needs with street leaders and plan safe, orderly pickup points. Priority goes to households with children, elderly members, or medical needs.</p>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="rounded-xl bg-white p-5 border border-gray-100 shadow-sm">
                    <div className="text-sm font-semibold mb-1" style={{ color: brand.blue }}>For Women Entrepreneurs</div>
                    <p className="text-gray-700 text-base leading-7">Attend short, practical pep talks on pricing, phone photography, and WhatsApp selling. Showcase your skills at pop-ups, then apply for small grants or starter kits. Coordinators follow up for 4–8 weeks to help you stay consistent.</p>
                  </div>
                </Reveal>
              </div>
              <div className="space-y-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-gray-200 shadow-sm">
                  <Image src="/476805323_122140310480428483_5193103492657583064_n.jpg" alt="Entrepreneurship session" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="bg-gray-50 border-t border-b border-gray-100" aria-labelledby="about-heading">
          <div className="mx-auto max-w-6xl px-4 py-14 grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <Reveal>
                <h2 id="about-heading" className="text-2xl font-bold mb-2" style={{ color: brand.blue }}>About us</h2>
              </Reveal>
              <div className="h-1 w-16 rounded" style={{ backgroundColor: brand.green }} />
            </div>
            <div className="md:col-span-2 text-gray-700 leading-7">
              <Reveal>
                <p className="mb-4">
                Welcome to Help Beyond Borders Nigeria. We are a Non-Governmental Organisation.
                We contribute to society building and poverty eradication. At HBB, we never get tired of doing good.
                </p>
              </Reveal>
              <Reveal>
                <p>
                Our initiatives include giving out cooked meals and sanitary wares, hospital visits, skills display
                programs, and financial support to women and families across Lagos communities such as Ikota,
                Ajah, and Ibeju-Lekki.
                </p>
              </Reveal>
            </div>
        </div>
        </section>

        {/* Impact / Events - framer motion creative layout */}
        <section id="events" aria-labelledby="events-heading">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 id="events-heading" className="text-2xl font-bold mb-2" style={{ color: brand.blue }}>Our recent impact</h2>
            <p className="text-sm text-gray-600 mb-8">Highlights from drives and visits across Ikota, Ajah, and Ibeju-Lekki.</p>
            <motion.div
              className="grid gap-6 md:grid-cols-12"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12 } },
              }}
            >
              {[
                {
                  title: "Women Empowerment Pep Talk — Ikota",
                  copy: "Social media basics for selling, pricing confidence, and simple phone photography.",
                  span: "md:col-span-7",
                  img: "/472695257_122135537990428483_333234654832985239_n.jpg",
                },
                {
                  title: "Cooked Meals & Sanitary Wares — Ikota",
                  copy: "Nutritious meals and hygiene packs to households identified by community leaders.",
                  span: "md:col-span-5",
                  img: "/472787607_122135538266428483_2552163795771427060_n.jpg",
                },
                {
                  title: "Hospital Visits — Akodo General",
                  copy: "Encouragement and essentials provided to patients and caregivers in recovery wards.",
                  span: "md:col-span-5",
                  img: "/473080365_122136501122428483_4420928979589573851_n.jpg",
                },
                {
                  title: "Reading Glasses — Ikota/Ajah",
                  copy: "Quality lenses fitted on-site to restore daily reading and craft work.",
                  span: "md:col-span-7",
                  img: "/473573347_122136496178428483_6199626131490328684_n.jpg",
                },
              ].map((card) => (
                <motion.article
                  key={card.title}
                  className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm ${card.span}`}
                  variants={{
                    hidden: { opacity: 0, y: 24, scale: 0.98 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 18 } },
                  }}
                >
                  <div className="relative aspect-[16/9] md:aspect-[5/3]">
                    <Image src={card.img} alt={card.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="font-semibold mb-1" style={{ color: brand.black }}>{card.title}</h3>
                    <p className="text-sm text-gray-700">{card.copy}</p>
                  </div>
                  <motion.div
                    className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full"
                    style={{ background: `${brand.orange}22` }}
                    animate={{ y: [0, -4, 0], rotate: [0, 6, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.article>
              ))}
            </motion.div>
            {/* subtle marquee of tags */}
            <motion.div
              className="mt-8 overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="flex gap-3 whitespace-nowrap will-change-transform animate-[marquee_18s_linear_infinite]">
                {["Ikota", "Ajah", "Ibeju-Lekki", "Akodo", "Food Aid", "Women Enterprise", "Healthcare", "Education"].map((t) => (
                  <span key={t} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600">{t}</span>
                ))}
              </div>
            </motion.div>
            <style jsx>{`
              @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            `}</style>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="bg-gray-50 border-t border-b border-gray-100" aria-labelledby="gallery-heading">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 id="gallery-heading" className="text-2xl font-bold mb-6" style={{ color: brand.blue }}>Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {galleryImages.map((img) => (
                <Reveal key={img}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md ring-1 ring-gray-200">
                    <Image src={`/${img}`} alt="Help Beyond Borders activity photo" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials - card grid style */}
        <section aria-labelledby="testimonials-heading">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 id="testimonials-heading" className="text-2xl font-bold text-center mb-2" style={{ color: brand.black }}>Trusted by communities across Nigeria</h2>
            <p className="text-center text-sm text-gray-600 mb-8">Real words from residents and volunteers we work with.</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  quote: "HBB’s meal drive came when we needed it most. It eased my family’s burden.",
                  name: "Mr. Ade",
                  role: "Resident",
                  img: "/472695257_122135537990428483_333234654832985239_n.jpg",
                },
                {
                  quote: "The pep talk helped me start selling again online. I feel confident.",
                  name: "Mrs. Njeri",
                  role: "Women Entrepreneur",
                  img: "/472787607_122135538266428483_2552163795771427060_n.jpg",
                },
                {
                  quote: "Hospital visit lifted our spirits. Thank you for showing up for us.",
                  name: "Chidi",
                  role: "Resident",
                  img: "/473080365_122136501122428483_4420928979589573851_n.jpg",
                },
                {
                  quote: "With reading glasses, I can read and sew again. It changed my daily life.",
                  name: "Ama",
                  role: "Resident",
                  img: "/473573347_122136496178428483_6199626131490328684_n.jpg",
                },
              ].map((t) => (
                <div key={t.name} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center">
                  <div className="h-14 w-14 rounded-full overflow-hidden ring-2 ring-white shadow -mt-10 mb-3">
                    <Image src={t.img} alt={t.name} width={56} height={56} className="h-14 w-14 object-cover" />
                  </div>
                  <p className="text-sm text-gray-700 leading-6 mb-6">{t.quote}</p>
                  <div className="mt-auto">
                    <div className="font-medium" style={{ color: brand.black }}>{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        

        {/* Contact / Footer top */}
        <section id="contact" aria-labelledby="contact-heading">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="max-w-2xl">
              <h2 id="contact-heading" className="text-2xl font-bold mb-2" style={{ color: brand.blue }}>Get in touch</h2>
              <div className="h-1 w-16 rounded mb-6" style={{ backgroundColor: brand.green }} />
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
              <p className="text-sm text-gray-600 mb-6">Whether you want to volunteer, donate, or partner, our team is here to help.</p>
              <form onSubmit={handleContactSubmit} className="grid grid-cols-1 gap-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: brand.black }}>Full name</label>
                    <input id="name" name="name" placeholder="Enter your full name" required className="w-full rounded-full border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2" style={{ outlineColor: brand.blue }} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: brand.black }}>Email address</label>
                    <input id="email" name="email" type="email" placeholder="We’ll use this to contact you" required className="w-full rounded-full border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1" style={{ color: brand.black }}>Phone number (optional)</label>
                    <input id="phone" name="phone" type="tel" placeholder="Preferably WhatsApp-enabled" className="w-full rounded-full border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium mb-2" style={{ color: brand.black }}>Subject</span>
                    <div className="grid grid-cols-1 gap-2">
                      {["General inquiry","Volunteer","Donation","Partnership","Other"].map((label) => (
                        <label key={label} className="inline-flex items-center gap-2 text-sm text-gray-700">
                          <input type="radio" name="subject" value={label} defaultChecked={label === "General inquiry"} style={{ accentColor: brand.blue }} />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1" style={{ color: brand.black }}>Message</label>
                  <textarea id="message" name="message" rows={5} placeholder="Type your message..." required className="w-full rounded-2xl border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2" />
                </div>
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" name="terms" required style={{ accentColor: brand.green }} />
                  I accept the terms
                </label>
                <div className="pt-1">
                  <button type="submit" className="rounded-full px-6 py-3 text-white font-medium shadow-sm" style={{ backgroundColor: brand.orange }}>Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 bg-[#fafafa]" role="contentinfo">
        <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/Help Beyond Borders 2.png" alt="Help Beyond Borders logo" width={40} height={40} />
              <div className="text-lg font-bold" style={{ color: brand.blue }}>Help Beyond Borders</div>
            </div>
            <p className="mt-3 text-sm text-gray-600">Touching lives, Helping Humanity — empowering Lagos communities with food, healthcare support, and women-led enterprise.</p>
            <div className="mt-4 flex items-center gap-3">
              <Link href="https://www.facebook.com/profile.php?id=61562854497628" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#1877F2]">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.847V11.01h2.973V8.413c0-2.943 1.796-4.549 4.422-4.549 1.257 0 2.337.093 2.652.135v3.073h-1.82c-1.428 0-1.704.679-1.704 1.675v2.263h3.406l-.444 3.696h-2.962V24h5.807C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z"/>
                </svg>
              </Link>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold mb-2" style={{ color: brand.black }}>Programs</div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#events" className="hover:text-gray-900">Food Aid</a></li>
              <li><a href="#events" className="hover:text-gray-900">Women Enterprise</a></li>
              <li><a href="#events" className="hover:text-gray-900">Healthcare Visits</a></li>
              <li><a href="#events" className="hover:text-gray-900">Education Support</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold mb-2" style={{ color: brand.black }}>Get involved</div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#contact" className="hover:text-gray-900">Volunteer</a></li>
              <li><a href="#contact" className="hover:text-gray-900">Partner with us</a></li>
              <li><a href="#gallery" className="hover:text-gray-900">See our work</a></li>
              <li><a href="#testimonials-heading" className="hover:text-gray-900">Stories</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold mb-2" style={{ color: brand.black }}>Stay updated</div>
            <p className="text-sm text-gray-600 mb-3">Get quarterly updates from our community work.</p>
            <form onSubmit={(e) => { e.preventDefault(); const email = (e.currentTarget.elements.namedItem('newsletter-email') as HTMLInputElement)?.value || ''; window.location.href = `mailto:info@helpbeyondborders.ng?subject=${encodeURIComponent('Newsletter signup')}&body=${encodeURIComponent('Email: ' + email)}`; }} className="flex items-center gap-2">
              <input id="newsletter-email" name="newsletter-email" type="email" required placeholder="Your email" className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2" />
              <button type="submit" className="rounded-full px-4 py-2 text-white text-sm" style={{ backgroundColor: brand.orange }}>Join</button>
            </form>
            <div className="mt-4 text-sm text-gray-600">
              <div>Lagos, Nigeria</div>
              <div>info@helpbeyondborders.ng</div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100">
          <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} Help Beyond Borders Nigeria. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <a href="#about" className="hover:text-gray-900">About</a>
              <a href="#events" className="hover:text-gray-900">Impact</a>
              <a href="#contact" className="hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// (Removed unused components: TestimonialsSlider, ImpactCarousel)
