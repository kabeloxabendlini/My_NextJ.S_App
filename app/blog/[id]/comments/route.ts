import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const comments = await prisma.comment.findMany({
    where: { postId: params.id },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(comments);
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { text, author } = await req.json();
  const comment = await prisma.comment.create({
    data: { text, author: author || 'Anonymous', postId: params.id },
  });
  return NextResponse.json(comment);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const commentId = searchParams.get('commentId');
  if (!commentId) return NextResponse.json({ error: 'commentId is required' }, { status: 400 });

  await prisma.comment.delete({ where: { id: commentId } });
  return NextResponse.json({ message: 'Comment deleted' });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { commentId, text } = await req.json();
  if (!commentId) return NextResponse.json({ error: 'commentId is required' }, { status: 400 });

  const updated = await prisma.comment.update({
    where: { id: commentId },
    data: { text },
  });
  return NextResponse.json(updated);
}