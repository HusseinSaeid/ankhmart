import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const maxReating = 5;
const minRating = 0;

interface Props {
  rating: number;
  className?: string;
  iconClassName?: string;
  text?: string;
}

export const StarRating = ({
  rating,
  className,
  iconClassName,
  text,
}: Props) => {
  const safeRating = Math.max(minRating, Math.min(rating, maxReating));
  return (
    <div className={cn("flex items-center gap-x-1", className)}>
      {Array.from({ length: maxReating }).map((_, index) => (
        <StarIcon
          key={index}
          className={cn(
            "size-4",
            index < safeRating ? "fill-amber-400" : "",
            iconClassName
          )}
        />
      ))}
      {text && <p>{text}</p>}
    </div>
  );
};
