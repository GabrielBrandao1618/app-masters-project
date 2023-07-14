import { Star } from "@phosphor-icons/react";

interface StarRaterProps {
  value: number;
  setValue: (val: number) => void | Promise<void>;
}

export function StarRater({ value, setValue }: StarRaterProps) {
  return (
    <div className="flex">
      {[1, 2, 3, 4].map((val) => {
        return (
          <Star
            weight={val <= value ? "fill" : "regular"}
            key={val}
            size={24}
            className="cursor-pointer text-yellow-400"
            onClick={() => {
              setValue(val);
            }}
          />
        );
      })}
    </div>
  );
}
