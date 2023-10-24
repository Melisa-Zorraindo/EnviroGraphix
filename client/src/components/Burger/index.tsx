import styles from "./burger.module.scss";

interface BurgerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Burger({ open, setOpen }: BurgerProps): JSX.Element {
  return (
    <button className={styles.hamburger} onClick={() => setOpen(!open)}>
      <div
        className={`${styles.bars} ${
          open ? styles.firstBarActive : styles.firstBarInactive
        }`}
      ></div>
      <div
        className={`${styles.bars} ${
          open ? styles.secondBarActive : styles.secondBarInactive
        }`}
      ></div>
      <div
        className={`${styles.bars} ${
          open ? styles.thirdBarActive : styles.thirdBarInactive
        }`}
      ></div>
    </button>
  );
}
