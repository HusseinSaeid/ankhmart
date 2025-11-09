import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { jsPDF } from "jspdf";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
  productId: string;
  productName: string;
  date: string;
  tenantName: string;
  orderId: string;
  price: number;
}

export const ReceiptSection = ({
  productId,
  productName,
  date,
  tenantName,
  orderId,
  price,
}: Props) => {
  const [open, setOpen] = useState(false);

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Purchase Receipt", 105, 20, { align: "center" });

    doc.setLineWidth(0.5);
    doc.line(20, 28, 190, 28);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const startY = 40;
    const gap = 10;

    doc.text(`Product: ${productName}`, 20, startY);
    doc.text(`Product Id: ${productId}`, 20, startY + gap);
    doc.text(`Order Id: ${orderId}`, 20, startY + gap * 2);
    doc.text(`Price: ${formatCurrency(price)}`, 20, startY + gap * 3);
    doc.text(`Sold By: ${tenantName}`, 20, startY + gap * 4);
    doc.text(
      `Date: ${new Date(date).toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      20,
      startY + gap * 5
    );

    doc.setFont("helvetica", "italic");
    doc.text("Thank you for your purchase!", 105, startY + gap * 7, {
      align: "center",
    });

    doc.save(`${productName}_receipt.pdf`);
  };
  return (
    <div className="p-4 flex flex-col gap-4 border bg-[#f4f4f0] rounded-md">
      <h2 className="font-medium text-base">Receipt</h2>

      <Button variant="elevated" onClick={() => setOpen(true)}>
        View Receipt
      </Button>
      <Button variant="elevated" onClick={handleDownload}>
        Download Receipt
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Purchase Receipt</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Product:</span>
              <strong>{productName}</strong>
            </div>
            <div className="flex justify-between">
              <span>Product Id:</span>
              <strong>{productId}</strong>
            </div>
            <div className="flex justify-between">
              <span>Order Id:</span>
              <strong>{orderId}</strong>
            </div>

            <div className="flex justify-between">
              <span>Price:</span>
              <strong>{formatCurrency(price)}</strong>
            </div>
            <div className="flex justify-between">
              <span>Sold By:</span>
              <strong>{tenantName}</strong>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <strong>
                {new Date(date).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </strong>
            </div>
            <div className="text-center pt-4 text-sm text-gray-500">
              Thank you for your purchase!
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
