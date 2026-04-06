'use client';

import { useState } from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
}

const mockServices: Service[] = [
  { id: 1, title: 'Book recommendations', description: 'Personalised picks based on your reading taste.', price: 0 },
  { id: 2, title: 'Gift wrapping', description: 'Beautifully wrapped books, perfect for gifting.', price: 5 },
  { id: 3, title: 'Online orders', description: 'Order books online and get fast delivery.', price: 0 },
];

export default function ServicesPage() {
  const [booked, setBooked] = useState<number[]>([]);

  const handleBook = (id: number) => {
    if (booked.includes(id)) return;
    setBooked(prev => [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Services</h1>
        <p className="text-sm text-gray-500 dark:text-white/40 mt-1">What we offer</p>
      </div>

      <div className="space-y-3">
        {mockServices.map(service => {
          const isBooked = booked.includes(service.id);
          return (
            <div
              key={service.id}
              className="flex items-center justify-between gap-4 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{service.title}</p>
                  {service.price > 0 && (
                    <span className="text-xs bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 px-2 py-0.5 rounded-full">
                      ${service.price}
                    </span>
                  )}
                  {service.price === 0 && (
                    <span className="text-xs bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded-full">
                      Free
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-white/40 mt-0.5">{service.description}</p>
              </div>

              <button
                onClick={() => handleBook(service.id)}
                disabled={isBooked}
                className={`shrink-0 text-xs font-medium px-4 py-2 rounded-xl transition-colors ${
                  isBooked
                    ? 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-white/30 border border-black/10 dark:border-white/10 cursor-default'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {isBooked ? 'Booked' : 'Book'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}