export default function Evaluator() {
    return (
    <>
        <div className="flex flex-col lg:flex-row gap-6">
            {/* <!-- LEFT PANEL: Task Selection & Input Control --> */}
            <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow-lg h-fit">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0-9.25 10c0 5.5 4.5 10 10 10s10-4.5 10-10C22.25 4.5 17.75 2 12 2z"/><path d="M12 6v6l4 2"/></svg>
                    Select Evaluation Task
                </h2>
                <label htmlFor="task-selector" className="block text-sm font-medium text-gray-700 mb-2">Evaluation Scenario</label>
                <select id="task-selector" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mb-4">
                    <option value="" disabled>Search or Select Task ID / Scenario Name...</option>
                    <option value="task_revenue_forecast">Task 001: Q4 Revenue Forecast</option>
                    <option value="task_debt_equity">Task 002: Debt-to-Equity Calculation</option>
                </select>
            
                <button id="evaluate-button" className="w-full py-3 px-4 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition duration-150 disabled:opacity-50">
                    Run Evaluation
                </button>
                {/* <!-- Input Context --> */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Financial Context</h3>
                    <textarea id="task-context" rows={6} readOnly className="w-full p-4 text-sm bg-gray-100 border border-gray-300 rounded-xl resize-none text-gray-700 leading-relaxed min-h-[180px] max-h-[280px] overflow-y-auto" placeholder="Select a task to view its context..."></textarea>
                </div>
            
                {/* <!-- Question --> */}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Question</h3>
                    <textarea id="task-question" rows={4} readOnly className="w-full p-4 text-sm bg-gray-100 border border-gray-300 rounded-xl resize-none text-gray-700 leading-relaxed min-h-[140px] max-h-[240px] overflow-y-auto" placeholder="Select a task to view the question..."></textarea>
                </div>
                {/* <!-- Ground Truth section removed as requested --> */}
            </div>
            {/* <!-- RIGHT PANEL: Evaluation Report --> */}
            <div className="lg:w-2/3 bg-white p-6 rounded-xl shadow-lg min-h-[500px]">
                <h2 id="report-heading" className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    Evaluation Results • Judge Model (Gemini-2.5-PRO)
                </h2>
            
                <div id="loading-spinner" className="hidden text-center py-10">
                    <div className="animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-indigo-500 border-indigo-200"></div>
                    <p className="mt-3 text-indigo-600">Running Gemini 3 and Fin-o1-14B models...</p>
                </div>
                <div id="error-message" className="hidden bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                    <p className="font-bold">Error during evaluation:</p>
                    <p id="error-text"></p>
                </div>
                <div id="results-content" className="hidden">
                    {/* Score Card Summary */}
                    <div id="score-card-summary" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/*Cards will be injected here */}
                    </div>
                    {/* Detailed Output & Judge Verdict */}
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Detailed Verdict Comparison</h3>
                    <div id="detail-comparison" className="w-full">
                       {/* The 3-column comparison table will be injected here */}
                    </div>
                </div>
            
                <div id="initial-message" className="text-center py-20 text-gray-500">
                    <p className="text-lg">Select a task from the left panel and click "Run Evaluation" to see the results.</p>
                </div>
            </div>
        </div>
    </>
  );
}
