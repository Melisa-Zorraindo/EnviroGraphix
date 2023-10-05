interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  icon?: JSX.Element;
  text: string;
  customStyles: string;
}

export default function Button({
  type,
  icon,
  text,
  customStyles,
}: ButtonProps): JSX.Element {
  return (
    <button type={type} className={customStyles}>
      {icon}
      {text}
    </button>
  );
}
