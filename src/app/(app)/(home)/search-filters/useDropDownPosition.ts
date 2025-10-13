import { RefObject } from "react";

export const useDropDownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
  const getDropDownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };
    const ract = ref.current.getBoundingClientRect();
    const dropDownWidth = 240;

    let left = ract.left + window.scrollX;
    let top = ract.bottom + window.scrollY;

    if (left + dropDownWidth > window.innerWidth) {
      left = ract.right + window.scrollX - dropDownWidth;
    }
    if (left < 0) {
      left = window.innerWidth - dropDownWidth - 16;
    }
    if (left < 0) {
      left = 16;
    }
    return { top, left };
  };
  return { getDropDownPosition };
};
