import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { isEmpty } from "lodash";
import db from "../../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import "firebase/firestore";
import { ReactComponent as Send } from "../../assets/send.svg";

import "./AddTask.scss";

const AddTask = (props) => {
  const { setReloadTask } = props;
  const [task, setTask] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!isEmpty(task)) {
      try {
        const docRef = await addDoc(collection(db, "task"), {
          name: task,
          completed: false,
        });
        setTask("");
        setReloadTask(true);
      } catch (event) {
        console.error("Error al agregar tarea");
      }
    }
  };

  return (
    <Form onSubmit={onSubmit} className="add-task">
      <input
        type="text"
        placeholder="Digita la nueva tarea"
        onChange={(event) => setTask(event.target.value)}
        value={task}
      />
      <Button type="submit">
        <Send />
      </Button>
    </Form>
  );
};

export default AddTask;
