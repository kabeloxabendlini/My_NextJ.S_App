import Link from "next/link";
import Image from "next/image";

type GitHubUser = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

async function fetchGitHubUsers(): Promise<GitHubUser[]> {
  const res = await fetch("https://api.github.com/search/users?q=greg", {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch GitHub users");
  const json = await res.json();
  return json.items;
}

export default async function GitHubUsersPage() {
  const users = await fetchGitHubUsers();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">GitHub Users</h1>
          <p className="text-sm text-gray-500 dark:text-white/40">
            Search results for <span className="font-medium text-gray-700 dark:text-white/60">"greg"</span>
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map(user => (
            <div
              key={user.id}
              className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-5 flex flex-col items-center text-center hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-colors"
            >
              <Image
                src={user.avatar_url}
                alt={user.login}
                width={72}
                height={72}
                className="rounded-full border border-black/10 dark:border-white/10 mb-3"
                unoptimized
              />
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-0.5">{user.login}</p>
              <p className="text-xs text-gray-400 dark:text-white/30 mb-4">ID: {user.id}</p>

              <div className="flex gap-2 w-full">
                <Link
                  href={user.html_url}
                  target="_blank"
                  className="flex-1 text-xs font-medium text-center bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-white/70 border border-black/10 dark:border-white/10 py-2 rounded-xl transition-colors"
                >
                  Profile
                </Link>
                <Link
                  href={`/githubusers/${user.login}`}
                  className="flex-1 text-xs font-medium text-center bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-xl transition-colors"
                >
                  Repos
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}