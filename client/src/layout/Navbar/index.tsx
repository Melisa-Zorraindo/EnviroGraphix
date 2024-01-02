import styles from "./navbar.module.scss";
import * as Icons from "../../components/Icons";
import buttonStyles from "../../components/Button/button.module.scss";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useAuth } from "../../hooks/useAuth";
import Avatar from "../../components/Avatar";

interface NavbarProps {
  open: boolean;
}

export default function Navbar({ open }: NavbarProps): JSX.Element {
  const { Contact, Login, MenuOptions, Signup } = Icons;
  const { width } = useWindowWidth();
  const { loggedInUser } = useAuth();
  const authToken = localStorage.getItem("enviroToken");

  return !authToken ? (
    <nav data-open={open}>
      <ul
        className={`${styles.container} ${
          open ? styles.isOpen : styles.isClosed
        }`}
      >
        <li className={styles.navItem}>
          <a href="/" className={styles.link}>
            <Contact />
            Contact
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="/login" className={styles.link}>
            <Login />
            Log in
          </a>
        </li>
        <li className={styles.navItem}>
          <a
            href="/registration"
            className={`${
              width >= 800
                ? `${buttonStyles.primaryButton} ${buttonStyles.buttonLink}`
                : styles.link
            }`}
          >
            <Signup />
            SIGN UP
          </a>
        </li>
      </ul>
    </nav>
  ) : (
    <nav data-open={open}>
      <ul
        className={`${styles.container} ${
          open ? styles.isOpen : styles.isClosed
        }`}
      >
        <li className={styles.navItem}>
          <button className={styles.menuOptions}>
            <MenuOptions /> Menu
          </button>
        </li>
        <li>
          <Avatar
            picture={loggedInUser.picture}
            companyName={loggedInUser.company}
          />
        </li>
      </ul>
    </nav>
  );
}
