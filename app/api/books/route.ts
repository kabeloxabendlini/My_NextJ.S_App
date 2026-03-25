import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { dummyBooks, type Book } from "@/lib/dummyBooks";
import { Book as PrismaBook } from "@prisma/client";

export async function GET(req: Request) {
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
    console.warn("Prisma fetch failed, using dummyBooks only:", err);
  }

  const existingIds = new Set(books.map((b) => b.id));
  const mergedBooks = [
    ...books,
    ...dummyBooks.filter((b) => !existingIds.has(b.id)),
  ];

  const filteredBooks = query
    ? mergedBooks.filter((b) => b.title.toLowerCase().includes(query))
    : mergedBooks;

  return NextResponse.json(filteredBooks);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, img, link } = body;

  if (!title || !img || !link) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  let newBook: Book;

  try {
    const created = await prisma.book.create({ data: { title, img, link } });
    newBook = {
      id: created.id,
      title: created.title,
      img: created.img,
      link: created.link,
    };
  } catch (err) {
    console.warn("Prisma create failed, using dummy:", err);
    newBook = { id: `dummy-${Date.now()}`, title, img, link };
  }

  if (!dummyBooks.some((b) => b.id === newBook.id)) {
    dummyBooks.push(newBook);
  }

  return NextResponse.json(newBook);
}