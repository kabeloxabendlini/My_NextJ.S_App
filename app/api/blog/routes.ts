import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { title, content } = await req.json();

  const post = await prisma.blogPost.create({
    data: { title, content },
  });

  return NextResponse.json(post);
}