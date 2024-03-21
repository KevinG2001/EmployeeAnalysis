import React from "react";
import Styles from "../../styles/modal/createTaskModal.module.scss";

const CreateTaskModal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={Styles.container}>
        <div>
          <div>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Description" />
          </div>
        </div>
        <button onClick={closeModal}>Close Modal</button>
      </div>
    </>
  );
};

export default CreateTaskModal;
