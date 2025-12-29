// File: app/history/page.tsx
"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Dummy data built from public copy on the site (edited/condensed) ---
// Replace images with your own assets in /public/history/*
const MILESTONES: {
  year: number;
  title: string;
  items: string[];
  img?: string;
}[] = [
  {
    year: 2011,
    title: "We opened our first shop",
    items: [
      "Lucciano’s is born in Mar del Plata",
      "Family company focused on premium artisan gelato",
    ],
    img: "/history/2011.jpg",
  },
  {
    year: 2013,
    title: "Buenos Aires landing",
    items: ["First store in Martínez", "Tonio icepop is born"],
    img: "/history/2013.jpg",
  },
  {
    year: 2015,
    title: "Inspiration Lab",
    items: ["We opened our factory", "R&D and product development in Italy"],
    img: "/history/2015.jpg",
  },
  {
    year: 2016,
    title: "New cities & character pops",
    items: ["Minion icepop", "First shop outside Buenos Aires (Rosario)"],
    img: "/history/2016.jpg",
  },
  {
    year: 2017,
    title: "Awards",
    items: ["Best Ice Cream in CABA"],
    img: "/history/2017.jpg",
  },
  {
    year: 2019,
    title: "Lucciano’s US",
    items: ["Brand lands in the United States"],
    img: "/history/2019.jpg",
  },
  {
    year: 2020,
    title: "Expansion & collabs",
    items: [
      "10-year anniversary",
      "Uruguay opens",
      "Lucciano's Market",
      "Special gelato inspired in “Money Heist”",
      "Inspiration Lab works",
    ],
    img: "/history/2020.jpg",
  },
  {
    year: 2021,
    title: "Europe & new lines",
    items: [
      "RAW vegan line",
      "We landed in Rome & Barcelona",
      "Hi Málaga",
      "Mini Icepops & Gluten Free line",
      "Liberty icepop",
    ],
    img: "/history/2021.jpg",
  },
  {
    year: 2022,
    title: "Valencia & Central",
    items: ["We landed in Valencia", "Welcome to Lucciano’s Central"],
    img: "/history/2022.jpg",
  },
  {
    year: 2023,
    title: "Recognition",
    items: ["Entrepreneur of the Year – Christian & Daniel Otero"],
    img: "/history/2023.jpg",
  },
  {
    year: 2024,
    title: "…and counting",
    items: ["New shops and products"],
    img: "/history/2024.jpg",
  },
];

export default function HistoryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const pinColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero intro
    if (heroRef.current) {
      const ctx = gsap.context(() => {
        gsap.from("[data-hero-fade]", {
          y: 24,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power2.out",
        });
      }, heroRef);
      return () => ctx.revert();
    }
  }, []);

  useEffect(() => {
    // Sticky year column pin
    if (!pinColRef.current) return;
    const el = pinColRef.current;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top+=80",
          end: () =>
            `+=${document.body.scrollHeight - window.innerHeight - 200}`,
          pin: true,
          pinSpacing: false,
        },
      });
      return () => tl.scrollTrigger?.kill();
    });

    // Reveal each milestone row
    const rows = document.querySelectorAll("[data-row]");
    rows.forEach((row) => {
      gsap.from(row, {
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: row as Element,
          start: "top 80%",
        },
      });
    });

    // Parallax images
    const images = document.querySelectorAll("[data-parallax]");
    images.forEach((img) => {
      gsap.to(img, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: img as Element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            Lucciano’s
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#story" className="hover:opacity-70">
              History
            </Link>
            <Link href="#products" className="hover:opacity-70">
              Products
            </Link>
            <Link href="#shops" className="hover:opacity-70">
              Shops
            </Link>
            <Link href="#contact" className="hover:opacity-70">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <p
            data-hero-fade
            className="uppercase tracking-[0.25em] text-xs text-neutral-500"
          >
            Know us
          </p>
          <h1
            data-hero-fade
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
          >
            Get to know our{" "}
            <span className="bg-gradient-to-br from-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
              story
            </span>
          </h1>
          <p data-hero-fade className="mt-6 max-w-3xl text-neutral-600">
            Lucciano’s is a family-owned company, born out of a desire to
            satisfy the most demanding segment of gelato consumers. We brought
            back the latest Italian technology and masters, combining the best
            national and Italian raw materials with Belgian chocolate to craft a
            premium product.
          </p>
        </div>

        {/* Decorative image grid */}
        <div className="pointer-events-none select-none absolute inset-x-0 bottom-0 translate-y-1/3 opacity-80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-xl bg-neutral-200"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section
        id="story"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
      >
        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-16">
          {/* Sticky years column */}
          <aside ref={pinColRef} className="hidden lg:block">
            <div className="sticky top-24">
              <ul className="space-y-2 text-neutral-400 font-semibold">
                {MILESTONES.map((m) => (
                  <li
                    key={m.year}
                    className="hover:text-neutral-900 transition"
                  >
                    {m.year}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Milestones list */}
          <div className="space-y-16">
            {MILESTONES.map((m, idx) => (
              <article
                key={m.year}
                data-row
                className="grid md:grid-cols-2 gap-6 md:gap-10 items-start"
              >
                <div>
                  <p className="text-sm font-semibold text-fuchsia-600">
                    {m.year}
                  </p>
                  <h3 className="mt-2 text-2xl md:text-3xl font-bold">
                    {m.title}
                  </h3>
                  <ul className="mt-4 space-y-2 text-neutral-700">
                    {m.items.map((it, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400 shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <div className="aspect-[16/10] overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
                    {/* Replace with real images placed in /public/history/*.jpg */}
                    <Image
                      src={m.img || "/placeholder.png"}
                      alt={`${m.year} – ${m.title}`}
                      fill
                      className="object-cover"
                      priority={idx < 2}
                      data-parallax
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="contact" className="bg-white border-t border-neutral-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-2xl md:text-3xl font-bold">
            Subscribe to our newsletter
          </h2>
          <p className="mt-2 text-neutral-600">
            Get the latest news and releases straight to your inbox.
          </p>
          <form className="mt-6 grid sm:grid-cols-[1fr_auto] gap-3">
            <input
              className="h-12 rounded-xl border border-neutral-300 px-4 outline-none focus:border-neutral-900"
              placeholder="Name"
            />
            <input
              className="h-12 rounded-xl border border-neutral-300 px-4 outline-none focus:border-neutral-900 sm:col-start-1"
              placeholder="Email"
              type="email"
            />
            <button className="h-12 rounded-xl bg-neutral-900 text-white px-6 font-semibold">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Lucciano’s (demo). All rights
            reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="#" className="hover:text-white">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

// -----------------------------
// SETUP NOTES (README snippet)
// 1) Create a Next.js App Router project
//    npx create-next-app@latest luccianos-history --ts --eslint --tailwind --app --src-dir false --import-alias "@/*"
// 2) Install GSAP
//    npm i gsap
// 3) Add images to /public/history/*.jpg or change the paths above
// 4) Tailwind is already configured by the starter. Optionally add custom fonts/colors.
// 5) Run the project
//    npm run dev
