import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { dummyBooks } from "../route"; // now works because we exported it
import type { Book } from "../route"; // import Book type for TS

// ------------------ GET single book by ID ------------------
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Try fetching from MongoDB
    let book = await prisma.book.findUnique({
      where: { id: params.id },
    });

    // Fallback: check dummyBooks
    if (!book) {
      book = dummyBooks.find((b: Book) => b.id === params.id) || null;
    }

    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    const result = {
      id: book.id.toString(),
      title: book.title,
      link: book.link,
      img: book.img,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("GET /api/books/[id] failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ------------------ DELETE book by ID ------------------
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Delete from MongoDB if exists
    try {
      await prisma.book.delete({ where: { id: params.id } });
    } catch (err: any) {
      if (err?.code !== "P2025") throw err;
    }

    // Remove from dummyBooks
    const index = dummyBooks.findIndex((b: Book) => b.id === params.id);
    if (index !== -1) dummyBooks.splice(index, 1);

    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/books/[id] failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}