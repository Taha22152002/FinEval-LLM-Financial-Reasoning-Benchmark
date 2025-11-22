#!/usr/bin/env python3
"""
Alternative entry point for Render (if auto-detection is used)
This file re-exports the app from wsgi.py
"""
from wsgi import app

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", "8000"))
    app.run(host="0.0.0.0", port=port)

