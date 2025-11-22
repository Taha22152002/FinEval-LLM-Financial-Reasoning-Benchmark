import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const file = searchParams.get('file') || 'easy.jsonl';
  
  // Validate file name to prevent path traversal
  // Allow judgment files: gemini3_easy_judgement.jsonl, fin_o1_medium_judgement.jsonl, etc.
  if (!file.match(/^[a-z0-9_]+\.jsonl$/)) {
    return NextResponse.json({ error: 'Invalid file name' }, { status: 400 });
  }

  try {
    // Try to read from public folder first (for Vercel deployment)
    const publicPath = path.join(process.cwd(), 'public', file);
    
    // Fallback: try with _judgement suffix if not found
    let filePath = publicPath;
    if (!fs.existsSync(filePath) && !file.includes('_judgement')) {
      const judgementFile = file.replace('.jsonl', '_judgement.jsonl');
      filePath = path.join(process.cwd(), 'public', judgementFile);
    }
    
    // Fallback to financial-reasoning-datasets folder (for local dev)
    if (!fs.existsSync(filePath)) {
      filePath = path.join(process.cwd(), '..', '..', 'financial-reasoning-datasets', file);
    }
    
    // Another fallback to data folder
    if (!fs.existsSync(filePath)) {
      filePath = path.join(process.cwd(), 'data', file);
    }
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: `Dataset file not found: ${file}` }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': 'application/jsonl',
      },
    });
  } catch (error) {
    console.error('Error reading dataset:', error);
    return NextResponse.json({ error: 'Failed to read dataset' }, { status: 500 });
  }
}

