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

const dummyPosts: BlogPost[] = [
  { id: '1', title: 'Introducing Our Bookstore', content: 'Welcome to our bookstore blog!' },
  { id: '2', title: 'Top 5 Fiction Books', content: 'Check out these amazing books...' },
  { id: '3', title: 'Reading Tips', content: 'How to make the most of your reading time.' },
];

export default function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    if (!id) return;
    const dummy = dummyPosts.find(p => p.id === id);
    if (dummy) { setPost(dummy); setLoading(false); }

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

  if (loading) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
      <p className="text-sm text-gray-400 dark:text-white/30">Loading...</p>
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-3xl mx-auto space-y-3">
        <h1 className="text-xl font-semibold text-red-500">Post not found</h1>
        <Link href="/blog" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
          ← Back to blog
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Post */}
        <div className="space-y-2">
          <Link href="/blog" className="text-xs text-gray-400 dark:text-white/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            ← Back to blog
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{post.title}</h1>
          <p className="text-sm text-gray-600 dark:text-white/50 leading-relaxed">{post.content}</p>
        </div>

        {/* Comments section */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-gray-500 dark:text-white/40 uppercase tracking-wider">
            Comments {comments.length > 0 && `(${comments.length})`}
          </h2>

          {/* Add comment */}
          <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-4 space-y-3">
            <div className="flex gap-2">
              <input
                value={newAuthor}
                onChange={e => setNewAuthor(e.target.value)}
                placeholder="Your name (optional)"
                className="w-1/3 bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              <input
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              <button
                onClick={handleAddComment}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors shrink-0"
              >
                Post
              </button>
            </div>
          </div>

          {/* Comment list */}
          {comments.length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-white/30 text-center py-4">No comments yet — be the first!</p>
          ) : (
            <div className="space-y-3">
              {comments.map(c => (
                <div
                  key={c.id}
                  className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
                >
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{c.author}</span>
                      <span className="text-xs text-gray-400 dark:text-white/30">
                        {new Date(c.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {editingCommentId === c.id ? (
                      <input
                        value={editingText}
                        onChange={e => setEditingText(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      />
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-white/50">{c.text}</p>
                    )}
                  </div>

                  <div className="flex gap-2 shrink-0">
                    {editingCommentId === c.id ? (
                      <button
                        onClick={handleEditComment}
                        className="text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => { setEditingCommentId(c.id); setEditingText(c.text); }}
                        className="text-xs font-medium bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteComment(c.id)}
                      className="text-xs font-medium bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}