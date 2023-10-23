import { Dispatch, SetStateAction } from "react";

export function colourBorder(
  field: string,
  setIsOnFocus: Dispatch<SetStateAction<{ [key: string]: boolean }>>
) {
  setIsOnFocus((prevState) => ({
    [field]: !prevState[field as keyof typeof prevState],
  }));
}
