import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import db from "./utils/firebase";
import { collection, getDocs, orderBy } from "firebase/firestore";
import "firebase/firestore";
import AddTask from "./components/AddTask/AddTask";
import Task from "./components/Task/Task";
import { map, size } from "lodash";

import "./App.scss";

function App() {
  const [tasks, setTasks] = useState(null);
  const [reloadTask, setReloadTask] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      const datos = await getDocs(collection(db, "task"), orderBy("completed"));

      const arrayTasks = [];
      datos.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        arrayTasks.push(data);
      });
      setTasks(arrayTasks);
    };
    obtenerDatos();
    setReloadTask(false);
  }, [reloadTask]);

  return (
    <Container fluid className="app">
      <div className="title">
        <h1>Pedro Romero</h1>
      </div>

      <Row className="todo">
        <Col
          className="todo__title"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          <h2>Today</h2>
        </Col>
        <Col
          className="todo__list"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          {!tasks ? (
            <div className="loading">
              <Spinner animation="border" />
              <span>Cargando...</span>
            </div>
          ) : size(tasks) === 0 ? (
            <h3>No hay tareas</h3>
          ) : (
            map(tasks, (task, index) => (
              <Task key={index} task={task} setReloadTask={setReloadTask} />
            ))
          )}
        </Col>
        <Col
          className="todo__input"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          <AddTask setReloadTask={setReloadTask} reloadTask={reloadTask} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
