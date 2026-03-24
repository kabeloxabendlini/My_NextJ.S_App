import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { title, content } = await req.json();

  const updated = await prisma.blogPost.update({
    where: { id: params.id },
    data: { title, content },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.blogPost.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: 'Deleted' });
}