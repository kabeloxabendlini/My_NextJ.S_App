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

// Dummy books
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

      // Filter by query if provided
      const filtered = search
        ? combined.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()))
        : combined

      setBooks(filtered)
    } catch (err) {
      console.error("Fetch books error:", err)
      setBooks([...dummyBooks])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  useEffect(() => {
    const debounce = setTimeout(() => fetchBooks(query), 300)
    return () => clearTimeout(debounce)
  }, [query])

  const deleteBook = async (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id))
    try {
      await fetch(`/api/books/${id}`, { method: "DELETE" })
    } catch (err) {
      console.warn("Delete failed:", err)
    }
  }

  return (
    <div className="px-10 space-y-8">
      <div className="flex gap-3">
        <input
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered text-black flex-1"
        />
        <AddBook refreshBooks={() => fetchBooks(query)} />
      </div>

      {loading && <p className="text-white text-center mt-4">Loading...</p>}

      {!loading && books.length === 0 && (
        <p className="text-white text-center mt-4">No books found</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <AnimatePresence>
          {books.map((book) => (
            <motion.div
              key={book.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative border rounded-xl overflow-hidden bg-gray-800"
            >
              <div className="relative w-full aspect-[3/4]">
                <Image
                  src={book.img}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "contain" }}
                  loading="eager"  // <- this makes it load immediately
                  unoptimized // avoids Next.js image optimization errors
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/fallback.jpg"
                  }}
                />
              </div>
              <div className="p-3 space-y-2">
                <h2 className="font-semibold text-white">{book.title}</h2>
                <div className="flex gap-2">
                  <Link
                    href={book.link}
                    target="_blank"
                    className="btn btn-primary btn-sm flex-1"
                  >
                    Amazon
                  </Link>
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="btn btn-error btn-sm flex-1"
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