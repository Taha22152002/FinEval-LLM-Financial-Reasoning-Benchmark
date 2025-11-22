'use client';

import { useState, useEffect, useRef } from 'react';

interface Task {
    id: string;
    name: string;
    context: string;
    question: string;
    refAnswer: string;
    refReasoning: string;
}

interface JudgeResult {
    modelName: string;
    answer: string;
    reasoning: string;
    overallScore: number;
    answerScore: number;
    reasoningScore: number;
    flag: string;
    rationale: string;
}

// Use API route proxy if available, otherwise direct backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export default function Evaluator() {
    const [tasks, setTasks] = useState<Record<string, Task>>({});
    const [selectedTaskKey, setSelectedTaskKey] = useState<string>('');
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [judgeResults, setJudgeResults] = useState<JudgeResult[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [showInitialMessage, setShowInitialMessage] = useState(true);
    
    const taskSelectorRef = useRef<HTMLSelectElement>(null);
    const taskContextRef = useRef<HTMLTextAreaElement>(null);
    const taskQuestionRef = useRef<HTMLTextAreaElement>(null);

    // Load tasks from dataset
    useEffect(() => {
        async function loadTasks() {
            try {
                // Try to load from API route first
                const response = await fetch('/api/dataset?file=easy.jsonl');
                if (!response.ok) {
                    // Fallback: try loading from public data folder
                    const fallbackResponse = await fetch('/data/fin_o1_easy.jsonl');
                    if (!fallbackResponse.ok) {
                        throw new Error('Failed to load dataset. Please ensure dataset files are available.');
                    }
                    const text = await fallbackResponse.text();
                    parseTasks(text);
                    return;
                }
                const text = await response.text();
                parseTasks(text);
            } catch (err) {
                console.error('Error loading tasks:', err);
                setError('Failed to load dataset. Please ensure the backend server is running and dataset files are accessible.');
            }
        }

        function parseTasks(text: string) {
            const lines = text.split('\n').filter(l => l.trim().length > 0);
            const tasksMap: Record<string, Task> = {};
            
            lines.forEach((line, idx) => {
                try {
                    const obj = JSON.parse(line);
                    const key = `test_${idx + 1}`;
                    const name = `Test ${idx + 1}`;
                    tasksMap[key] = {
                        id: String(idx + 1),
                        name,
                        context: String(obj.context || ''),
                        question: String(obj.question || ''),
                        refAnswer: String(obj.answer || obj.original_answer || ''),
                        refReasoning: String(obj.reasoning || obj.original_reasoning || ''),
                    };
                } catch (e) {
                    console.error('Error parsing task:', e);
                }
            });
            
            setTasks(tasksMap);
        }

        loadTasks();
    }, []);

    const handleTaskSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const key = e.target.value;
        setSelectedTaskKey(key);
        const task = tasks[key];
        setSelectedTask(task);
        setShowResults(false);
        setShowInitialMessage(true);
        setError('');
        
        if (taskContextRef.current) {
            taskContextRef.current.value = task?.context || '';
        }
        if (taskQuestionRef.current) {
            taskQuestionRef.current.value = task?.question || '';
        }
    };

    const extractPercentage = (s: string | null | undefined): number => {
        if (!s) return 0;
        const match = String(s).match(/([\d.]+)/);
        return match ? Number(match[1]) : 0;
    };

    const runEvaluation = async () => {
        if (!selectedTask) return;

        setIsLoading(true);
        setError('');
        setShowResults(false);
        setShowInitialMessage(false);

        try {
            // Run both models in parallel
            const [g3Response, fino1Response] = await Promise.all([
                fetch(`${API_BASE_URL}/gemini3`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        context: selectedTask.context,
                        question: selectedTask.question,
                    }),
                }),
                fetch(`${API_BASE_URL}/fino1`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        context: selectedTask.context,
                        question: selectedTask.question,
                    }),
                }),
            ]);

            if (!g3Response.ok) {
                throw new Error(`Gemini 3 API error: ${g3Response.status} ${g3Response.statusText}`);
            }
            if (!fino1Response.ok) {
                throw new Error(`Fin-o1 API error: ${fino1Response.status} ${fino1Response.statusText}`);
            }

            const g3 = await g3Response.json();
            const fino1 = await fino1Response.json();

            // Get judge evaluations for both models
            const [judgeG3Response, judgeFino1Response] = await Promise.all([
                fetch(`${API_BASE_URL}/judge`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        context: selectedTask.context,
                        question: selectedTask.question,
                        gt_answer: selectedTask.refAnswer,
                        gt_reasoning: selectedTask.refReasoning,
                        model_answer: g3.answer,
                        model_reasoning: g3.reasoning,
                    }),
                }),
                fetch(`${API_BASE_URL}/judge`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        context: selectedTask.context,
                        question: selectedTask.question,
                        gt_answer: selectedTask.refAnswer,
                        gt_reasoning: selectedTask.refReasoning,
                        model_answer: fino1.answer,
                        model_reasoning: fino1.reasoning,
                    }),
                }),
            ]);

            if (!judgeG3Response.ok) {
                throw new Error(`Judge API error for Gemini 3: ${judgeG3Response.status}`);
            }
            if (!judgeFino1Response.ok) {
                throw new Error(`Judge API error for Fin-o1: ${judgeFino1Response.status}`);
            }

            const judgeG3 = await judgeG3Response.json();
            const judgeFino1 = await judgeFino1Response.json();

            const results: JudgeResult[] = [
                {
                    modelName: 'Gemini 3',
                    answer: g3.answer || '',
                    reasoning: g3.reasoning || '',
                    overallScore: extractPercentage(judgeG3.overall),
                    answerScore: extractPercentage(judgeG3.answer),
                    reasoningScore: extractPercentage(judgeG3.reasoning),
                    flag: '',
                    rationale: judgeG3.verdict || '',
                },
                {
                    modelName: 'Fin-o1-14B',
                    answer: fino1.answer || '',
                    reasoning: fino1.reasoning || '',
                    overallScore: extractPercentage(judgeFino1.overall),
                    answerScore: extractPercentage(judgeFino1.answer),
                    reasoningScore: extractPercentage(judgeFino1.reasoning),
                    flag: '',
                    rationale: judgeFino1.verdict || '',
                },
            ];

            setJudgeResults(results);
            setShowResults(true);
        } catch (e) {
            console.error('Evaluation failed:', e);
            setError(e instanceof Error ? e.message : String(e));
        } finally {
            setIsLoading(false);
        }
    };

    const maxScore = judgeResults.length > 0 
        ? Math.max(...judgeResults.map(r => r.overallScore))
        : 0;

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-6">
                {/* LEFT PANEL: Task Selection & Input Control */}
                <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow-lg h-fit">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 2a10 10 0 0 0-9.25 10c0 5.5 4.5 10 10 10s10-4.5 10-10C22.25 4.5 17.75 2 12 2z"/>
                            <path d="M12 6v6l4 2"/>
                        </svg>
                        Select Evaluation Task
                    </h2>
                    <label htmlFor="task-selector" className="block text-sm font-medium text-gray-700 mb-2">
                        Evaluation Scenario
                    </label>
                    <select
                        id="task-selector"
                        ref={taskSelectorRef}
                        value={selectedTaskKey}
                        onChange={handleTaskSelect}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mb-4"
                    >
                        <option value="" disabled>
                            Search or Select Task ID / Scenario Name...
                        </option>
                        {Object.entries(tasks).map(([key, task]) => (
                            <option key={key} value={key}>
                                {task.name}: {task.question.slice(0, 60)}...
                            </option>
                        ))}
                    </select>

                    <button
                        id="evaluate-button"
                        onClick={runEvaluation}
                        disabled={!selectedTask || isLoading}
                        className="w-full py-3 px-4 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Run Evaluation
                    </button>

                    {/* Input Context */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Financial Context</h3>
                        <textarea
                            id="task-context"
                            ref={taskContextRef}
                            rows={6}
                            readOnly
                            className="w-full p-4 text-sm bg-gray-100 border border-gray-300 rounded-xl resize-none text-gray-700 leading-relaxed min-h-[180px] max-h-[280px] overflow-y-auto"
                            placeholder="Select a task to view its context..."
                        />
                    </div>

                    {/* Question */}
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Question</h3>
                        <textarea
                            id="task-question"
                            ref={taskQuestionRef}
                            rows={4}
                            readOnly
                            className="w-full p-4 text-sm bg-gray-100 border border-gray-300 rounded-xl resize-none text-gray-700 leading-relaxed min-h-[140px] max-h-[240px] overflow-y-auto"
                            placeholder="Select a task to view the question..."
                        />
                    </div>
                </div>

                {/* RIGHT PANEL: Evaluation Report */}
                <div className="lg:w-2/3 bg-white p-6 rounded-xl shadow-lg min-h-[500px]">
                    <h2 id="report-heading" className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2h6v6m-6-6-8 8m0 0v-4m0 4h4M9 14l-4 4m0 0v-4m0 4h4m4-10-8 8m8-8v4m-8 8v4m-4-4h-4m4 4h4m4-4h4"/>
                        </svg>
                        Evaluation Results • Judge Model (Gemini-2.5-PRO)
                    </h2>

                    {isLoading && (
                        <div className="text-center py-10">
                            <div className="animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-indigo-500 border-indigo-200"></div>
                            <p className="mt-3 text-indigo-600">Running Gemini 3 and Fin-o1-14B models...</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                            <p className="font-bold">Error during evaluation:</p>
                            <p>{error}</p>
                        </div>
                    )}

                    {showResults && judgeResults.length > 0 && selectedTask && (
                        <div>
                            {/* Score Card Summary */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                {judgeResults.map((result) => {
                                    const isHigh = result.overallScore === maxScore;
                                    const highClass = isHigh
                                        ? 'border-green-400 bg-green-50'
                                        : 'border-yellow-300 bg-yellow-50';
                                    const scoreColor = isHigh ? 'text-green-600' : 'text-yellow-600';
                                    const flagColor = result.flag.includes('Critical')
                                        ? 'text-red-500 font-semibold'
                                        : 'text-gray-500';

                                    return (
                                        <div
                                            key={result.modelName}
                                            className={`p-5 rounded-xl border-2 ${highClass} transition duration-300 hover:shadow-xl`}
                                        >
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                {result.modelName}
                                            </h3>
                                            <div className="flex justify-between items-center my-3">
                                                <span className="text-sm text-gray-600">Overall Score:</span>
                                                <div className={`text-4xl font-extrabold ${scoreColor}`}>
                                                    {result.overallScore}%
                                                </div>
                                            </div>
                                            <div className="text-sm font-medium mb-1">
                                                Answer Score:{' '}
                                                <span className="font-bold">{result.answerScore}%</span>
                                            </div>
                                            <div className="text-sm font-medium mb-3">
                                                Reasoning Score:{' '}
                                                <span className="font-bold">{result.reasoningScore}%</span>
                                            </div>
                                            {result.flag && (
                                                <p className={`text-sm ${flagColor} flex items-center`}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-4 h-4 mr-1"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                        />
                                                    </svg>
                                                    {result.flag}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Detailed Output & Judge Verdict */}
                            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                                Detailed Verdict Comparison
                            </h3>
                            <div className="w-full">
                                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                                    {/* Table Header */}
                                    <div className="grid grid-cols-[150px_1fr_1fr_1fr] divide-x divide-gray-200 bg-gray-100 font-bold text-sm uppercase tracking-wider text-gray-700">
                                        <div className="p-3"></div>
                                        {judgeResults.map((result) => (
                                            <div key={result.modelName} className="p-3 font-semibold text-lg text-indigo-700">
                                                {result.modelName}
                                            </div>
                                        ))}
                                        <div className="p-3 font-semibold text-lg text-green-700">Accurate Answer</div>
                                    </div>

                                    {/* Row 1: Final Answer */}
                                    <div className="grid grid-cols-[150px_1fr_1fr_1fr] divide-x divide-gray-200 border-t border-b border-gray-200 hover:bg-gray-50">
                                        <div className="p-3 font-medium text-gray-800">Answer</div>
                                        {judgeResults.map((result) => (
                                            <div key={result.modelName} className="p-3 text-sm font-mono text-gray-900">
                                                {result.answer}
                                            </div>
                                        ))}
                                        <div className="p-3 text-lg font-extrabold text-green-700">
                                            {selectedTask.refAnswer}
                                        </div>
                                    </div>

                                    {/* Row 2: Reasoning */}
                                    <div className="grid grid-cols-[150px_1fr_1fr_1fr] divide-x divide-gray-200 border-t border-b border-gray-200 hover:bg-gray-50">
                                        <div className="p-3 font-medium text-gray-800">Reasoning</div>
                                        {judgeResults.map((result) => (
                                            <div key={result.modelName} className="p-3 text-xs italic text-gray-600">
                                                {result.reasoning}
                                            </div>
                                        ))}
                                        <div className="p-3 text-xs text-green-600">{selectedTask.refReasoning}</div>
                                    </div>

                                    {/* Row 3: Judge Verdict (Scores & Rationale) */}
                                    <div className="grid grid-cols-[150px_1fr_1fr_1fr] divide-x divide-gray-200 border-t border-b border-gray-200 bg-white">
                                        <div className="p-3 font-medium text-gray-800">Judge Verdict</div>
                                        {judgeResults.map((result) => {
                                            const isHigh = result.overallScore === maxScore;
                                            const verdictBg = isHigh ? 'bg-green-50' : 'bg-yellow-50';
                                            const accuracyColor =
                                                result.answerScore < 85 ? 'text-red-600' : 'text-green-600';
                                            const consistencyColor =
                                                result.reasoningScore < 85 ? 'text-red-600' : 'text-green-600';

                                            return (
                                                <div
                                                    key={result.modelName}
                                                    className={`p-3 text-sm border-l-4 ${verdictBg} ${
                                                        isHigh ? 'border-green-500' : 'border-yellow-500'
                                                    }`}
                                                >
                                                    <p className="font-bold mb-1">
                                                        Overall Score:{' '}
                                                        <span className="text-base">{result.overallScore}%</span>
                                                    </p>
                                                    <div className="flex justify-between text-xs">
                                                        <span>Answer Score:</span>
                                                        <span className={`font-bold ${accuracyColor}`}>
                                                            {result.answerScore}%
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between text-xs mb-2">
                                                        <span>Reasoning Score:</span>
                                                        <span className={`font-bold ${consistencyColor}`}>
                                                            {result.reasoningScore}%
                                                        </span>
                                                    </div>
                                                    <p className="text-xs italic text-gray-700 mt-2">
                                                        {result.rationale}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                        <div className="p-3 text-sm text-gray-400 bg-gray-50">N/A (Reference)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {showInitialMessage && !isLoading && !error && (
                        <div className="text-center py-20 text-gray-500">
                            <p className="text-lg">
                                Select a task from the left panel and click "Run Evaluation" to see the results.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
