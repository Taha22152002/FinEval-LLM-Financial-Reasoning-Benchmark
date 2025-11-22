import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const file = searchParams.get('file') || 'easy.jsonl';
  
  // Validate file name to prevent path traversal
  if (!file.match(/^[a-z_]+\.jsonl$/)) {
    return NextResponse.json({ error: 'Invalid file name' }, { status: 400 });
  }

  try {
    // Try to read from the data folder in the project root
    const dataPath = path.join(process.cwd(), '..', '..', 'financial-reasoning-datasets', file);
    
    // Fallback to frontend data folder
    let filePath = dataPath;
    if (!fs.existsSync(filePath)) {
      filePath = path.join(process.cwd(), 'data', file);
    }
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Dataset file not found' }, { status: 404 });
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

