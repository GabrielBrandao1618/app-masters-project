import { motion } from "framer-motion";

export function SkeletonGameCard() {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-75 w-full rounded-lg max-w-[400px] min-w-[200px] h-96 flex flex-col"
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 3,
      }}
    />
  );
}
