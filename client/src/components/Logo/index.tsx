import styles from "./logo.module.scss";

export default function Logo(): JSX.Element {
  return (
    <div className={styles.container}>
      <img src="/logo.png" alt="EnviroGraphix logo" />
      <span className={styles.text}>EnviroGraphix</span>
    </div>
  );
}
