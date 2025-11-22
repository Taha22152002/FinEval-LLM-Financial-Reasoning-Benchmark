#!/usr/bin/env python3
import os
import sys
import json

RUNPOD_MODEL_URL = "https://0ejrwuhoivszz0-8000.proxy.runpod.net/v1/chat/completions"

def ensure_requests():
    try:
        import requests  # noqa: F401
        return True
    except Exception:
        try:
            import subprocess
            subprocess.check_call([sys.executable, "-m", "pip", "install", "--quiet", "requests>=2.0.0"])
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
    "You are a financial reasoning AI. Answer the question based on the context.",
    "Provide your response in exactly two lines:",
    "Reasoning: <concise financial reasoning steps>",
    "Answer: <final numeric or yes/no answer>",
    "",
    "Context:",
    str(context or ""),
    "",
    "Question:",
    str(question or "")
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
        "max_tokens": 1024
    }
    resp = requests.post(RUNPOD_MODEL_URL, headers=headers, json=payload)
    if resp.status_code != 200:
        raise RuntimeError(f"Fin-o1 API request failed: {resp.status_code} {resp.text}")
    text = resp.json()["choices"][0]["message"]["content"]
    rs, ans = "", ""
    for line in text.splitlines():
        if line.lower().startswith("reasoning:"):
            rs = line.split(":", 1)[1].strip()
        if line.lower().startswith("answer:"):
            ans = line.split(":", 1)[1].strip()
    return {"reasoning": rs, "answer": ans, "raw": text}

def load_jsonl_items(path: str, n: int = 200):
    items = []
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            if not line.strip():
                continue
            obj = json.loads(line)
            items.append(obj)
            if len(items) >= n:
                break
    return items

def main():
    if not ensure_requests():
        sys.exit(1)
    api_key = read_env_key()
    input_path = os.path.join("financial-reasoning-datasets", "easy.jsonl")
    output_path = "fin_o1_easy.jsonl"
    items = load_jsonl_items(input_path, n=200)
    with open(output_path, "w", encoding="utf-8") as out_f:
        for i, item in enumerate(items, 1):
            context = item.get("context", "")
            question = item.get("question", "")
            original_reasoning = item.get("reasoning", "")
            original_answer = item.get("answer", "")
            try:
                model_res = run_fino1(context, question, api_key=api_key)
                row = {
                    "context": context,
                    "question": question,
                    "original_reasoning": original_reasoning,
                    "original_answer": original_answer,
                    "model_response": {
                        "reasoning": model_res["reasoning"],
                        "answer": model_res["answer"]
                    }
                }
                out_f.write(json.dumps(row, ensure_ascii=False) + "\n")
                print(f"Processed item {i}")
            except Exception as e:
                print(f"Item {i} failed: {e}")
    print(f"Responses saved to {output_path}")

if __name__ == "__main__":
    main()

