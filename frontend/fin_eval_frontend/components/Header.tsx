import React from "react";

const Header = () => {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
        FinEval: LLM evaluation for Financial Reasoning
      </h1>
      <p className="text-gray-500 mt-1">
        Judge Model (Gemini-2.5-PRO) evaluates accuracy and reasoning quality.
      </p>
    </header>
  );
};

export default Header;
