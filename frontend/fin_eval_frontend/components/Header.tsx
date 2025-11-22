"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Header.module.css";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isDashboardPage = pathname?.includes("/dashboards");
  const isEvaluatorPage = pathname?.includes("/evaluator");

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
            <>
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
            </>
          ) : (
            <>
              {!isEvaluatorPage && (
                <Link
                  href="/evaluator"
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
                      d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Evaluator
                </Link>
              )}
            </>
          )}
          {isEvaluatorPage && (
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-600 bg-orange-100 hover:bg-orange-200 transition duration-150 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M3 9.5l9-7 9 7" />
                <path d="M5 10v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10" />
              </svg>
              &nbsp;Return to home page
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
