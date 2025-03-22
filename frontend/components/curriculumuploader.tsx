'use client';
import { useState } from 'react';

const PdfUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      alert('Please upload a valid PDF file');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (file) {
      // Implement file upload logic here (e.g., send the file to a server)
      console.log('Uploading file:', fileName);
    } else {
      alert('Please select a PDF file to upload');
    }
  };

  return (
    <div className="flex justify-center items-center rounded-b-3xl bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <label htmlFor="pdf-upload" className="block text-lg font-medium animate-pulse hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out text-gray-700 mb-4 cursor-pointer">
          Select a PDF file
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {fileName && <p className="text-sm text-gray-600 mt-2">Selected file: {fileName}</p>}
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 px-6 cursor-pointer rounded-lg hover:bg-blue-700 hover:scale-105 transition duration-200"
        >
          Upload PDF
        </button>
      </form>
    </div>
  );
};

export default PdfUploader;
