import { useEffect, RefObject } from "react";

type RefType = RefObject<HTMLElement | null>;
type EventHandler = (event: MouseEvent) => void;

export default function useOnClickOutside(ref: RefType, handler: EventHandler) {
  useEffect(() => {
    function listener(event: MouseEvent) {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    }

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}
