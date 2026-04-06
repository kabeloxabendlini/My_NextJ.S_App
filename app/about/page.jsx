import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Kabelo: About",
  description: "A bookstore app that helps store books and make them feasible and attainable.",
  keywords: "bookstore, about, books",
};

const features = [
  {
    title: "Easy organisation",
    description: "Keep your books neatly organised with categories, tags, and custom shelves.",
  },
  {
    title: "Track your reading",
    description: "Monitor your reading progress, set goals, and never lose track of your favourite titles.",
  },
  {
    title: "Discover new books",
    description: "Explore suggestions, trending books, and curated collections to expand your library.",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Hero */}
      <section className="w-full bg-white dark:bg-white/5 border-b border-black/10 dark:border-white/10 py-16 px-6 text-center">
        <Image
          src="/next.svg"
          alt="Bookstore logo"
          width={100}
          height={30}
          style={{ height: "auto" }}
          priority
          className="mx-auto dark:invert"
        />
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mt-5">
          About Kabelo Bookstore
        </h1>
        <p className="mt-3 max-w-xl mx-auto text-sm text-gray-500 dark:text-white/40 leading-relaxed">
          Designed to make book storage and management seamless. Organise your books, track your reading, and discover new favourites — all in one place.
        </p>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-12 space-y-6">
        <h2 className="text-sm font-medium text-gray-500 dark:text-white/40 uppercase tracking-wider">
          Why Kabelo Bookstore?
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {features.map(({ title, description }) => (
            <div
              key={title}
              className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-5 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-colors"
            >
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1.5">{title}</h3>
              <p className="text-xs text-gray-500 dark:text-white/40 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-black/10 dark:border-white/10 py-16 px-6 text-center space-y-4">
        <h2 className="text-base font-medium text-gray-900 dark:text-white">Ready to start your library?</h2>
        <p className="text-sm text-gray-500 dark:text-white/40 max-w-md mx-auto">
          Simple, sleek, and powerful. Take control of your book collection today.
        </p>
        <Link
          href="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors"
        >
          Go to home
        </Link>
      </section>

    </div>
  );
};

export default AboutPage;