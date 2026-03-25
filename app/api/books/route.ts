import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Book as PrismaBook } from "@prisma/client";

export type Book = {
  id: string;
  title: string;
  img: string;
  link: string;
};

export const dummyBooks: Book[] = [
  {
    id: "dummy-1",
    title: "MERN Stack",
    link: "https://www.amazon.com/Beginning-MERN-Stack-MongoDB-Express/dp/B0979MGJ5J",
    img: "https://m.media-amazon.com/images/I/41y8qC9RT0S._SX404_BO1,204,203,200_.jpg",
  },
  {
    id: "dummy-2",
    title: "Beginning GraphQL",
    link: "https://www.amazon.com/Beginning-GraphQL-React-NodeJS-Apollo/dp/B0BXMRB5VF/",
    img: "https://m.media-amazon.com/images/I/41+PG6uPdHL._SX404_BO1,204,203,200_.jpg",
  },
  {
    id: "dummy-3",
    title: "Beginning React Hooks",
    link: "https://www.amazon.com/Beginning-React-Hooks-Greg-Lim/dp/B0892HRT3C/",
    img: "https://m.media-amazon.com/images/I/41e9U1d9QIL._SX404_BO1,204,203,200_.jpg",
  },
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = (searchParams.get("query") || "").toLowerCase();

    let books: Book[] = [];

    try {
      const prismaBooks = await prisma.book.findMany();
      books = prismaBooks.map((b: PrismaBook) => ({
        id: b.id,
        title: b.title,
        img: b.img,
        link: b.link,
      }));
    } catch (err) {
      console.error("Prisma fetch failed, using dummyBooks only:", err);
    }

    const existingIds = new Set(books.map((b) => b.id));
    const mergedBooks = [
      ...books,
      ...dummyBooks.filter((b) => !existingIds.has(b.id)),
    ];

    const filteredBooks = query
      ? mergedBooks.filter((b) =>
          b.title.toLowerCase().includes(query)
        )
      : mergedBooks;

    return NextResponse.json(filteredBooks);
  } catch (err) {
    console.error("API GET /books error:", err);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, img, link } = body;

    if (!title || !img || !link) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    let newBook: Book;

    try {
      const created = await prisma.book.create({
        data: { title, img, link },
      });

      newBook = {
        id: created.id,
        title: created.title,
        img: created.img,
        link: created.link,
      };
    } catch (err) {
      console.warn("Prisma create failed, using dummy:", err);
      newBook = {
        id: `dummy-${Date.now()}`,
        title,
        img,
        link,
      };
    }

    if (!dummyBooks.some((b) => b.id === newBook.id)) {
      dummyBooks.push(newBook);
    }

    return NextResponse.json(newBook);
  } catch (err) {
    console.error("API POST /books error:", err);
    return NextResponse.json(
      { error: "Failed to add book" },
      { status: 500 }
    );
  }
}