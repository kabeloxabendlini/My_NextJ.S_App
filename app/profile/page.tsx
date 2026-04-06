'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState({ id: '', name: '', email: '', avatar: '' });
  const [editing, setEditing] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const resizeImage = (file: File): Promise<Blob> => {
    return new Promise((resolve) => {
      const img = document.createElement('img');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      img.onload = () => {
        const MAX_WIDTH = 300;
        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => { if (blob) resolve(blob); }, 'image/jpeg', 0.7);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
    else setUser({ id: uuidv4(), name: '', email: '', avatar: '' });
  }, []);

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(user));
    setEditing(false);
    setAvatarError(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleAvatarUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);
    try {
      const resized = await resizeImage(file);
      const formData = new FormData();
      formData.append('file', resized, file.name);
      formData.append('userId', user.id);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        const updatedUser = { ...user, avatar: data.url };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setAvatarError(false);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
    setUploading(false);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-sm text-gray-500 dark:text-white/40">Loading profile...</p>
      </div>
    );
  }

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">My profile</h1>
          <p className="text-sm text-gray-500 dark:text-white/40 mt-1">Manage your account details</p>
        </div>

        {/* Avatar card */}
        <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center gap-4">
          {/* Avatar circle */}
          <div className="w-24 h-24 rounded-full overflow-hidden border border-black/10 dark:border-white/10 bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
            {user.avatar && !avatarError ? (
              <img
                src={user.avatar}
                alt="Avatar"
                className="object-cover w-full h-full"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <span className="text-xl font-medium text-gray-400 dark:text-white/30">{initials}</span>
            )}
          </div>

          {editing && (
            <div className="w-full space-y-2">
              <label className="block text-xs text-gray-500 dark:text-white/40 mb-1">Upload photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => e.target.files && handleAvatarUpload(e.target.files[0])}
                className="block w-full text-sm text-gray-500 dark:text-white/40
                  file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0
                  file:text-sm file:font-medium
                  file:bg-indigo-600 file:text-white
                  hover:file:bg-indigo-500 file:cursor-pointer file:transition-colors"
              />
              {uploading && (
                <p className="text-xs text-gray-400 dark:text-white/30 animate-pulse">Uploading...</p>
              )}
            </div>
          )}
        </div>

        {/* Info card */}
        <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs text-gray-500 dark:text-white/40 mb-1.5">Name</label>
            {editing ? (
              <input
                value={user.name}
                onChange={e => setUser({ ...user, name: e.target.value })}
                placeholder="Your name"
                className="w-full bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            ) : (
              <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5">
                {user.name || <span className="text-gray-400 dark:text-white/20">No name set</span>}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs text-gray-500 dark:text-white/40 mb-1.5">Email</label>
            {editing ? (
              <input
                value={user.email}
                onChange={e => setUser({ ...user, email: e.target.value })}
                placeholder="your@email.com"
                type="email"
                className="w-full bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            ) : (
              <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5">
                {user.email || <span className="text-gray-400 dark:text-white/20">No email set</span>}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-2">
            {editing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
                >
                  Save changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-white/70 border border-black/10 dark:border-white/10 text-sm font-medium py-2.5 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
              >
                Edit profile
              </button>
            )}
            <button
              onClick={handleLogout}
              className="w-full bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 text-sm font-medium py-2.5 rounded-xl transition-colors"
            >
              Log out
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}