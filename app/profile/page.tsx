'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    avatar: '',
  });
  const [editing, setEditing] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ✅ Resize image BEFORE upload (OUTSIDE handler)
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

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
          },
          'image/jpeg',
          0.7
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };

  // Initialize user
  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem('user');

    if (storedUser) setUser(JSON.parse(storedUser));
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

  // ✅ FIXED upload handler
  const handleAvatarUpload = async (file: File) => {
    if (!file) return;

    setUploading(true);

    try {
      const resized = await resizeImage(file);

      const formData = new FormData();
      formData.append('file', resized, file.name);
      formData.append('userId', user.id);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.url) {
        const updatedUser = { ...user, avatar: data.url };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setAvatarError(false);
      } else {
        console.error('Upload error:', data.error);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }

    setUploading(false);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="grid gap-6 w-full max-w-3xl md:grid-cols-2">
        {/* Avatar */}
        <div className="bg-gray-800 p-4 rounded-xl shadow flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-700 flex items-center justify-center">
            {user.avatar && !avatarError ? (
              <img
                src={user.avatar}
                alt="Avatar"
                className="object-cover w-full h-full"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <span className="text-gray-400 text-sm text-center px-2">
                No photo uploaded
              </span>
            )}
          </div>

          {editing && (
            <div className="flex flex-col gap-2 w-full">
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full text-black"
                onChange={(e) =>
                  e.target.files && handleAvatarUpload(e.target.files[0])
                }
              />

              {uploading && (
                <p className="text-sm text-gray-400 animate-pulse">
                  Uploading image...
                </p>
              )}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="bg-gray-800 p-4 rounded-xl shadow flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Name</label>
              {editing ? (
                <input
                  className="w-full mt-1 p-2 rounded bg-gray-700 text-black"
                  value={user.name}
                  onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                  }
                />
              ) : (
                <p className="bg-gray-700 p-2 rounded mt-1">
                  {user.name || 'No name set'}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-400">Email</label>
              {editing ? (
                <input
                  className="w-full mt-1 p-2 rounded bg-gray-700 text-black"
                  value={user.email}
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                  }
                />
              ) : (
                <p className="bg-gray-700 p-2 rounded mt-1">
                  {user.email || 'No email set'}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-6">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="btn btn-primary w-full"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="btn w-full"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="btn btn-primary w-full"
              >
                Edit Profile
              </button>
            )}
            <button
              onClick={handleLogout}
              className="btn w-full bg-red-600 hover:bg-red-700 border-none"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};