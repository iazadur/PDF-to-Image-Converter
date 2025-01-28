# PDF to Image Converter

A modern web application built with Next.js that converts PDF files into high-quality PNG images. Each page of the PDF is converted into a separate image that can be viewed and downloaded individually.

## Features

- 🚀 Built with Next.js 14/15
- 💅 Modern UI with Tailwind CSS and shadcn/ui
- 🖼️ High-quality image conversion
- 📥 Individual page downloads
- 🔄 Automatic cleanup of temporary files
- 📱 Responsive design
- 🛡️ Server-side processing for better security

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or later
- GraphicsMagick (`apt-get install graphicsmagick` on Ubuntu/Debian)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pdf-to-image.git
cd pdf-to-image
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Click the "Upload PDF" button
2. Select a PDF file from your computer
3. Wait for the conversion process to complete
4. View and download individual pages as PNG images

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [pdf2pic](https://www.npmjs.com/package/pdf2pic) - PDF conversion
- [pdf-lib](https://pdf-lib.js.org/) - PDF processing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [pdf2pic](https://www.npmjs.com/package/pdf2pic) for PDF to image conversion
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
