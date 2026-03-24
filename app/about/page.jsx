export const metadata = {
  title: "Kabelo: Bookstore App!",
  description:
    "A Bookstore App that helps store books and make them feasible and attainable.",
  keywords: "Bookstore App, store books, feasible, attainable",
};

import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-base-200 dark:bg-gray-900 text-base-content dark:text-gray-100">
      {/* Hero Section */}
      <section className="bg-base-100 dark:bg-gray-800 shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <Image
            src="/next.svg"
            alt="Bookstore Logo"
            width={120}
            height={40}
            style={{ height: "auto" }}
            priority
            className="mx-auto"
          />
          <h1 className="text-5xl font-bold mt-6 text-primary dark:text-accent">
            About Kabelo Bookstore App
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Kabelo Bookstore App is designed to make book storage and
            management seamless, feasible, and highly attainable. Organize your
            books, keep track of your reading, and discover new favorites all
            in one place.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-10 text-center text-primary dark:text-accent">
            Why Choose Kabelo Bookstore?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-base-100 dark:bg-gray-800 shadow-lg p-6 rounded-xl hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-2">Easy Organization</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Keep your books neatly organized with categories, tags, and
                custom shelves.
              </p>
            </div>

            <div className="card bg-base-100 dark:bg-gray-800 shadow-lg p-6 rounded-xl hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-2">Track Your Reading</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Monitor your reading progress, set goals, and never lose track
                of your favorite titles.
              </p>
            </div>

            <div className="card bg-base-100 dark:bg-gray-800 shadow-lg p-6 rounded-xl hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-2">Discover New Books</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Explore suggestions, trending books, and curated collections to
                expand your library.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary/10 dark:bg-accent/20 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-primary dark:text-accent">
            Ready to Start Your Library?
          </h2>
          <p className="mb-8 text-gray-700 dark:text-gray-200">
            Get started today and take control of your book collection with
            Kabelo Bookstore App. Simple, sleek, and powerful.
          </p>
          <Link
            href="/"
            className="btn btn-primary btn-lg hover:btn-accent transition"
          >
            Go to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;