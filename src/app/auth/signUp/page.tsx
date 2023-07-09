"use client";

import Z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { Header } from "@/components/Header";
import Link from "next/link";
import { getFirebaseErrorMessage } from "@/lib/utils/firebaseErrorMessage";

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
        setErrorLabelText(getFirebaseErrorMessage(err.code));
      }
      return;
    }
    replace("/");
  }
  return (
    <>
      <Header />
      <main className="flex items-center justify-center flex-col py-16">
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="px-2 py-10 w-full max-w-md"
        >
          <h1 className="text-5xl font-bold w-full text-center mb-2">
            Sign <span className="text-blue-600">up</span>
          </h1>
          <h3 className="mb-12 w-full text-center text-gray-400">
            App masters game store
          </h3>
          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              placeholder="youremail@gmail.com"
              className="bg-transparent border-gray-800 border px-3 py-2 rounded w-full"
              {...register("email")}
            />
            <input
              type="password"
              placeholder="your password"
              className="bg-transparent border-gray-800 border px-3 py-2 rounded w-full"
              {...register("password")}
            />
            <input
              type="password"
              placeholder="confirm your password"
              className="bg-transparent border-gray-800 border px-3 py-2 rounded w-full"
              {...register("confirmPassword")}
            />
            <button
              type="submit"
              className="bg-blue-600 px-3 py-2 rounded hover:bg-blue-700 transition-all font-bold"
            >
              Sign in
            </button>
            <span>
              Already have an account?{" "}
              <Link href="/auth/signIn" className="text-blue-400 font-bold">
                sign-in here
              </Link>
            </span>
            <span className="w-full text-center text-red-500">
              {errorLabelText}
            </span>
          </div>
        </form>
      </main>
    </>
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
