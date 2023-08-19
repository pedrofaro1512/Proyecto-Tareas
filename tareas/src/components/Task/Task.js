import React from "react";
import { ReactComponent as Check } from "../../assets/check.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import db from "../../utils/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import "firebase/firestore";

import "./Task.scss";

const Task = (props) => {
  const { task, setReloadTask } = props;

  const completeTask = async () => {
    const taskRef = doc(db, "task", task.id);

    await updateDoc(taskRef, {
      completed: !task.completed,
    });
    setReloadTask(true);
  };

  const deleteTask = async () => {
    await deleteDoc(doc(db, "task", task.id));
    setReloadTask(true);
  };

  return (
    <div className="task">
      <div>
        <Check
          className={task.completed ? "completed" : ""}
          onClick={completeTask}
        />
      </div>
      <div>{task.name}</div>
      <div>
        <Delete onClick={deleteTask} />
      </div>
    </div>
  );
};

export default Task;
