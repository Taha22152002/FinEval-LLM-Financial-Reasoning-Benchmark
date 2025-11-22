#!/usr/bin/env python3
import os
import sys
import json

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
    r = client.models.generate_content(model=model_name, contents=prompt)
    text = getattr(r, "text", "") or ""
    reasoning, answer = "", ""
    for line in text.splitlines():
        if line.lower().startswith("reasoning:"):
            reasoning = line.split(":", 1)[1].strip()
        elif line.lower().startswith("answer:"):
            answer = line.split(":", 1)[1].strip()
    return {"reasoning": reasoning, "answer": answer, "raw": text}

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
    if not ensure_google_genai():
        sys.exit(1)

    api_key = read_env_key()
    input_path = os.path.join("financial-reasoning-datasets", "medium.jsonl")
    output_path = "gemini3_easy.jsonl"

    items = load_jsonl_items(input_path, n=200)

    with open(output_path, "w", encoding="utf-8") as out_f:
        for i, item in enumerate(items, 1):
            context = item.get("context", "")
            question = item.get("question", "")
            original_reasoning = item.get("reasoning", "")
            original_answer = item.get("answer", "")
            try:
                model_res = run_gemini3(context, question, api_key=api_key)
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
