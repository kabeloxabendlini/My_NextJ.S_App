import { use } from "react";
import Repos from "../../components/Repos";

type PageProps = {
  params: Promise<{ users: string }>;
};

export default function UserReposPage({ params }: PageProps) {
  const { users: username } = use(params); // unwrap Promise

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-10">
      {/* Page heading */}
      <h1 className="text-4xl font-bold text-center text-black dark:text-white">
        {username}'s GitHub Repositories
      </h1>

      {/* Description */}
      <p className="text-center text-lg text-gray-700 dark:text-gray-400">
        Browse all public repositories for <span className="font-semibold">{username}</span>. 
        Click on a repo name to view it on GitHub.
      </p>

      {/* Repos container */}
      <div className="col-span-full bg-base-100 dark:bg-gray-900 shadow-xl rounded-xl p-6 overflow-x-auto">
        <Repos user={username} cardMode={true} />
      </div>

      {/* Navigation back */}
      <div className="text-center">
        <a
          href="/githubusers"
          className="btn btn-outline btn-primary dark:text-gray-100 dark:border-gray-400 dark:hover:bg-gray-700"
        >
          ← Back to GitHub Users
        </a>
      </div>
    </div>
  );
}