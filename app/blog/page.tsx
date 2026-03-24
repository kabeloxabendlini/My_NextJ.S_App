import { prisma } from '@/lib/db';
import Link from 'next/link';
import DeleteButton from '../components/DeleteButton'; // ✅ import

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
  const posts = [...dummyPosts, ...dbPosts];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border rounded-md p-4 hover:shadow-lg transition">

            <h2 className="text-xl font-semibold">{post.title}</h2>

            <p className="text-gray-200 mt-2">
              {post.content.substring(0, 100)}...
            </p>

            <div className="flex items-center gap-4 mt-2">
              <Link
                href={`/blog/${post.id}`}
                className="text-blue-400 hover:underline"
              >
                Read More
              </Link>

              {/* ✅ Delete Button */}
              <DeleteButton id={post.id} />
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
}