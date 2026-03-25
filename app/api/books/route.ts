import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Book as PrismaBook } from "@prisma/client";
import { dummyBooks, type Book } from "@/lib/dummyBooks";

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

    const existingIds = new Set(books.map((b: Book) => b.id));
    const mergedBooks = [
      ...books,
      ...dummyBooks.filter((b: Book) => !existingIds.has(b.id)),
    ];

    const filteredBooks = query
      ? mergedBooks.filter((b: Book) => b.title.toLowerCase().includes(query))
      : mergedBooks;

    return NextResponse.json(filteredBooks);
  } catch (err) {
    console.error("API GET /books error:", err);
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, img, link } = body;

    if (!title || !img || !link) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
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
      console.warn("Prisma create failed, adding only to dummyBooks:", err);
      newBook = { id: `dummy-${Date.now()}`, title, img, link };
    }

    if (!dummyBooks.some((b: Book) => b.id === newBook.id)) {
      dummyBooks.push(newBook);
    }

    return NextResponse.json(newBook);
  } catch (err) {
    console.error("API POST /books error:", err);
    return NextResponse.json({ error: "Failed to add book" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    try {
      await prisma.book.delete({ where: { id } });
    } catch (err) {
      console.warn("Prisma delete failed:", err);
    }

    const index = dummyBooks.findIndex((b: Book) => b.id === id);
    if (index !== -1) dummyBooks.splice(index, 1);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API DELETE /books error:", err);
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 });
  }
}