'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    await fetch('/api/blog', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
    });
    router.push('/blog');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="space-y-1">
          <Link href="/blog" className="text-xs text-gray-400 dark:text-white/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            ← Back to blog
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">New post</h1>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-xs text-gray-500 dark:text-white/40 mb-1.5">Title</label>
            <input
              placeholder="Post title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 dark:text-white/40 mb-1.5">Content</label>
            <textarea
              placeholder="Write your post..."
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={8}
              className="w-full bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSubmit}
              disabled={loading || !title.trim() || !content.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              {loading ? 'Publishing...' : 'Publish post'}
            </button>
            <Link
              href="/blog"
              className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-white/60 border border-black/10 dark:border-white/10 text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}