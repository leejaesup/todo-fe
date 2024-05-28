import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({item, toggleComplete, deleteItem}) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete ? "item-complete" : ""}`}>
          <div className="todo-content">{item.task}</div>
          {item.author && item.author.name && <div>by {item.author.name}</div>}

          <div>
            <button className="button-delete" onClick={() => deleteItem(item._id)}>삭제</button>
            <button className="button-delete" onClick={() => toggleComplete(item._id)}>끝남</button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
