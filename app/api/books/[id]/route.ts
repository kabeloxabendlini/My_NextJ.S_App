import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { dummyBooks } from "../route";
import type { Book } from "../route";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    let book = await prisma.book.findUnique({ where: { id } });

    if (!book) {
      book = dummyBooks.find((b: Book) => b.id === id) || null;
    }

    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: book.id.toString(),
      title: book.title,
      link: book.link,
      img: book.img,
    });
  } catch (err) {
    console.error("GET /api/books/[id] failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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
    } catch (err: unknown) {
      if ((err as { code?: string })?.code !== "P2025") throw err;
    }

    const index = dummyBooks.findIndex((b: Book) => b.id === id);
    if (index !== -1) dummyBooks.splice(index, 1);

    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/books/[id] failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}