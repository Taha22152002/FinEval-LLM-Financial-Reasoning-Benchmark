"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Header.module.css";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isDashboardPage = pathname?.includes("/dashboards");

  const redirectHome = () => {
    router.push("/");
  };

  return (
    <header className="mb-8">
      <div className="flex justify-between items-start">
        <div>
          <h1
            className={`${styles.smooth} text-4xl font-extrabold text-gray-800 tracking-tight`}
            onClick={redirectHome}
          >
            FinEval
          </h1>
          <p className="font-normal text-xl">
            LLM evaluation for Financial Reasoning
          </p>
        </div>
        <nav className="flex space-x-4">
          {isDashboardPage ? (
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-600 bg-orange-100 hover:bg-orange-200 transition duration-150 ease-in-out"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Evaluator
            </Link>
          ) : (
            <Link
              href="/dashboards"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-600 bg-orange-100 hover:bg-orange-200 transition duration-150 ease-in-out"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Dashboards
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
