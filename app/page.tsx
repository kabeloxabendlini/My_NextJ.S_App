"use client";

import Link from "next/link";
import Image from "next/image";
import Books from "./components/Books";

const navCards = [
  {
    title: "Home",
    description: "Main landing page of the application.",
    href: "/",
    label: "Go home",
    variant: "primary" as const,
  },
  {
    title: "GitHub Users",
    description: "View GitHub users fetched from the GitHub API.",
    href: "/githubusers",
    label: "View users",
    variant: "primary" as const,
  },
];

const aboutLinks = [
  { href: "/about", label: "About page" },
  { href: "/about/contact", label: "Contact page" },
];

const resources = [
  { href: "https://nextjs.org/docs", label: "Next.js docs" },
  { href: "https://nextjs.org/learn", label: "Learn Next.js" },
  { href: "https://vercel.com/new", label: "Deploy on Vercel" },
  { href: "https://my-next-js-app-zeta-three.vercel.app/blog/create", label: "Blog Creation" },
  { href: "https://my-next-js-app-zeta-three.vercel.app/blog/[id]", label: "Blog Post" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Hero */}
      <section className="w-full bg-white dark:bg-white/5 border-b border-black/10 dark:border-white/10 py-16 px-6 flex flex-col items-center text-center gap-4">
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={120}
          height={25}
          style={{ width: "auto", height: "auto" }}
          priority
          className="dark:invert"
        />
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
          Welcome to the Bookstore App
        </h1>
        <p className="text-sm text-gray-500 dark:text-white/40 max-w-md">
          Store, browse, and discover books. Navigate through the app using the sections below.
        </p>
      </section>

      {/* Books */}
      <section className="w-full max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-sm font-medium text-gray-500 dark:text-white/40 uppercase tracking-wider mb-5">
          Book collection
        </h2>
        <Books />
      </section>

      {/* Nav cards */}
      <section className="w-full max-w-6xl mx-auto px-6 pb-10">
        <h2 className="text-sm font-medium text-gray-500 dark:text-white/40 uppercase tracking-wider mb-5">
          Pages
        </h2>
        <div className="grid md:grid-cols-3 gap-4">

          {navCards.map(({ title, description, href, label }) => (
            <div
              key={href}
              className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-4"
            >
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">{title}</h3>
                <p className="text-xs text-gray-500 dark:text-white/40">{description}</p>
              </div>
              <Link
                href={href}
                className="self-start text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl transition-colors"
              >
                {label}
              </Link>
            </div>
          ))}

          {/* About card with sub-links */}
          <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">About</h3>
              <p className="text-xs text-gray-500 dark:text-white/40">Learn more about this project.</p>
            </div>
            <div className="flex flex-col gap-1.5">
              {aboutLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {label} →
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Resources */}
      <section className="w-full max-w-6xl mx-auto px-6 pb-14">
        <h2 className="text-sm font-medium text-gray-500 dark:text-white/40 uppercase tracking-wider mb-5">
          Resources
        </h2>
        <div className="flex flex-wrap gap-2">
          {resources.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-gray-700 dark:text-white/60 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 px-4 py-2 rounded-xl transition-colors"
            >
              {label} ↗
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}