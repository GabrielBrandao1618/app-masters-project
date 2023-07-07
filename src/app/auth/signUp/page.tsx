"use client";

import { FormEvent } from "react";

export default function SignUpPage() {
  async function onFormSubmit(e: FormEvent) {
    e.preventDefault();
  }
  return (
    <main className="flex items-center justify-center flex-col">
      <form onSubmit={onFormSubmit} className="px-2 py-10 w-full max-w-md">
        <h1 className="text-5xl font-bold w-full text-center mb-12">
          Sign <span className="text-blue-600">up</span>
        </h1>
        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            placeholder="youremail@gmail.com"
            className="bg-transparent border-gray-800 border px-2 py-1 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="your password"
            className="bg-transparent border-gray-800 border px-2 py-1 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="confirm your password"
            className="bg-transparent border-gray-800 border px-2 py-1 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 px-3 py-2 rounded hover:bg-blue-700 transition-all font-bold"
          >
            Sign in
          </button>
        </div>
      </form>
    </main>
  );
}
