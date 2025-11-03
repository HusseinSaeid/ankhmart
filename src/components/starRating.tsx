import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const maxRating = 5;
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
  const safeRating = Math.max(minRating, Math.min(rating, maxRating));
  return (
    <div className={cn("flex items-center gap-x-1", className)}>
      {Array.from({ length: maxRating }).map((_, index) => (
        <Star
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
