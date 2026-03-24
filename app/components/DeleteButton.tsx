'use client';

import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    await fetch(`/api/blog/${id}`, { method: 'DELETE' });
    router.refresh(); // better than reload
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-400 hover:text-red-500"
    >
      Delete
    </button>
  );
}