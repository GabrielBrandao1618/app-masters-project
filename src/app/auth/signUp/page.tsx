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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
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
          <div className="flex flex-col gap-3 w-full">
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="john.doe@email.com"
                className={`bg-transparent border px-3 py-2 rounded w-full ${
                  errors.email !== undefined
                    ? "border-red-500"
                    : "border-gray-800"
                }`}
                {...register("email")}
              />
              <span className="text-red-500 text-sm">
                {errors.email?.message}
              </span>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="your password"
                className={`bg-transparent border-gray-800 border px-3 py-2 rounded w-full ${
                  errors.password !== undefined
                    ? "border-red-500"
                    : "border-gray-800"
                }`}
                {...register("password")}
              />
              <span className="text-red-500 text-sm">
                {errors.password?.message}
              </span>
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                type="password"
                placeholder="confirm your password"
                className={`bg-transparent border px-3 py-2 rounded w-full ${
                  errors.confirmPassword !== undefined
                    ? "border-red-500"
                    : "border-gray-800"
                }`}
                {...register("confirmPassword")}
              />
              <span className="text-red-500 text-sm">
                {errors.confirmPassword?.message}
              </span>
            </div>
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
  password: Z.string().min(
    6,
    "Your password must contain at least 6 characters"
  ),
  confirmPassword: Z.string(),
}).refine(
  (data) => {
    return data.confirmPassword === data.password;
  },
  {
    path: ["confirmPassword"],
    message: "Password confirmation must match the given password",
  }
);
type FormSchema = Z.TypeOf<typeof formSchema>;
