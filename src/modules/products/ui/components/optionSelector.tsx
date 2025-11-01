"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import React from "react";

interface Option {
  id: string;
  name: string;
  colorCode?: string;
}

interface OptionSelectorProps {
  label?: string;
  options: Option[];
  selected: string | null;
  onChange: (value: string) => void;
  type?: "color" | "text";
}

export const OptionSelector: React.FC<OptionSelectorProps> = ({
  label = "Options",
  options,
  selected,
  onChange,
  type = "text",
}) => {
  if (!options?.length) {
    return (
      <div className="flex flex-col gap-1">
        <h2>{label} :</h2>
        <p className="text-gray-500">No options available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 ">
      <h2>{label} :</h2>
      <RadioGroup
        className="flex flex-wrap"
        value={undefined}
        onValueChange={onChange}
      >
        {options.map((option) => (
          <div key={option.id} className="relative">
            <RadioGroupItem
              value={option.name}
              id={option.name}
              className="peer sr-only"
            />
            <Label
              htmlFor={option.name}
              className={cn(
                "flex items-center justify-center rounded-lg border cursor-pointer transition-all duration-200 text-sm font-medium",
                type === "color" ? "w-12 h-6" : "min-w-[48px] h-8 px-3",
                selected === option.name
                  ? "ring-2 ring-offset-2 scale-110 ring-amber-400"
                  : "hover:scale-105"
              )}
              style={
                type === "color"
                  ? {
                      backgroundColor: option.colorCode || option.name,
                      borderColor:
                        option.name.toLowerCase() === "white"
                          ? "#ccc"
                          : "transparent",
                    }
                  : {}
              }
            >
              {type === "text" && option.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
