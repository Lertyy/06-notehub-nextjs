import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    // Зберігаємо поточний стан прокрутки
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Блокуємо прокрутку
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Функція очищення
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Відновлюємо прокрутку
      document.body.style.overflow = originalStyle;
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={styles.modal}>{children}</div>
    </div>,
    document.body
  );
}
