import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import db from "./utils/firebase";
import { collection, getDocs, orderBy } from "firebase/firestore";
import "firebase/firestore";
import AddTask from "./components/AddTask/AddTask";

import "./App.scss";

function App() {
  const [tasks, setTasks] = useState([]);
  console.log(tasks);

  useEffect(() => {
    const obtenerDatos = async () => {
      const datos = await getDocs(collection(db, "task"), orderBy("completed"));
      // console.log(datos.docs[0].data());
      const arrayTasks = [];
      datos.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        arrayTasks.push(data);
      });
      setTasks(arrayTasks);
    };
    obtenerDatos();
  }, []);

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
          <p>Lista de tareas</p>
        </Col>
        <Col
          className="todo__input"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          <AddTask />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
