import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

interface Props {
  disabled?: boolean;
}

export const SearchInput = ({ disabled }: Props) => {
  return (
    <div className="flex items-center w-full gap-2">
      <div className="relative w-full">
        <Input
          className="pl-8"
          placeholder="Search Products"
          disabled={disabled}
        />
        <FaSearch className="absolute left-3 top-1/2 size-4 transform -translate-y-1/2 text-neutral-500" />
      </div>
    </div>
  );
};
