import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {useEffect, useState} from "react";
import api from "./utils/api";

function App() {
    const [todoList, setTodoList] = useState([]);
    const [todoValue, setTodoValue] = useState("");
    const getTasks = async () => {
        const response = await api.get('/tasks');
        console.log("response = ", response);
        setTodoList(response.data.data);
    };

    const addTask = async () => {
        try {
            const response = await api.post('/tasks', {
                task: todoValue,
                isComplete: false
            });
            if (response.status === 200) {
                console.log("성공");

                //초기화
                setTodoValue("");
                getTasks();
            } else {
                throw new Error("할 일 추가 중 오류가 발생했습니다.");
            }
        } catch (err) {
            console.log("error : ", err);
        }
    }

    const completeTask = async (id) => {
        try {
            const task = todoList.find((item) => item._id === id);
            const response = await api.put(`/tasks/${id}`, { //update -> put!
                isComplete: !task.isComplete //true -> false / false -> true
            });

            if (response.status === 200) {
                console.log("성공");
                getTasks();
            } else {
                throw new Error("할 일 수정 중 오류가 발생했습니다.");
            }
        } catch (err) {
            console.log("error : ", err);
        }
    }

    const deleteItem = async (id) => {
        try {
            const task = todoList.find((item) => item._id === id);
            const response = await api.delete(`/tasks/${id}`);

            if (response.status === 200) {
                console.log("성공");
                getTasks();
            } else {
                throw new Error("할 일 수정 중 오류가 발생했습니다.");
            }
        } catch (err) {
            console.log("error : ", err);
        }
    }

    useEffect(() => {
        getTasks();
    }, [])
  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} completeTask={completeTask} deleteItem={deleteItem}/>
    </Container>
  );
}

export default App;
