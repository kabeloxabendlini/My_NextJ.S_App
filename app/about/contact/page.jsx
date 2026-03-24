import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Kabelo: Contact Page",
  description: "Contact Kabelo Bookstore App for questions, support, or inquiries.",
  keywords: "Bookstore App, Contact, Support, Inquiries",
};

const ContactPage = () => {
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
            className="mx-auto"
          />
          <h1 className="text-5xl font-bold mt-6 text-primary dark:text-accent">
            Contact Kabelo Bookstore
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Have a question, feedback, or need support? We’d love to hear from
            you. Reach out via phone, email, or send us a message using the form
            below.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div className="card bg-base-100 dark:bg-gray-800 shadow-lg p-6 rounded-xl hover:shadow-xl transition">
          <h3 className="text-2xl font-semibold mb-2">Phone</h3>
          <p className="text-gray-700 dark:text-gray-300">555-555-5555</p>
           <p className="text-gray-700 dark:text-gray-300">061 836 5596</p>
        </div>

        <div className="card bg-base-100 dark:bg-gray-800 shadow-lg p-6 rounded-xl hover:shadow-xl transition">
          <h3 className="text-2xl font-semibold mb-2">Email</h3>
          <p className="text-gray-700 dark:text-gray-300">support@kabelobookstore.com</p>
          <p className="text-gray-700 dark:text-gray-300">kabeloxabendlini385@gmail.com</p>
        </div>

        <div className="card bg-base-100 dark:bg-gray-800 shadow-lg p-6 rounded-xl hover:shadow-xl transition">
          <h3 className="text-2xl font-semibold mb-2">Address</h3>
          <p className="text-gray-700 dark:text-gray-300">123 Book Street, Durban, South Africa</p>
          <p className="text-gray-700 dark:text-gray-300">1875 Van Niekerk street, Extension 3 Margate, South Africa</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-base-100 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8 text-center text-primary dark:text-accent">
            Send Us a Message
          </h2>
          <form className="grid gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full bg-base-200 dark:bg-gray-900"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full bg-base-200 dark:bg-gray-900"
            />
            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full bg-base-200 dark:bg-gray-900"
              rows={6}
            ></textarea>
            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <h2 className="text-4xl font-bold mb-6 text-primary dark:text-accent">
          Still Need Help?
        </h2>
        <p className="mb-8 text-gray-700 dark:text-gray-300">
          Visit our <Link href="/about" className="text-accent underline">About Page</Link> to learn more about Kabelo Bookstore App, or explore our <Link href="/" className="text-accent underline">Home Page</Link>.
        </p>
        <Link href="/" className="btn btn-primary btn-lg hover:btn-accent transition">
          Back to Home
        </Link>
      </section>

    </div>
  );
};

export default ContactPage;