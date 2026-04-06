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
      setError("All fields are required")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, img, link }),
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
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
      >
        + Add book
      </button>

      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
            />

            {/* Modal */}
            <motion.div
              key="modal"
              className="fixed inset-0 z-50 flex justify-center items-center p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <form
                onSubmit={submit}
                className="bg-white dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl w-full max-w-sm p-6 relative shadow-xl"
                onClick={e => e.stopPropagation()}
              >
                {/* Close */}
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-white/50 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors text-xs"
                >
                  ✕
                </button>

                <h2 className="text-base font-medium text-gray-900 dark:text-white mb-5">Add book</h2>

                {error && (
                  <p className="text-xs text-red-500 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg px-3 py-2 mb-4">
                    {error}
                  </p>
                )}

                {/* Image preview */}
                <AnimatePresence>
                  {img && (
                    <motion.div
                      key="preview"
                      className="relative w-full aspect-[3/4] mb-4 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-white/5"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image
                        src={img}
                        alt="preview"
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Inputs */}
                {[
                  { value: title, setter: setTitle, placeholder: "Title" },
                  { value: img, setter: setImg, placeholder: "Image URL" },
                  { value: link, setter: setLink, placeholder: "Amazon link" },
                ].map(({ value, setter, placeholder }) => (
                  <input
                    key={placeholder}
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={e => setter(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 mb-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                ))}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium text-sm py-2.5 rounded-xl transition-colors mt-1"
                >
                  {loading ? "Adding..." : "Add book"}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}