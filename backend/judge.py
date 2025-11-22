#!/usr/bin/env python3
import os
import sys
import json
import argparse


def ensure_google_genai():
    try:
        from google import genai  # noqa: F401
        from google.genai import types  # noqa: F401
        return True
    except Exception:
        try:
            import subprocess
            subprocess.check_call([sys.executable, "-m", "pip", "install", "--quiet", "google-genai>=0.3.0"])
            from google import genai  # noqa: F401
            from google.genai import types  # noqa: F401
            return True
        except Exception as e:
            print(f"Failed to install google-genai: {e}")
            return False


def read_env_key():
    try:
        with open(".env", "r", encoding="utf-8") as f:
            for line in f:
                if line.strip().startswith("GEMINI_API_KEY"):
                    parts = line.split("=", 1)
                    if len(parts) == 2:
                        return parts[1].strip()
    except Exception:
        pass
    return os.environ.get("GEMINI_API_KEY", "")


def load_test_item(path: str, index: int) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        for i, line in enumerate(f):
            if not line.strip():
                continue
            if i == index:
                obj = json.loads(line)
                return obj
    raise IndexError("Index out of range for JSONL file")


def run_judge(context: str, question: str, gt_answer: str, gt_reasoning: str, model_answer: str, model_reasoning: str, api_key: str | None = None, model_name: str = "gemini-2.5-pro") -> dict:
    from google import genai
    from google.genai import types

    key = api_key or read_env_key()
    if not key:
        raise RuntimeError("Missing GEMINI_API_KEY. Set in .env or environment.")

    client = genai.Client(api_key=key)
    prompt = "\n".join([
        "You are the Judge Model (Gemini-2.5-PRO). Compare the candidate model's answer and reasoning to the ground truth for the financial task.",
        "Return exactly these four lines:",
        "Overall Score: <percent>%",
        "Answer Score: <percent>%",
        "Reasoning Score: <percent>%",
        "Verdict: <concise rationale>",
        "Scoring: Overall = Answer*0.6 + Reasoning*0.4.",
        "Context:",
        str(context or ""),
        "Question:",
        str(question or ""),
        "Ground Truth Answer:",
        str(gt_answer or ""),
        "Ground Truth Reasoning:",
        str(gt_reasoning or ""),
        "Candidate Model Answer:",
        str(model_answer or ""),
        "Candidate Model Reasoning:",
        str(model_reasoning or ""),
    ])
    cfg = types.GenerateContentConfig()
    r = client.models.generate_content(model=model_name, contents=prompt, config=cfg)
    text = getattr(r, "text", "") or ""
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    result = {"overall": None, "answer": None, "reasoning": None, "verdict": "", "raw": text}
    for l in lines:
        if l.lower().startswith("overall score:"):
            result["overall"] = l.split(":", 1)[1].strip()
        elif l.lower().startswith("answer score:"):
            result["answer"] = l.split(":", 1)[1].strip()
        elif l.lower().startswith("reasoning score:"):
            result["reasoning"] = l.split(":", 1)[1].strip()
        elif l.lower().startswith("verdict:"):
            result["verdict"] = l.split(":", 1)[1].strip()
    return result


def parse_args(argv: list[str]):
    p = argparse.ArgumentParser(description="Judge a model's output against dataset using Gemini-2.5-PRO")
    p.add_argument("--from_jsonl", default=os.path.join("data", "financial-reasoning-datasets", "train.jsonl"))
    p.add_argument("--index", type=int, default=0)
    p.add_argument("--model_answer", default=None)
    p.add_argument("--model_reasoning", default=None)
    p.add_argument("--use_gemini3", action="store_true")
    p.add_argument("--api_key", default=None)
    p.add_argument("--model", default="gemini-2.5-pro")
    return p.parse_args(argv)


def main(argv: list[str] | None = None):
    args = parse_args(argv or sys.argv[1:])
    ok = ensure_google_genai()
    if not ok:
        sys.exit(1)
    item = load_test_item(args.from_jsonl, args.index)
    ctx = str(item.get("context", ""))
    q = str(item.get("question", ""))
    gt_answer = str(item.get("answer", ""))
    gt_reasoning = str(item.get("reasoning", ""))
    model_answer = args.model_answer
    model_reasoning = args.model_reasoning
    if args.use_gemini3 or not (model_answer and model_reasoning):
        try:
            from gemini_3_model import run_gemini3
            gen = run_gemini3(ctx, q, api_key=args.api_key)
            model_answer = gen.get("answer", "")
            model_reasoning = gen.get("reasoning", "")
        except Exception as e:
            print(f"Failed to get candidate outputs: {e}")
            sys.exit(1)
    res = run_judge(ctx, q, gt_answer, gt_reasoning, model_answer, model_reasoning, api_key=args.api_key, model_name=args.model)
    if res.get("overall") and res.get("answer") and res.get("reasoning"):
        print(f"Overall Score: {res['overall']}")
        print(f"Answer Score: {res['answer']}")
        print(f"Reasoning Score: {res['reasoning']}")
        print(f"Verdict: {res['verdict']}")
    else:
        print(res["raw"])


if __name__ == "__main__":
    main()

