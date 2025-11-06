import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { CircleXIcon } from "lucide-react";

interface Props {
  total?: number;
  totalItems?: number | undefined;
  onCheckOut: () => void;
  isPanding?: boolean;
  isCanceled?: boolean;
}

export const CheckOutSideBar = ({
  total,
  onCheckOut,
  isPanding,
  isCanceled,
  totalItems,
}: Props) => {
  return (
    <div className="border rounded-md overflow-hidden bg-white flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex flex-row items-center gap-1">
          <h4 className="font-medium text-lg">Total Price</h4>
          <span>
            {" "}
            ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
        </div>
        <p>{formatCurrency(total)}</p>
      </div>
      <div className="p-4 flex items-center justify-center">
        <Button
          variant={"elevated"}
          onClick={onCheckOut}
          disabled={isPanding}
          size={"lg"}
          className={cn("w-full text-base bg-amber-400")}
        >
          {isPanding ? "Processing..." : "Check Out"}
        </Button>
      </div>
      {isCanceled && (
        <div className="p-4 flex justify-center items-center border-t w-full">
          <div className=" bg-red-100 border-red-500 border font-medium px-4 py-3 rounded flex items-center w-full">
            <div className="flex items-center">
              <CircleXIcon className="w-6 h-6 mr-2 fill-red-500 text-red-100" />
              <span>payment Failed. Please try again.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
