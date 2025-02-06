import { RefObject } from "react";

export const toggleClass = (
  ref: RefObject<HTMLElement | HTMLDivElement | HTMLButtonElement>,
  className: string,
  action: "add" | "remove" = "add"
) => {
  if (ref.current) ref.current.classList[action](className);
};
