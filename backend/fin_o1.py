#!/usr/bin/env python3
import os
import sys
import json
import argparse

RUNPOD_MODEL_URL = "https://0ejrwuhoivszz0-8000.proxy.runpod.net/v1/chat/completions"

def ensure_requests():
    try:
        import requests  # noqa: F401
        return True
    except ImportError:
        try:
            import subprocess
            subprocess.check_call([sys.executable, "-m", "pip", "install", "--quiet", "requests"])
            import requests  # noqa: F401
            return True
        except Exception as e:
            print(f"Failed to install requests: {e}")
            return False

def read_env_key():
    try:
        with open(".env", "r", encoding="utf-8") as f:
            for line in f:
                if line.strip().startswith("FINO1_API_KEY"):
                    parts = line.split("=", 1)
                    if len(parts) == 2:
                        return parts[1].strip()
    except Exception:
        pass
    return os.environ.get("FINO1_API_KEY", "")

def run_fino1(context: str, question: str, api_key: str | None = None, model_name: str | None = None) -> dict:
    import requests

    key = api_key or read_env_key()
    if not key:
        raise RuntimeError("Missing FINO1_API_KEY. Set in .env or environment.")

    prompt = "\n".join([
        "Return exactly two lines.",
        "reasoning: <concise financial reasoning steps>",
        "answer: <final numeric or yes/no answer>",
        "Context:",
        str(context or ""),
        "Question:",
        str(question or ""),
    ])

    headers = {
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": model_name or "TheFinAI/Fin-o1-14B",
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.1,
        "max_tokens": 2048
    }

    resp = requests.post(RUNPOD_MODEL_URL, headers=headers, json=payload)
    if resp.status_code != 200:
        raise RuntimeError(f"Fin-o1 API request failed: {resp.status_code} {resp.text}")

    text = resp.json()["choices"][0]["message"]["content"]

    rs, ans = "", ""
    
    # Try to extract from the expected format first
    for line in text.splitlines():
        line_lower = line.lower().strip()
        if line_lower.startswith("reasoning:"):
            rs = line.split(":", 1)[1].strip()
        elif line_lower.startswith("answer:"):
            ans = line.split(":", 1)[1].strip()
    
    # If the expected format wasn't found, try alternative parsing
    if not ans:
        lines = [line.strip() for line in text.splitlines() if line.strip()]
        
        # Look for standalone numbers or simple answers
        for i, line in enumerate(lines):
            # Look for standalone numbers
            if line.isdigit() or (line.replace('.', '').isdigit() and line.count('.') <= 1):
                ans = line
                # Use previous lines as reasoning if available
                if i > 0:
                    rs = " ".join(lines[max(0, i-2):i])
                break
            # Look for yes/no answers
            elif line.lower() in ['yes', 'no', 'true', 'false']:
                ans = line
                if i > 0:
                    rs = " ".join(lines[max(0, i-2):i])
                break
        
        # Look for "Final Response" or similar markers
        if not ans:
            for i, line in enumerate(lines):
                if any(marker in line.lower() for marker in ['final response', 'final answer', 'answer is']):
                    # Check next line for answer
                    if i + 1 < len(lines):
                        ans = lines[i + 1]
                        rs = " ".join(lines[max(0, i-2):i])
                        break
        
        # If still no answer found, use the last meaningful line
        if not ans:
            for line in reversed(lines):
                if (line and not line.startswith('#') and not line.startswith('<') and 
                    not line.startswith('!') and not line.lower().startswith('final')):
                    ans = line
                    break
    
    # Ensure we have some reasoning content
    if not rs and text:
        # Extract content between thinking tags
        if '<think>' in text and '</think>' in text:
            start = text.find('<think>') + 7
            end = text.find('</think>')
            if start > 7 and end > start:
                rs = text[start:end].strip()
        
        # If still no reasoning, use content before the final answer
        if not rs and ans:
            ans_pos = text.find(ans)
            if ans_pos > 0:
                rs = text[:ans_pos].strip()
                # Remove thinking tags if present
                rs = rs.replace('<think>', '').replace('</think>', '').strip()
        
        # Last resort: use first few meaningful lines
        if not rs:
            meaningful_lines = [line.strip() for line in text.splitlines()[:5] 
                              if line.strip() and not line.startswith('<')]
            rs = " ".join(meaningful_lines[:2]).strip()

    return {"reasoning": rs or "No reasoning provided", "answer": ans or "No answer found", "raw": text}

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
    p = argparse.ArgumentParser(description="Send dataset test item to Fin-o1-14B via Runpod and return reasoning and answer")
    p.add_argument("--context", default=None)
    p.add_argument("--question", default=None)
    p.add_argument("--from_jsonl", default=os.path.join("data", "financial-reasoning-datasets", "test.jsonl"))
    p.add_argument("--index", type=int, default=0)
    p.add_argument("--model", default=None)
    p.add_argument("--api_key", default=None)
    return p.parse_args(argv)

def main(argv: list[str] | None = None):
    args = parse_args(argv or sys.argv[1:])
    ok = ensure_requests()
    if not ok:
        sys.exit(1)
    ctx = args.context
    q = args.question
    if ctx is None or q is None:
        ctx, q = load_test_item(args.from_jsonl, args.index)
    res = run_fino1(ctx, q, api_key=args.api_key, model_name=args.model)
    print(json.dumps(res, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
