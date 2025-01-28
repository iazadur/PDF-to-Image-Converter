import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const tempDir = path.join(publicDir, 'temp');

    // Check if temp directory exists
    if (!fs.existsSync(tempDir)) {
      return NextResponse.json({ message: 'No temp directory found' });
    }

    // Get all subdirectories in temp
    const subdirs = fs.readdirSync(tempDir);

    // Current time
    const now = Date.now();
    const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

    // Remove directories older than 1 hour
    for (const subdir of subdirs) {
      const subdirPath = path.join(tempDir, subdir);
      const stats = fs.statSync(subdirPath);

      if (now - stats.ctimeMs > ONE_HOUR) {
        fs.rmSync(subdirPath, { recursive: true, force: true });
      }
    }

    return NextResponse.json({ message: 'Cleanup completed' });
  } catch (error) {
    console.error('Error during cleanup:', error);
    return NextResponse.json(
      { error: 'Error during cleanup' },
      { status: 500 }
    );
  }
} 