import React, { Component } from "react";
import { Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class Todo extends Component {
  render() {
    return (
      <div className="todo">
        {this.props.todo.completed ? (
          <span style={{ textDecoration: "line-through" }}>
            {this.props.todo.content}
          </span>
        ) : (
          <span>{this.props.todo.content}</span>
        )}
        {/* <span
          style={{
            textDecoration: this.props.todo.completed ? "line-through" : "",
          }}
        >
          {this.props.todo.content}
        </span> */}
        <div>
          <Button
            variant="outline-success"
            style={{ margin: "10px" }}
            onClick={() => this.props.mark(this.props.todo.id)}
          >
            ✓
          </Button>{" "}
          <Button
            variant="outline-danger"
            onClick={() => this.props.remove(this.props.index)}
          >
            ✕
          </Button>
        </div>
      </div>
    );
  }
}
export default Todo;
