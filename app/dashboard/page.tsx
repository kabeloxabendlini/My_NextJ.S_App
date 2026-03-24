'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AddBook from '../components/AddBook';
import Image from 'next/image';

interface Book {
    id: string;
    title: string;
    link: string;
    img: string;
}

export default function DashboardPage() {
    const [books, setBooks] = useState<Book[]>([]);

    const fetchBooks = async () => {
        const res = await fetch('/api/books');
        const data = await res.json();
        setBooks(data);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-xl shadow">
                    <h2 className="text-lg">Total Books</h2>
                    <p className="text-2xl font-bold">{books.length}</p>
                </div>

                <div className="bg-gray-800 p-4 rounded-xl shadow">
                    <h2 className="text-lg">Quick Action</h2>

                    <div className="flex gap-2 items-center mt-2">
                        <AddBook refreshBooks={fetchBooks} />
                    </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-xl shadow">
                    <h2 className="text-lg">Status</h2>
                    <p className="text-green-400">Active</p>
                </div>
            </div>

            {/* Recent Books */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {books.slice(0, 5).map((book) => (
                    <a
                        key={book.id}
                        href={book.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 rounded-lg overflow-hidden hover:scale-105 transition transform"
                    >
                        <div className="relative w-full h-48">
                            <Image
                                src={book.img}
                                alt={book.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 20vw"
                            />
                        </div>

                        <div className="p-2">
                            <p className="text-sm font-semibold truncate">
                                {book.title}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}