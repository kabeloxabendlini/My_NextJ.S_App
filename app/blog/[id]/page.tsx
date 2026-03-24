'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  content: string;
}

interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

export default function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const dummyPosts: BlogPost[] = [
    { id: '1', title: 'Introducing Our Bookstore', content: 'Welcome to our bookstore blog!' },
    { id: '2', title: 'Top 5 Fiction Books', content: 'Check out these amazing books...' },
    { id: '3', title: 'Reading Tips', content: 'How to make the most of your reading time.' },
  ];

  useEffect(() => {
    if (!id) return;

    const dummy = dummyPosts.find(p => p.id === id);
    if (dummy) {
      setPost(dummy);
      setLoading(false);
    }

    fetch(`/api/blog/${id}/comments`)
      .then(res => res.json())
      .then(setComments)
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const res = await fetch(`/api/blog/${id}/comments`, {
      method: 'POST',
      body: JSON.stringify({ text: newComment, author: newAuthor || 'Anonymous' }),
    });
    const saved = await res.json();
    setComments([saved, ...comments]);
    setNewComment('');
    setNewAuthor('');
  };

  const handleDeleteComment = async (commentId: string) => {
    await fetch(`/api/blog/${id}/comments?commentId=${commentId}`, { method: 'DELETE' });
    setComments(comments.filter(c => c.id !== commentId));
  };

  const startEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingText(comment.text);
  };

  const handleEditComment = async () => {
    if (!editingCommentId) return;
    const res = await fetch(`/api/blog/${id}/comments`, {
      method: 'PATCH',
      body: JSON.stringify({ commentId: editingCommentId, text: editingText }),
    });
    const updated = await res.json();
    setComments(comments.map(c => (c.id === updated.id ? updated : c)));
    setEditingCommentId(null);
    setEditingText('');
  };

  if (loading) return <p className="p-6 text-gray-400">Loading...</p>;
  if (!post)
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-red-400">Post Not Found</h1>
        <Link href="/blog" className="text-blue-400 mt-4 inline-block">Back to Blog</Link>
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-200 mb-6">{post.content}</p>

      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      <ul className="mb-4 space-y-2">
        {comments.map((c) => (
          <li key={c.id} className="flex flex-col md:flex-row md:justify-between border rounded-md p-2 bg-gray-800">
            <div>
              <strong>{c.author}</strong> • <small>{new Date(c.createdAt).toLocaleString()}</small>
              {editingCommentId === c.id ? (
                <input
                  value={editingText}
                  onChange={e => setEditingText(e.target.value)}
                  className="mt-1 px-2 py-1 rounded bg-gray-700 text-white"
                />
              ) : (
                <p>{c.text}</p>
              )}
            </div>

            <div className="flex gap-2 mt-2 md:mt-0">
              {editingCommentId === c.id ? (
                <button onClick={handleEditComment} className="text-green-400 hover:text-green-500">Save</button>
              ) : (
                <button onClick={() => startEdit(c)} className="text-yellow-400 hover:text-yellow-500">Edit</button>
              )}
              <button onClick={() => handleDeleteComment(c.id)} className="text-red-400 hover:text-red-500">Delete</button>
            </div>
          </li>
        ))}
        {comments.length === 0 && <p className="text-gray-400">No comments yet!</p>}
      </ul>

      <div className="flex gap-2 mb-4">
        <input
          value={newAuthor}
          onChange={e => setNewAuthor(e.target.value)}
          placeholder="Your name (optional)"
          className="px-3 py-2 rounded bg-gray-700 text-white w-1/4"
        />
        <input
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 px-3 py-2 rounded bg-gray-700 text-white"
        />
        <button onClick={handleAddComment} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded">Add</button>
      </div>

      <Link href="/blog" className="text-blue-400 mt-6 inline-block">← Back to Blog</Link>
    </div>
  );
}