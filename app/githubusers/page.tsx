// /app/githubusers/page.tsx
import Link from "next/link";
import Image from "next/image";

type GitHubUser = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

// Fetch GitHub users
async function fetchGitHubUsers(): Promise<GitHubUser[]> {
  const res = await fetch("https://api.github.com/search/users?q=greg", { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch GitHub users");
  const json = await res.json();
  return json.items;
}

export default async function GitHubUsersPage() {
  const users = await fetchGitHubUsers();

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-10">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100">
        GitHub Users
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {users.map(user => (
          <div
            key={user.id}
            className="bg-white dark:bg-gray-900 shadow-xl rounded-xl p-6 flex flex-col items-center transition-transform hover:scale-105"
          >
            <Image
              src={user.avatar_url}
              alt={user.login}
              width={100}
              height={100}
              className="rounded-full border-2 border-gray-300 dark:border-gray-600 mb-4"
              unoptimized
            />
            <div className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">{user.login}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">ID: {user.id}</div>

            <div className="flex gap-2">
              <Link
                href={user.html_url}
                target="_blank"
                className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Profile
              </Link>
              <Link
                href={`/githubusers/${user.login}`}
                className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Repos
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}