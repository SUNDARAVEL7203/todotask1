import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const addTodo = () => {
    if (name && description) {
      setTodos([
        ...todos,
        {
          name,
          description,
          status: "Not Completed",
        },
      ]);
      setName("");
      setDescription("");
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const editTodo = (index, newName, newDescription, newStatus) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index
        ? { ...todo, name: newName, description: newDescription, status: newStatus }
        : todo
    );
    setTodos(updatedTodos);
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, status: newStatus } : todo
    );
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (statusFilter === "All") return true;
    return todo.status === statusFilter;
  });


  return (
    <>
    <div className="todo-app">
      <h1>ToDo Application</h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Todo Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Todo Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <div className="filter">
        <label>Status Filter: </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>
      </div>

      <h3>My ToDos:-</h3>
      <div className="todo-list">
        {filteredTodos.map((todo, index) => (
          <div key={index} className="todo-card">
            <h4>Name: {todo.name}</h4>
            <p>Description: {todo.description}</p>
            <label>Status: </label>
            <select
              value={todo.status}
              onChange={(e) => handleStatusChange(index, e.target.value)}
            >
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
            </select>
            <br />
            <button
              className="edit-btn"
              onClick={() => editTodo(index, todo.name, todo.description, todo.status)}
            >
              Edit
            </button>
            <button className="delete-btn" onClick={() => deleteTodo(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default App
