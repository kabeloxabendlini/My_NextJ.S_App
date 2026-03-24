import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";

// Dummy books data
const dummyBooks = [
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

// GET: Fetch all books or search by query
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query")?.toLowerCase() || "";

    // Seed dummy books if DB is empty
    const count = await prisma.book.count();
    if (count === 0) {
      await prisma.book.createMany({ data: dummyBooks });
      console.log("Seeded dummy books");
    }

    // Fetch all books
    const allBooks = await prisma.book.findMany();

    // Filter by query if provided
    const filteredBooks = query
  ? allBooks.filter((b: { title: string }) =>
      b.title.toLowerCase().includes(query.toLowerCase())
    )
  : allBooks;

  //
    return NextResponse.json(filteredBooks);
  } catch (err) {
    console.error("GET failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Add a new book
export async function POST(req: Request) {
  try {
    const { title, link, img } = await req.json();

    if (!title || !link || !img) {
      return NextResponse.json({ error: "Missing title, link, or img" }, { status: 400 });
    }

    const newBook = await prisma.book.create({
      data: { title, link, img },
    });

    return NextResponse.json({ message: "Book added successfully", book: newBook });
  } catch (err) {
    console.error("POST failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}