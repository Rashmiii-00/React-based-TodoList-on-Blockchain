import React, { Component } from "react";
import Todo from "./Todo";
import { Card } from "react-bootstrap";

class Main extends Component {
  render() {
    return (
      <div className="content">
        <div>
          <h1>Add Tasks</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const taskContent = this.content.value;
              this.props.createTask(taskContent);
            }}
          >
            <div className="form-group mr-sm-2">
              <input
                id="content"
                type="text"
                ref={(input) => {
                  this.content = input;
                }}
                className="form-control"
                placeholder="content"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          </form>
        </div>

        <div>
          <br></br>
          <h1>List of Tasks</h1>
          <div className="list-container">
            <div>
              {this.props.tasks.map((task, key) => (
                <Card>
                  <Card.Body>
                    <Todo
                      key={key}
                      index={key}
                      todo={task}
                      mark={this.props.mark}
                      remove={this.props.remove}
                    />
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Main;
