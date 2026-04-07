// app/api/blog/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Return all blog posts
  return NextResponse.json({ posts: [] });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, author } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // TODO: save to your database here
    const newPost = { id: Date.now(), title, content, author };

    return NextResponse.json({ post: newPost }, { status: 201 });
  } catch (err) {
    console.error('Blog API error:', err);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}