import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, removeHandler, updateTodo }) {
  return (
    <div>
      {todos.map((t, i) => (
        <TodoItem key={i} todo={t} removeHandler={removeHandler} updateTodo={updateTodo} />
      ))}
    </div>
  );
}