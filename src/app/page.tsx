'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    setLoading(true);
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to convert PDF');
      }

      const data = await response.json();
      setImages(data.images);
    } catch (error) {
      console.error('Error converting PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">PDF to Image Converter</h1>
        
        <div className="flex flex-col items-center gap-8">
          <div className="w-full max-w-md">
            <label className="block text-center">
              <Button
                className="w-full"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                {loading ? 'Converting...' : 'Upload PDF'}
              </Button>
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileUpload}
                disabled={loading}
              />
            </label>
          </div>

          {images.length > 0 && (
            <div className="w-full grid gap-8">
              {images.map((image, index) => (
                <div key={index} className="border rounded-lg p-4 shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Page {index + 1}</h2>
                  <Image
                    src={image}
                    alt={`Page ${index + 1}`}
                    className="w-full h-auto"
                    width={800}
                    height={1200}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
