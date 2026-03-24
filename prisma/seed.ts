import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Books (existing)
  const books = [
    {
      title: "MERN Stack",
      link: "https://www.amazon.com/Beginning-MERN-Stack-MongoDB-Express/dp/B0979MGJ5J",
      img: "https://m.media-amazon.com/images/I/41y8qC9RT0S._SX404_BO1,204,203,200_.jpg",
    },
    {
      title: "Beginning GraphQL",
      link: "https://www.amazon.com/Beginning-GraphQL-React-NodeJS-Apollo/dp/B0BXMRB5VF/",
      img: "https://m.media-amazon.com/images/I/41+PG6uPdHL._SX404_BO1,204,203,200_.jpg",
    },
    {
      title: "Beginning React Hooks",
      link: "https://www.amazon.com/Beginning-React-Hooks-Greg-Lim/dp/B0892HRT3C/",
      img: "https://m.media-amazon.com/images/I/41e9U1d9QIL._SX404_BO1,204,203,200_.jpg",
    },
  ];

  for (const book of books) {
    const exists = await prisma.book.findFirst({ where: { title: book.title } });
    if (!exists) await prisma.book.create({ data: book });
  }

  // Seed BlogPosts
  const blogPosts = [
    { title: "Introducing Our Bookstore", content: "Welcome to our bookstore blog! Updates, tips, and book recommendations." },
    { title: "Top 5 Fiction Books", content: "Check out these amazing fiction books that you must read this year." },
    { title: "Reading Tips", content: "How to make the most of your reading time with easy strategies." },
  ];

  for (const post of blogPosts) {
    const exists = await prisma.blogPost.findFirst({ where: { title: post.title } });
    if (!exists) await prisma.blogPost.create({ data: post });
  }

  // Seed Services
  const services = [
    { title: "Book Recommendations", description: "Personalized book recommendations based on your taste.", price: 0 },
    { title: "Gift Wrapping", description: "We wrap your books beautifully for gifts.", price: 5 },
    { title: "Online Orders", description: "Order books online and get fast delivery.", price: 0 },
  ];

  for (const service of services) {
    const exists = await prisma.service.findFirst({ where: { title: service.title } });
    if (!exists) await prisma.service.create({ data: service });
  }

  console.log("✅ Books, BlogPosts, and Services seeded successfully");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });