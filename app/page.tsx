"use client";

import Link from "next/link";
import Image from "next/image";
import Books from './components/Books';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center text-zinc-50">

      {/* Hero Section */}
      <section className="hero min-h-[40vh] bg-zinc-800 shadow-md w-full">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <Image
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              style={{ width: "auto", height: "auto" }}
              priority
            />
            <h1 className="text-4xl font-bold mt-6 text-white">Welcome to My Next.js App</h1>
            <p className="py-4 text-lg text-gray-300">
              Explore the pages below to navigate through the application.
            </p>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="w-full max-w-6xl p-10">
        <Books />
      </section>

      {/* Navigation Cards */}
      <section className="grid md:grid-cols-3 gap-6 p-10 max-w-6xl w-full">

        {/* Home Card */}
        <div className="card bg-zinc-800 shadow-xl border border-gray-700">
          <div className="card-body">
            <h2 className="card-title text-white">Home</h2>
            <p className="text-gray-300">Main landing page of the application.</p>
            <div className="card-actions justify-end">
              <Link href="/" className="btn btn-primary">Go Home</Link>
            </div>
          </div>
        </div>

        {/* About Card */}
        <div className="card bg-zinc-800 shadow-xl border border-gray-700">
          <div className="card-body">
            <h2 className="card-title text-white">About</h2>
            <p className="text-gray-300">Learn more about this project.</p>
            <div className="dropdown dropdown-bottom">
              <label tabIndex={0} className="btn btn-secondary">About Pages</label>
              <ul tabIndex={0} className="dropdown-content menu bg-zinc-700 rounded-box z-[1] w-52 p-2 shadow">
                <li><Link href="/about" className="text-white hover:text-primary">About Page</Link></li>
                <li><Link href="/about/contact" className="text-white hover:text-primary">Contact Page</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* GitHub Users Card */}
        <div className="card bg-zinc-800 shadow-xl border border-primary">
          <div className="card-body">
            <h2 className="card-title text-primary">GitHub Users</h2>
            <p className="text-gray-300">View GitHub users fetched from the GitHub API.</p>
            <div className="card-actions justify-end">
              <Link href="/githubusers" className="btn btn-primary">View Users</Link>
            </div>
          </div>
        </div>

      </section>

      {/* Resources Section */}
      <section className="flex gap-4 pb-10 flex-wrap justify-center">
        <a className="btn btn-outline text-white border-gray-400 hover:border-white hover:text-white" href="https://nextjs.org/docs" target="_blank">Next.js Docs</a>
        <a className="btn btn-outline text-white border-gray-400 hover:border-white hover:text-white" href="https://nextjs.org/learn" target="_blank">Learn Next.js</a>
        <a className="btn btn-accent text-white" href="https://vercel.com/new" target="_blank">Deploy on Vercel</a>
      </section>

    </div>
  );
}