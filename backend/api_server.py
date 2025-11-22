import os
import sys
from typing import Optional

def ensure_fastapi() -> bool:
    try:
        import fastapi  # noqa: F401
        import uvicorn  # noqa: F401
        return True
    except Exception:
        try:
            import subprocess
            subprocess.check_call([sys.executable, "-m", "pip", "install", "--quiet", "fastapi", "uvicorn"])
            import fastapi  # noqa: F401
            import uvicorn  # noqa: F401
            return True
        except Exception:
            return False

def create_app():
    ok = ensure_fastapi()
    if not ok:
        raise RuntimeError("Failed to ensure fastapi/uvicorn")
    from fastapi import FastAPI, HTTPException
    from fastapi.responses import RedirectResponse
    from pydantic import BaseModel
    import backend.fin_o1 as fin_o1
    import backend.gemini_3_model as gemini_3_model
    import backend.judge as judge

    class FinO1Body(BaseModel):
        context: str
        question: str
        model: Optional[str] = None
        api_key: Optional[str] = None

    class Gemini3Body(BaseModel):
        context: str
        question: str
        model: Optional[str] = "gemini-3-pro-preview"
        api_key: Optional[str] = None

    class JudgeBody(BaseModel):
        context: str
        question: str
        gt_answer: str
        gt_reasoning: str
        model_answer: Optional[str] = None
        model_reasoning: Optional[str] = None
        use_gemini3: Optional[bool] = False
        api_key: Optional[str] = None
        model: Optional[str] = "gemini-2.5-pro"

    app = FastAPI()

    @app.get("/")
    def root():
        return RedirectResponse(url="/docs")

    @app.get("/health")
    def health():
        return {"ok": True}

    @app.post("/fin-o1")
    def fin_o1_endpoint(body: FinO1Body):
        try:
            fin_o1.ensure_requests()
            res = fin_o1.run_fino1(body.context, body.question, api_key=body.api_key, model_name=body.model)
            return res
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    @app.post("/gemini3")
    def gemini3_endpoint(body: Gemini3Body):
        try:
            gemini_3_model.ensure_google_genai()
            res = gemini_3_model.run_gemini3(body.context, body.question, api_key=body.api_key, model_name=body.model or "gemini-3-pro-preview")
            return res
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    @app.post("/judge")
    def judge_endpoint(body: JudgeBody):
        try:
            judge.ensure_google_genai()
            m_ans = body.model_answer
            m_rs = body.model_reasoning
            if body.use_gemini3 or not (m_ans and m_rs):
                gemini_3_model.ensure_google_genai()
                gen = gemini_3_model.run_gemini3(body.context, body.question, api_key=body.api_key)
                m_ans = gen.get("answer", "")
                m_rs = gen.get("reasoning", "")
            res = judge.run_judge(body.context, body.question, body.gt_answer, body.gt_reasoning, m_ans or "", m_rs or "", api_key=body.api_key, model_name=body.model or "gemini-2.5-pro")
            return res
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    return app

app = create_app()

if __name__ == "__main__":
    ok = ensure_fastapi()
    if not ok:
        raise SystemExit(1)
    import uvicorn
    port = int(os.environ.get("PORT", "8000"))
    uvicorn.run("backend.api_server:app", host="0.0.0.0", port=port, reload=False)
