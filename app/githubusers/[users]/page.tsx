import { use } from "react";
import Repos from "../../components/Repos";

type PageProps = {
  params: Promise<{ users: string }>;
};

export default function UserReposPage({ params }: PageProps) {
  const { users: username } = use(params);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {username}'s repositories
          </h1>
          <p className="text-sm text-gray-500 dark:text-white/40">
            Browse all public repositories. Click a repo name to view it on GitHub.
          </p>
        </div>

        {/* Repos */}
        <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6">
          <Repos user={username} cardMode={true} />
        </div>

        {/* Back link */}
        <div>
          <a
            href="/githubusers"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to GitHub Users
          </a>
        </div>
      </div>
    </div>
  );
}