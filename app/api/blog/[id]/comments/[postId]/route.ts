import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string; postId: string }> }
) {
  const { id } = await params;
  const comments = await prisma.comment.findMany({
    where: { postId: id },
  });
  return NextResponse.json(comments);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string; postId: string }> }
) {
  const { id } = await params;
  const { text } = await req.json();
  const comment = await prisma.comment.create({
    data: { text, postId: id },
  });
  return NextResponse.json(comment);
}