import { NavLink, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Logo from "../../components/Logo";
import Burger from "../../components/Burger";
import Navbar from "../Navbar";
import styles from "./header.module.scss";

export default function Header(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const node = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(node, () => setIsOpen(false));

  const { pathname } = useLocation();

  return (
    <header className={styles.container}>
      <NavLink to="/">
        <Logo />
      </NavLink>
      {!pathname.includes("registration") && !pathname.includes("login") && (
        <div ref={node}>
          <Burger open={isOpen} setOpen={setIsOpen} />
          <Navbar open={isOpen} />
        </div>
      )}
    </header>
  );
}
