"use client";

import Z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { useState } from "react";

export default function SignUpPage() {
  const { replace } = useRouter();
  const [errorLabelText, setErrorLabelText] = useState("");
  const { signUp } = useAuth();
  const { register, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  async function onFormSubmit(data: FormSchema) {
    try {
      await signUp(data.email, data.password);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setErrorLabelText(err.code);
      }
      return;
    }
    replace("/");
  }
  return (
    <main className="flex items-center justify-center flex-col">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="px-2 py-10 w-full max-w-md"
      >
        <h1 className="text-5xl font-bold w-full text-center mb-12">
          Sign <span className="text-blue-600">up</span>
        </h1>
        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            placeholder="youremail@gmail.com"
            className="bg-transparent border-gray-800 border px-2 py-1 rounded w-full"
            {...register("email")}
          />
          <input
            type="password"
            placeholder="your password"
            className="bg-transparent border-gray-800 border px-2 py-1 rounded w-full"
            {...register("password")}
          />
          <input
            type="password"
            placeholder="confirm your password"
            className="bg-transparent border-gray-800 border px-2 py-1 rounded w-full"
            {...register("confirmPassword")}
          />
          <button
            type="submit"
            className="bg-blue-600 px-3 py-2 rounded hover:bg-blue-700 transition-all font-bold"
          >
            Sign in
          </button>
          <span>{errorLabelText}</span>
        </div>
      </form>
    </main>
  );
}

const formSchema = Z.object({
  email: Z.string().email(),
  password: Z.string().min(4),
  confirmPassword: Z.string(),
}).refine(
  (data) => {
    return data.confirmPassword === data.password;
  },
  {
    path: ["confirmPassword"],
    message: "Password confirmation must match the password",
  }
);
type FormSchema = Z.TypeOf<typeof formSchema>;
