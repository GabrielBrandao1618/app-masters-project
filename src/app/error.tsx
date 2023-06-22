"use client";

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  return (
    <main className="h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">{error.message}</h1>
    </main>
  );
}
