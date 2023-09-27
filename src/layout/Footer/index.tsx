import styles from "./footer.module.scss";

export default function Footer(): JSX.Element {
  const date: Date = new Date();
  const year: number = date.getFullYear();

  return (
    <div className={styles.container}>
      <span>{year} · Melisa Zorraindo</span>
    </div>
  );
}
