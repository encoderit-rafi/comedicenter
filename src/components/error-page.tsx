// components/ErrorPage.tsx
import React from 'react';

interface ErrorPageProps {
  error: string;
}
export const dynamic = 'force-dynamic';
const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50">
      <h1 className="text-3xl font-bold text-red-500">Something went wrong!</h1>
      <p className="mt-4 text-lg text-gray-700">{error}</p>
    </div>
  );
};

export default ErrorPage;
