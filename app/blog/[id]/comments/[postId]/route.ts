import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const comments = await prisma.comment.findMany({
    where: { postId: params.id },
  });

  return NextResponse.json(comments);
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { text } = await req.json();

  const comment = await prisma.comment.create({
    data: {
      text,
      postId: params.id,
    },
  });

  return NextResponse.json(comment);
}