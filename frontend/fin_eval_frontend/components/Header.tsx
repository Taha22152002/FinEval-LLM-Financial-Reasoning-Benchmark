import styles from "./Header.module.css"

const Header = () => {
  return (
    <header className="mb-8">
      <h1 className={`${styles.smooth} text-4xl font-extrabold text-gray-800 tracking-tight`}>
        FinEval
      </h1>
      <p className="font-normal text-xl">LLM evaluation for Financial Reasoning</p>
      {/* <p className="text-gray-500 mt-1">
        Judge Model (Gemini-2.5-PRO) evaluates accuracy and reasoning quality.
      </p> */}
    </header>
  );
};

export default Header;
