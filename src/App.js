import './App.css';
import { useEffect, useState } from 'react';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json());
      setTodos(result.slice(0, 5));
      setLoading(false);
    }

    fetchData();
  }, []);

  const onChange = (e) => {
    setNewTodo(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();
    const value = {
      userId: 3,
      id: Math.floor(Math.random() * 10000) + 1,
      title: newTodo,
      completed: false
    };

    setSaving(true);
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
    })
      .then(res => res.json())
      .then(res => {
        setTodos(todos.concat({ ...res, id: value.id }));
        setSaving(false);
      });
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const updateTodo = (id) => {
    const newList = todos.map(todoItem => {
      if (todoItem.id === id) {
        const updatedItem = { ...todoItem, completed: !todoItem.completed };
        return updatedItem;
      }
      return todoItem;
    });
    setTodos(newList);
  };

  return (
    <div className="App">
      <h1 className="header">My todo list</h1>
      {loading ? 'Loading' : <TodoList todos={todos} removeHandler={removeTodo} updateTodo={updateTodo} />}
      
      <div className="add-todo-form">
        {saving ? (
          'Saving'
        ) : (
          <form onSubmit={addTodo}>
            <input type="text" onChange={onChange} />
            <button type="submit">Add new todo</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
