import { NavLink, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Logo from "../../components/Logo";
import Burger from "../../components/Burger";
import { MenuOptions } from "../../components/Icons";
import Avatar from "../../components/Avatar";
import Navbar from "../Navbar";
import styles from "./header.module.scss";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useCookies } from "react-cookie";

export default function Header(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const node = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(node, () => setIsOpen(false));

  const { width } = useWindowWidth();
  const [cookie] = useCookies(null);
  const authToken = cookie.enviroToken;
  const userName = cookie.enviroUser;
  const userImage = cookie.enviroAvatar;

  const { pathname } = useLocation();

  return (
    <header className={styles.container}>
      <NavLink to="/">
        <Logo />
      </NavLink>
      {!pathname.includes("registration") && !pathname.includes("login") && (
        <div ref={node}>
          {!authToken && <Burger open={isOpen} setOpen={setIsOpen} />}
          {authToken && width < 800 && (
            <ul className={styles.loggedInMenu}>
              <li>
                <button className={styles.menuOptions}>
                  <MenuOptions /> {width >= 500 && "Menu"}
                </button>
              </li>
              <li>
                <Avatar picture={userImage} companyName={userName} />
              </li>
            </ul>
          )}
          <Navbar open={isOpen} />
        </div>
      )}
    </header>
  );
}
