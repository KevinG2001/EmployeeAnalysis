import React, { useRef, useEffect } from "react";
import Styles from "../../styles/home.module.scss";

interface LogoutModalProps {
  onLogout: () => void;
  position: { x: number; y: number };
}

function LogoutModal({ onLogout, position }: LogoutModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (position) {
      modalRef.current!.style.top = `${position.y}px`;
      modalRef.current!.style.left = `${position.x}px`;
    }
  }, [position]);

  return (
    <div className={Styles.modal} ref={modalRef}>
      <div className={Styles.modalContent}>
        <p>Are you sure you want to logout?</p>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default LogoutModal;
