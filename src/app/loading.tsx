import { PulseLoader } from "react-spinners";

export default async function Loading() {
  return (
    <main className="flex items-center justify-center h-screen">
      <PulseLoader color="#ffffff" size={40} />
    </main>
  );
}
