import styles from "./toast.module.scss";
import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: string;
  onClose: () => void;
}

export default function Toast({
  message,
  type,
  onClose,
}: ToastProps): JSX.Element {
  const [toastTypeClass, setToastTypeClass] = useState<string>("");

  useEffect(() => {
    switch (type) {
      case "error":
        setToastTypeClass(styles.error);
        break;
      case "warning":
        setToastTypeClass(styles.warning);
        break;
      case "success":
        setToastTypeClass(styles.success);
        break;
    }
  }, [type]);

  return (
    <div className={`${styles.box} ${toastTypeClass}`} role="alert">
      <div className={styles.buttonContainer}>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
      </div>
      <span className={styles.message}>{message}</span>
    </div>
  );
}
