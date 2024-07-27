import React, { useEffect, useState } from "react";
import Styles from "../../styles/home.module.scss";

// Define interfaces for the task and goal data
interface Task {
  id: number;
  name: string;
  created_at: string;
}

interface Goal {
  id: number;
  description: string;
  created_at: string;
}

const RecentTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksResponse, goalsResponse] = await Promise.all([
          fetch('http://localhost:5000/api/recent-tasks'),
          fetch('http://localhost:5000/api/week-goals')
        ]);

        if (!tasksResponse.ok || !goalsResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const tasksData = await tasksResponse.json();
        const goalsData = await goalsResponse.json();

        setTasks(tasksData);
        setGoals(goalsData);
      } catch (error) {
        setError('Error fetching tasks and goals.');
        console.error('Error fetching tasks and goals:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={Styles.recentTasksContainer}>
      {error && <div className={Styles.error}>{error}</div>}
      <div className={Styles.section}>
        <h3 className={Styles.sectionTitle}>Recent Tasks</h3>
        <ul className={Styles.taskList}>
          {tasks.length ? (
            tasks.map(task => (
              <li key={task.id} className={Styles.taskItem}>
                {task.name}
              </li>
            ))
          ) : (
            <li className={Styles.taskItem}>No recent tasks available.</li>
          )}
        </ul>
      </div>
      <div className={Styles.section}>
        <h3 className={Styles.sectionTitle}>Goals for This Week</h3>
        <ul className={Styles.goalsList}>
          {goals.length ? (
            goals.map(goal => (
              <li key={goal.id} className={Styles.goalItem}>
                {goal.description}
              </li>
            ))
          ) : (
            <li className={Styles.goalItem}>No goals available for this week.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default RecentTasks;
