export interface JudgmentData {
  index: number;
  context: string;
  question: string;
  gt_answer: string;
  gt_reasoning: string;
  model_answer: string;
  model_reasoning: string;
  overall: string;
  answer: string;
  reasoning: string;
  verdict: string;
  formula?: string;
}

export function extractPercentage(scoreStr: string | null | undefined): number {
  if (!scoreStr) return 0;
  const match = String(scoreStr).match(/([\d.]+)/);
  return match ? Number(match[1]) : 0;
}

export async function loadJudgmentData(
  model: 'gemini3' | 'fin_o1',
  difficulty: 'easy' | 'medium' | 'hard'
): Promise<JudgmentData[]> {
  const fileName = `${model}_${difficulty}_judgement.jsonl`;
  const response = await fetch(`/${fileName}`);
  
  if (!response.ok) {
    throw new Error(`Failed to load ${fileName}`);
  }
  
  const text = await response.text();
  const lines = text.split('\n').filter((line) => line.trim().length > 0);
  
  return lines.map((line) => JSON.parse(line) as JudgmentData);
}

export function calculateStats(data: JudgmentData[]) {
  const scores = data.map((item) => extractPercentage(item.overall));
  const answerScores = data.map((item) => extractPercentage(item.answer));
  const reasoningScores = data.map((item) => extractPercentage(item.reasoning));
  
  const averageScore = scores.length > 0
    ? scores.reduce((sum, score) => sum + score, 0) / scores.length
    : 0;
  
  const averageAnswerScore = answerScores.length > 0
    ? answerScores.reduce((sum, score) => sum + score, 0) / answerScores.length
    : 0;
  
  const averageReasoningScore = reasoningScores.length > 0
    ? reasoningScores.reduce((sum, score) => sum + score, 0) / reasoningScores.length
    : 0;
  
  const correctCount = answerScores.filter((score) => score === 100).length;
  const accuracyRate = data.length > 0 ? (correctCount / data.length) * 100 : 0;
  
  return {
    totalQuestions: data.length,
    averageScore: Math.round(averageScore * 10) / 10,
    averageAnswerScore: Math.round(averageAnswerScore * 10) / 10,
    averageReasoningScore: Math.round(averageReasoningScore * 10) / 10,
    accuracyRate: Math.round(accuracyRate * 10) / 10,
    correctCount,
    incorrectCount: data.length - correctCount,
  };
}

