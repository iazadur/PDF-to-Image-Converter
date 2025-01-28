'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Download } from 'lucide-react';

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

  const handleDownload = async (imageUrl: string, pageNumber: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `page-${pageNumber}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
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
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Page {index + 1}</h2>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDownload(image, index + 1)}
                      className="hover:bg-slate-100"
                      title="Download image"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
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
