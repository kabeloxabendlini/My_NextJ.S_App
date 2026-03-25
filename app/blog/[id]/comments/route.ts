import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const comments = await prisma.comment.findMany({
    where: { postId: id },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(comments);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { text, author } = await req.json();
  const comment = await prisma.comment.create({
    data: { text, author: author || 'Anonymous', postId: id },
  });
  return NextResponse.json(comment);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await params;
  const { searchParams } = new URL(req.url);
  const commentId = searchParams.get('commentId');
  if (!commentId) return NextResponse.json({ error: 'commentId is required' }, { status: 400 });

  await prisma.comment.delete({ where: { id: commentId } });
  return NextResponse.json({ message: 'Comment deleted' });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await params;
  const { commentId, text } = await req.json();
  if (!commentId) return NextResponse.json({ error: 'commentId is required' }, { status: 400 });

  const updated = await prisma.comment.update({
    where: { id: commentId },
    data: { text },
  });
  return NextResponse.json(updated);
}