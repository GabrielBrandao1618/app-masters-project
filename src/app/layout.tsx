import { AuthContextProvider } from "@/contexts/AuthContext";
import "./globals.css";

import { Inter } from "next/font/google";
import { UserGameDataContextProvider } from "@/contexts/UserGameDataContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "App Masters game store",
  description: "Take a look into these incredible games!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
      <UserGameDataContextProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </UserGameDataContextProvider>
    </AuthContextProvider>
  );
}
