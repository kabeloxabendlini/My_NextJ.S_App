'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Repo = {
  id: number;
  name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
};

type ReposProps = {
  user: string;
  cardMode?: boolean;
};

export default function Repos({ user, cardMode = false }: ReposProps) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.github.com/users/${user}/repos`, {
          next: { revalidate: 60 },
        });
        if (!res.ok) throw new Error('Failed to fetch repositories');
        const data: Repo[] = await res.json();
        setRepos(data);
      } catch (err) {
        console.error(err);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [user]);

  if (loading) return (
    <p className="text-center text-sm text-gray-500 dark:text-white/40 py-8">Loading repositories...</p>
  );
  if (repos.length === 0) return (
    <p className="text-center text-sm text-gray-500 dark:text-white/40 py-8">No repositories found</p>
  );

  if (cardMode) {
    return (
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {repos.map(repo => (
          <div
            key={repo.id}
            className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-5 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={repo.owner.avatar_url}
                alt={repo.owner.login}
                width={32}
                height={32}
                className="rounded-full border border-black/10 dark:border-white/10"
                unoptimized
              />
              <Link
                href={repo.owner.html_url}
                target="_blank"
                className="text-sm font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {repo.owner.login}
              </Link>
            </div>
            <Link
              href={`https://github.com/${repo.owner.login}/${repo.name}`}
              target="_blank"
              className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline block mb-2"
            >
              {repo.name}
            </Link>
            <p className="text-xs text-gray-500 dark:text-white/40 leading-relaxed">
              {repo.description || 'No description available'}
            </p>
          </div>
        ))}
      </div>
    );
  }

  // Table mode
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{user}'s repositories</h2>
      <div className="overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-white/5 border-b border-black/10 dark:border-white/10 text-left">
              <th className="py-3 px-4 font-medium text-gray-500 dark:text-white/40 text-xs uppercase tracking-wider">Owner</th>
              <th className="py-3 px-4 font-medium text-gray-500 dark:text-white/40 text-xs uppercase tracking-wider">Repository</th>
              <th className="py-3 px-4 font-medium text-gray-500 dark:text-white/40 text-xs uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {repos.map(repo => (
              <tr
                key={repo.id}
                className="bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <td className="py-4 px-4 align-top">
                  <div className="flex items-center gap-3">
                    <Image
                      src={repo.owner.avatar_url}
                      alt={repo.owner.login}
                      width={32}
                      height={32}
                      className="rounded-full border border-black/10 dark:border-white/10"
                      unoptimized
                    />
                    <Link
                      href={repo.owner.html_url}
                      target="_blank"
                      className="text-sm font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {repo.owner.login}
                    </Link>
                  </div>
                </td>
                <td className="py-4 px-4 align-top">
                  <Link
                    href={`https://github.com/${repo.owner.login}/${repo.name}`}
                    target="_blank"
                    className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    {repo.name}
                  </Link>
                </td>
                <td className="py-4 px-4 align-top max-w-md">
                  <p className="text-sm text-gray-500 dark:text-white/40">
                    {repo.description || 'No description available'}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}