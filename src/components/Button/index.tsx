interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  customStyles: string;
}

export default function Button({
  type,
  text,
  customStyles,
}: ButtonProps): JSX.Element {
  return (
    <button type={type} className={customStyles}>
      {text}
    </button>
  );
}
