'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import AddBook from "./AddBook"
import { motion, AnimatePresence } from "framer-motion"

type Book = {
  id: string
  title: string
  img: string
  link: string
}

const dummyBooks: Book[] = [
  {
    id: "1",
    title: "MERN Stack",
    link: "https://www.amazon.com/Beginning-MERN-Stack-MongoDB-Express/dp/B0979MGJ5J",
    img: "https://m.media-amazon.com/images/I/41y8qC9RT0S._SX404_BO1,204,203,200_.jpg",
  },
  {
    id: "2",
    title: "Beginning GraphQL",
    link: "https://www.amazon.com/Beginning-GraphQL-React-NodeJS-Apollo/dp/B0BXMRB5VF/",
    img: "https://m.media-amazon.com/images/I/41+PG6uPdHL._SX404_BO1,204,203,200_.jpg",
  },
  {
    id: "3",
    title: "Beginning React Hooks",
    link: "https://www.amazon.com/Beginning-React-Hooks-Greg-Lim/dp/B0892HRT3C/",
    img: "https://m.media-amazon.com/images/I/41e9U1d9QIL._SX404_BO1,204,203,200_.jpg",
  },
]

export default function Books() {
  const [books, setBooks] = useState<Book[]>([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchBooks = async (search = "") => {
    setLoading(true)
    try {
      const res = await fetch(`/api/books?query=${search}`)
      const data = await res.json()
      const combined: Book[] = Array.isArray(data) ? [...data, ...dummyBooks] : [...dummyBooks]
      const filtered = search
        ? combined.filter(b => b.title.toLowerCase().includes(search.toLowerCase()))
        : combined
      setBooks(filtered)
    } catch {
      setBooks([...dummyBooks])
    }
    setLoading(false)
  }

  useEffect(() => { fetchBooks() }, [])

  useEffect(() => {
    const debounce = setTimeout(() => fetchBooks(query), 300)
    return () => clearTimeout(debounce)
  }, [query])

  const deleteBook = async (id: string) => {
    setBooks(prev => prev.filter(b => b.id !== id))
    try {
      await fetch(`/api/books/${id}`, { method: "DELETE" })
    } catch (err) {
      console.warn("Delete failed:", err)
    }
  }

  return (
    <div className="px-6 space-y-6">
      {/* Search + Add */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            placeholder="Search books..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
        <AddBook refreshBooks={() => fetchBooks(query)} />
      </div>

      {/* States */}
      {loading && (
        <p className="text-sm text-gray-500 dark:text-white/40 text-center py-8">Loading...</p>
      )}
      {!loading && books.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-white/40 text-center py-8">No books found</p>
      )}

      {/* Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <AnimatePresence>
          {books.map(book => (
            <motion.div
              key={book.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Cover */}
              <div className="relative w-full aspect-[3/4] bg-gray-50 dark:bg-white/5">
                <Image
                  src={book.img}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "contain" }}
                  loading="eager"
                  unoptimized
                  onError={e => { (e.target as HTMLImageElement).src = "/fallback.jpg" }}
                />
              </div>

              {/* Body */}
              <div className="p-3 space-y-2.5">
                <h2 className="text-sm font-medium text-gray-900 dark:text-white truncate">{book.title}</h2>
                <div className="flex gap-2">
                  <Link
                    href={book.link}
                    target="_blank"
                    className="flex-1 text-center text-xs font-medium bg-amber-500 hover:bg-amber-400 text-amber-950 py-2 rounded-lg transition-colors"
                  >
                    Amazon
                  </Link>
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="flex-1 text-xs font-medium bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 py-2 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}