import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Kabelo: Contact Page",
  description: "Contact Kabelo Bookstore App for questions, support, or inquiries.",
  keywords: "bookstore, contact, support",
};

const contactInfo = [
  {
    label: "Phone",
    lines: ["555-555-5555", "061 836 5596"],
  },
  {
    label: "Email",
    lines: ["support@kabelobookstore.com", "kabeloxabendlini385@gmail.com"],
  },
  {
    label: "Address",
    lines: [
      "123 Book Street, Durban, South Africa",
      "1875 Van Niekerk Street, Ext 3, Margate, South Africa",
    ],
  },
];

const ContactPage = () => {
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
          className="mx-auto dark:invert"
        />
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mt-5">
          Contact Kabelo Bookstore
        </h1>
        <p className="mt-3 max-w-xl mx-auto text-sm text-gray-500 dark:text-white/40 leading-relaxed">
          Have a question, feedback, or need support? Reach out via phone, email, or send us a message below.
        </p>
      </section>

      {/* Contact info cards */}
      <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-4">
        {contactInfo.map(({ label, lines }) => (
          <div
            key={label}
            className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-5 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-colors"
          >
            <h3 className="text-xs font-medium text-gray-500 dark:text-white/40 uppercase tracking-wider mb-2">
              {label}
            </h3>
            {lines.map(line => (
              <p key={line} className="text-sm text-gray-900 dark:text-white leading-relaxed">{line}</p>
            ))}
          </div>
        ))}
      </section>

      {/* Contact form */}
      <section className="max-w-2xl mx-auto px-6 pb-16">
        <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-medium text-gray-900 dark:text-white">Send us a message</h2>

          <div>
            <label className="block text-xs text-gray-500 dark:text-white/40 mb-1.5">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 dark:text-white/40 mb-1.5">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 dark:text-white/40 mb-1.5">Message</label>
            <textarea
              placeholder="How can we help?"
              rows={5}
              className="w-full bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
          >
            Send message
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-black/10 dark:border-white/10 py-12 px-6 text-center space-y-4">
        <h2 className="text-base font-medium text-gray-900 dark:text-white">Still need help?</h2>
        <p className="text-sm text-gray-500 dark:text-white/40">
          Visit our{" "}
          <Link href="/about" className="text-indigo-600 dark:text-indigo-400 hover:underline">About page</Link>
          {" "}or head back to the{" "}
          <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">Home page</Link>.
        </p>
        <Link
          href="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors"
        >
          Back to home
        </Link>
      </section>

    </div>
  );
};

export default ContactPage;