import styles from "./navbar.module.scss";

interface NavbarProps {
  open: boolean;
}

export default function Navbar({ open }: NavbarProps): JSX.Element {
  return (
    <nav data-open={open}>
      <ul
        className={`${styles.container} ${
          open ? styles.isOpen : styles.isClosed
        }`}
      >
        <li className={styles.navItem}>
          <a href="/" className={styles.link}>
            <span role="img" aria-label="contact">
              &#x1f481;&#x1f3fb;&#x200d;&#x2642;&#xfe0f;
            </span>
            Contact
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="/" className={styles.link}>
            <span role="img" aria-label="log in">
              &#x1f4b8;
            </span>
            Log in
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="/" className={styles.link}>
            {" "}
            <span role="img" aria-label="sign up">
              &#x1f4e9;
            </span>
            Sign up
          </a>
        </li>
      </ul>
    </nav>
  );
}
