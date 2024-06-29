import style from "../../styles/tasks/TaskModal.module.scss";

interface TaskModalProps {
  task: {
    task_id: number;
    task_name: string;
    task_description: string;
    task_difficulty: string;
    task_priority: string;
    task_duedate: string;
  } | null;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <h2>Task Details</h2>
        <p>Name: {task.task_name}</p>
        <p>Description: {task.task_description}</p>
        <p>Difficulty: {task.task_difficulty}</p>
        <p>Priority: {task.task_priority}</p>
        <p>Due Date: {task.task_duedate}</p>
        <div className={style.modalBtnGroup}>
          <button onClick={onClose} className={style.btn}>
            Close
          </button>
          <button className={style.btn}>Completed</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
