import React, { Component } from "react";
import ShowTodos from "./components/ShowTodos";
import AddTodo from "./components/AddTodo";
import axios from "axios";

class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      todo: "",
      todos: [""]
    };
  }

  getTodos = () => {
    axios.get("/todos").then(res => {
      this.setState({
        todos: res.data.todos
      });
    });
  };

  addTodo = e => {
    axios.post(`/todos/${this.state.todo}`);
    this.getTodos();
    this.clearInput();
  };

  clearInput = () => {
    this.setState({ todo: "" });
  };

  removeTodo = index => {
    axios.delete(`/todos/${index}`).then(this.getTodos);
  };

  handleChange = e => {
    this.setState({
      todo: e.target.value
    });
  };

  componentDidMount() {
    this.getTodos();
  }

  render() {
    return (
      <div>
        <AddTodo
          handleChange={this.handleChange}
          addTodo={this.addTodo}
          todo={this.state.todo}
        />
        <ShowTodos todos={this.state.todos} removeTodo={this.removeTodo} />
      </div>
    );
  }
}

export default TodoApp;
