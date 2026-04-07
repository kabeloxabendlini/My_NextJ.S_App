import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { title, content } = await req.json();

  const updated = await prisma.blogPost.update({
    where: { id },
    data: { title, content },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.blogPost.delete({ where: { id } });

  return NextResponse.json({ message: 'Deleted' });
}