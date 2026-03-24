'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    await fetch('/api/blog', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
    });

    router.push('/blog');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Blog Post</h1>

      <input
        placeholder="Title"
        className="w-full mb-3 p-2 bg-gray-800 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        className="w-full mb-3 p-2 bg-gray-800 rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        Create
      </button>
    </div>
  );
}