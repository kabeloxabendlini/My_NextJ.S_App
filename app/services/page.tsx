'use client';

import { useState } from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
}

const mockServices: Service[] = [
  { id: 1, title: 'Book Recommendations', description: 'Personalized book recommendations based on your taste.', price: 0 },
  { id: 2, title: 'Gift Wrapping', description: 'We wrap your books beautifully for gifts.', price: 5 },
  { id: 3, title: 'Online Orders', description: 'Order books online and get fast delivery.', price: 0 },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [bookedServices, setBookedServices] = useState<number[]>([]);

  const handleBookService = (id: number) => {
    if (bookedServices.includes(id)) return;
    setBookedServices([...bookedServices, id]);
    alert(`You booked: ${services.find(s => s.id === id)?.title}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Our Services</h1>
      <ul className="space-y-4">
        {services.map(service => (
          <li key={service.id} className="border rounded-md p-4 hover:shadow-lg transition">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{service.title}</h2>
              {service.price > 0 && (
                <span className="text-gray-400 font-medium">${service.price}</span>
              )}
            </div>
            <p className="text-gray-200 mt-2">{service.description}</p>
            <button
              onClick={() => handleBookService(service.id)}
              disabled={bookedServices.includes(service.id)}
              className={`mt-3 px-4 py-2 rounded ${
                bookedServices.includes(service.id)
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition`}
            >
              {bookedServices.includes(service.id) ? 'Booked' : 'Book Service'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}