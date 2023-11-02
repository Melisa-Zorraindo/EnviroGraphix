import styles from "./toast.module.scss";
import { useEffect, useState } from "react";

interface ToastProps {
  title?: string;
  message: string;
  type: string;
  onClose: () => void;
  mode: string;
}

export default function Toast({
  title,
  message,
  type,
  onClose,
  mode,
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
    <div
      className={`${styles.box} ${toastTypeClass} ${
        mode === "active" && styles.active
      }`}
      role="alert"
    >
      <div className={styles.buttonContainer}>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
      </div>
      <div className={styles.message}>
        {title && <span>{title}</span>}
        <span>{message}</span>
      </div>
    </div>
  );
}
