/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextRequest, NextResponse } from 'next/server';
import { fromPath } from 'pdf2pic';
import path from 'path';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

const generateUniqueId = () => {
  return Date.now().toString() + Math.random().toString(36).substring(2);
};

export async function POST(request: NextRequest) {
  const uniqueId = generateUniqueId();
  const tempFilePath = path.join(process.cwd(), `temp_${uniqueId}.pdf`);

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Get the buffer from the uploaded file
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(buffer);
    const pageCount = pdfDoc.getPageCount();
    
    // Write the buffer to a temporary file
    fs.writeFileSync(tempFilePath, buffer);

    // Create unique directory for this conversion
    const publicDir = path.join(process.cwd(), 'public');
    const tempDir = path.join(publicDir, 'temp', uniqueId);
    
    // Ensure temp directories exist
    fs.mkdirSync(tempDir, { recursive: true });

    const options = {
      density: 1000,
      saveFilename: "page",
      savePath: tempDir,
      format: "png",
      width: 800,
      height: 1200
    };

    const convert = fromPath(tempFilePath, options);
    const pageImages: string[] = [];

    for (let i = 1; i <= pageCount; i++) {
      const result = await convert(i, true);
      console.log(result);
      // @ts-expect-error
      const base64 = `data:image/png;base64,${result.base64}`;
      pageImages.push(base64);
    }

    // Clean up temporary PDF file
    fs.unlinkSync(tempFilePath);

    return NextResponse.json({ images: pageImages });
  } catch (error) {
    console.error('Error converting PDF:', error);
    // Clean up temporary files in case of error
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
    return NextResponse.json(
      { error: 'Error converting PDF' },
      { status: 500 }
    );
  }
} 