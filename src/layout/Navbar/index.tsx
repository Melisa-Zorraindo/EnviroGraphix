import styles from "./navbar.module.scss";
import * as Icons from "../../components/Icons";

interface NavbarProps {
  open: boolean;
}

export default function Navbar({ open }: NavbarProps): JSX.Element {
  const { Contact, Login, Signup } = Icons;
  return (
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
          <a href="/" className={styles.link}>
            <Login />
            Log in
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="/" className={styles.link}>
            <Signup />
            Sign up
          </a>
        </li>
      </ul>
    </nav>
  );
}
