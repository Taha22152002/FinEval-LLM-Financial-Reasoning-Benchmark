#!/usr/bin/env python3
import os
import sys
import json
import argparse

def read_env_key() -> str:
    try:
        with open(os.path.join(os.getcwd(), ".env"), "r", encoding="utf-8") as f:
            for line in f:
                s = line.strip()
                if s.startswith("GEMINI_API_KEY"):
                    parts = s.split("=", 1)
                    if len(parts) == 2:
                        return parts[1].strip()
    except Exception:
        pass
    return os.environ.get("GEMINI_API_KEY", "")

def parse_args(argv: list[str]):
    p = argparse.ArgumentParser(description="Run judge over a JSONL file of Fin-o1 results")
    p.add_argument("--path", default="FinEval-LLM-Financial-Reasoning-Benchmark/Fin_o1/Benchmark_Result/fin_o1_medium.jsonl")
    p.add_argument("--api_key", default=None)
    p.add_argument("--model", default="gemini-2.5-pro")
    p.add_argument("--out", default="FinEval-LLM-Financial-Reasoning-Benchmark/Fin_o1/Judgement_Result/fin_o1_medium_judgement.jsonl")
    return p.parse_args(argv)

def main(argv: list[str] | None = None) -> None:
    args = parse_args(argv or sys.argv[1:])
    import judge
    ok = judge.ensure_google_genai()
    if not ok:
        sys.exit(1)
    api_key = args.api_key or read_env_key()
    if not api_key:
        print("Missing GEMINI_API_KEY in .env or environment", file=sys.stderr)
        sys.exit(2)
    if not os.path.isfile(args.path):
        print(f"File not found: {args.path}", file=sys.stderr)
        sys.exit(3)
    with open(args.path, "r", encoding="utf-8") as f, open(args.out, "w", encoding="utf-8") as out_f:
        for idx, line in enumerate(f):
            s = line.strip()
            if not s:
                continue
            try:
                obj = json.loads(s)
            except Exception as e:
                print(f"Line {idx} JSON parse error: {e}", file=sys.stderr)
                continue
            context = str(obj.get("context", ""))
            question = str(obj.get("question", ""))
            gt_reasoning = str(obj.get("original_reasoning", ""))
            gt_answer = str(obj.get("original_answer", ""))
            mr = obj.get("model_response") or {}
            model_reasoning = str(mr.get("reasoning", ""))
            model_answer = str(mr.get("answer", ""))
            res = judge.run_judge(context, question, gt_answer, gt_reasoning, model_answer, model_reasoning, api_key=api_key, model_name=args.model)
            overall = str(res.get("overall", "")).strip()
            answer = str(res.get("answer", "")).strip()
            reasoning = str(res.get("reasoning", "")).strip()
            verdict = str(res.get("verdict", "")).strip()
            def fmt_pct(x: str) -> str:
                x = x or ""
                return x if x.endswith("%") else (x + "%" if x else x)
            print(f"Overall Score: {fmt_pct(overall)}")
            print(f"Answer Score: {fmt_pct(answer)}")
            print(f"Reasoning Score: {fmt_pct(reasoning)}")
            print(f"Verdict: {verdict}")
            print("Scoring: Overall = Answer*0.6 + Reasoning*0.4.")
            print()
            record = {
                "index": idx,
                "context": context,
                "question": question,
                "gt_answer": gt_answer,
                "gt_reasoning": gt_reasoning,
                "model_answer": model_answer,
                "model_reasoning": model_reasoning,
                "overall": fmt_pct(overall),
                "answer": fmt_pct(answer),
                "reasoning": fmt_pct(reasoning),
                "verdict": verdict,
                "formula": "Overall = Answer*0.6 + Reasoning*0.4.",
            }
            out_f.write(json.dumps(record, ensure_ascii=False) + "\n")

if __name__ == "__main__":
    main()
