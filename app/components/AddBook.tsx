'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

type Props = {
  refreshBooks: () => void
}

export default function AddBook({ refreshBooks }: Props) {
  const [modalOpen, setModalOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [img, setImg] = useState("")
  const [link, setLink] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (modalOpen) {
      setTitle("")
      setImg("")
      setLink("")
      setError("")
    }
  }, [modalOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !img || !link) {
      setError("All fields required")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, img, link })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to add book")

      refreshBooks()
      setModalOpen(false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        className="btn btn-accent"
        onClick={() => setModalOpen(true)}
      >
        Add Book
      </button>

      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black bg-opacity-60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.form
              key="modal"
              onSubmit={submit}
              className="fixed inset-0 z-50 flex justify-center items-start overflow-y-auto p-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
                <button
                  type="button"
                  className="absolute right-2 top-2 btn btn-sm"
                  onClick={() => setModalOpen(false)}
                >
                  ✕
                </button>

                <h2 className="text-white text-lg mb-4 font-bold">Add Book</h2>

                {error && <p className="text-red-500 mb-3">{error}</p>}

                {/* Animated Image Preview */}
                <AnimatePresence>
                  {img && (
                    <motion.div
                      key="preview"
                      className="relative w-full aspect-[3/4] mb-4 border rounded"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Image
                        src={img}
                        alt="preview"
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 100vw, 33vw" // <-- Add this
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <input
                  type="text"
                  placeholder="Title"
                  className="input input-bordered w-full mb-2 text-black"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  className="input input-bordered w-full mb-2 text-black"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Amazon Link"
                  className="input input-bordered w-full mb-4 text-black"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />

                <button
                  className="btn btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Book"}
                </button>
              </div>
            </motion.form>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}