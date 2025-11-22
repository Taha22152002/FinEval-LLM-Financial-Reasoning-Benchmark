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


def run_gemini3(context: str, question: str, api_key: str | None = None, model_name: str = "gemini-3-pro-preview") -> dict:
    from google import genai
    from google.genai import types

    key = api_key or read_env_key()
    if not key:
        raise RuntimeError("Missing GEMINI_API_KEY. Set in .env or environment.")

    client = genai.Client(api_key=key)
    prompt = "\n".join([
        "Return exactly two lines.",
        "reasoning: <concise financial reasoning steps>",
        "answer: <final numeric or yes/no answer>",
        "Context:",
        str(context or ""),
        "Question:",
        str(question or ""),
    ])
    #cfg = types.GenerateContentConfig()
    r = client.models.generate_content(model=model_name, contents=prompt, 
                                       #config=cfg
                                       )
    text = getattr(r, "text", "") or ""
    rs = ""
    ans = ""
    for line in text.splitlines():
        if line.lower().startswith("reasoning:"):
            rs = line.split(":", 1)[1].strip()
        if line.lower().startswith("answer:"):
            ans = line.split(":", 1)[1].strip()
    return {"reasoning": rs, "answer": ans, "raw": text}


def load_test_item(path: str, index: int) -> tuple[str, str]:
    with open(path, "r", encoding="utf-8") as f:
        for i, line in enumerate(f):
            if not line.strip():
                continue
            if i == index:
                obj = json.loads(line)
                return str(obj.get("context", "")), str(obj.get("question", ""))
    raise IndexError("Index out of range for JSONL file")


def parse_args(argv: list[str]):
    p = argparse.ArgumentParser(description="Send dataset test item to Gemini and return reasoning and answer")
    p.add_argument("--context", default=None)
    p.add_argument("--question", default=None)
    p.add_argument("--from_jsonl", default=os.path.join("data", "financial-reasoning-datasets", "test.jsonl"))
    p.add_argument("--index", type=int, default=0)
    p.add_argument("--model", default="gemini-3-pro-preview")
    p.add_argument("--api_key", default=None)
    return p.parse_args(argv)


def main(argv: list[str] | None = None):
    args = parse_args(argv or sys.argv[1:])
    ok = ensure_google_genai()
    if not ok:
        sys.exit(1)
    ctx = args.context
    q = args.question
    if ctx is None or q is None:
        ctx, q = load_test_item(args.from_jsonl, args.index)
    res = run_gemini3(ctx, q, api_key=args.api_key, model_name=args.model)
    print(json.dumps(res, ensure_ascii=False))


if __name__ == "__main__":
    main()
