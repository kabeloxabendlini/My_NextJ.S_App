import { prisma } from '@/lib/db';
import Link from 'next/link';
import DeleteButton from '../components/DeleteButton';

interface BlogPost {
  id: string;
  title: string;
  content: string;
}

const dummyPosts: BlogPost[] = [
  { id: 'dummy-1', title: 'Introducing Our Bookstore', content: 'Welcome to our bookstore blog!' },
  { id: 'dummy-2', title: 'Top 5 Fiction Books', content: 'Check out these amazing books...' },
  { id: 'dummy-3', title: 'Reading Tips', content: 'How to make the most of your reading time.' },
];

export default async function BlogPage() {
  const dbPosts = await prisma.blogPost.findMany();
  const posts: BlogPost[] = [...dummyPosts, ...dbPosts];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Blog</h1>
            <p className="text-sm text-gray-500 dark:text-white/40 mt-0.5">{posts.length} posts</p>
          </div>
          <Link
            href="/blog/create"
            className="text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl transition-colors"
          >
            + New post
          </Link>
        </div>

        {/* Posts */}
        <div className="space-y-3">
          {posts.map(post => (
            <div
              key={post.id}
              className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-5 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-colors"
            >
              <h2 className="text-sm font-medium text-gray-900 dark:text-white mb-1">{post.title}</h2>
              <p className="text-xs text-gray-500 dark:text-white/40 leading-relaxed mb-3">
                {post.content.substring(0, 120)}…
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href={`/blog/${post.id}`}
                  className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Read more →
                </Link>
                <DeleteButton id={post.id} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}