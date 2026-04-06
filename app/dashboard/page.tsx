'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import AddBook from '../components/AddBook';

interface Book {
  id: string;
  title: string;
  link: string;
  img: string;
}

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const res = await fetch('/api/books');
      const data = await res.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch {
      setBooks([]);
    }
  };

  useEffect(() => { fetchBooks() }, []);

  const stats = [
    { label: 'Total books', value: books.length, accent: false },
    { label: 'Status', value: 'Active', accent: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-white/40 mt-1">Manage your book collection</p>
      </div>

      {/* Stat cards + action */}
      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, accent }) => (
          <div key={label} className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-5">
            <p className="text-xs text-gray-500 dark:text-white/40 mb-1">{label}</p>
            <p className={`text-2xl font-semibold ${accent ? 'text-emerald-500' : ''}`}>{value}</p>
          </div>
        ))}
        <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-5 flex flex-col justify-between">
          <p className="text-xs text-gray-500 dark:text-white/40 mb-3">Quick action</p>
          <AddBook refreshBooks={fetchBooks} />
        </div>
      </div>

      {/* Recent books */}
      {books.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-gray-500 dark:text-white/40 mb-3 uppercase tracking-wider">Recent books</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {books.slice(0, 5).map(book => (
              <a
                key={book.id}
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-colors"
              >
                <div className="relative w-full aspect-[3/4] bg-gray-50 dark:bg-white/5">
                  <Image
                    src={book.img}
                    alt={book.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 20vw"
                    unoptimized
                  />
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-medium truncate group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                    {book.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}