import "./styles.css";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputTodo: ""
    };
  }

  generateId = () => {
    return Math.floor(Math.random() * 100000000);
  };

  handleAddTodo = () => {
    const { inputTodo, todos } = this.state;
    // const newTodos = todos;
    // const newTodos = [...todos];
    const newTodo = {
      // id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1,
      id: this.generateId(),
      text: inputTodo,
      checked: false
    };

    const newTodos = todos.map((todo) => ({ ...todo }));
    newTodos.push(newTodo);

    this.setState({ todos: newTodos, inputTodo: "" });
  };

  handleClearList = () => {
    this.setState({ todos: [] });
  };

  handleInputChange = (e) => {
    this.setState({ inputTodo: e.target.value });
  };

  handleTodoDel = (id) => {
    const { todos } = this.state;

    // splice
    // const newTodos = [...todos];
    // newTodos.splice(index, 1);

    // for loop
    // const newTodos = [];

    // for (let i = 0; i < todos.length; i++) {
    //   if (index !== i) {
    //     newTodos.push(todos[i]);
    //   }
    // }

    // filter
    const newTodos = todos.filter((todo) => todo.id !== id);

    this.setState({ todos: newTodos });
  };

  handleCheckBoxClick = (id) => {
    const { todos } = this.state;
    const newTodos = todos.map((todo) => ({ ...todo }));
    newTodos.forEach((todo) => {
      if (todo.id === id) {
        todo.checked = !todo.checked;
      }
    });
    this.setState({ todos: newTodos });
  };

  render() {
    const { todos, inputTodo } = this.state;
    console.log("todos", todos);
    return (
      <div className="App">
        <h1>Todo List</h1>
        <div className="new-task">
          <input
            value={inputTodo}
            type="text"
            placeholder="Add a new todo"
            onChange={this.handleInputChange}
          />
          <button className="btn add" onClick={this.handleAddTodo}>
            Add
          </button>
        </div>
        <div className="content">
          <ul>
            {todos.map((todo) => {
              const { id, text, checked } = todo;
              const customClass = checked ? "cross" : "";
              return (
                <li key={id}>
                  <input
                    checked={checked}
                    type="checkbox"
                    onChange={() => this.handleCheckBoxClick(id)}
                  />
                  <span className={customClass}>{text}</span>
                  <span
                    className="delete"
                    onClick={() => {
                      this.handleTodoDel(id);
                    }}
                  >
                    X
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <button className="clear btn" onClick={this.handleClearList}>
          Clear List
        </button>
      </div>
    );
  }
}

export default App;
