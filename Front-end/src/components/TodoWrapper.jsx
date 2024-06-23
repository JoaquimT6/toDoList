import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoUpdateForm from './TodoUpdateForm';
import TodoDeleteForm from './TodoDeleteForm';
import api from '../services/api';

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  // Exemplo de tarefa para ser carregada inicialmente
  

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const fetchTodos = async () => {
    try {
      const response = await api.get('/tasks');
      setTodos(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className='TodoWrapper'>
      <h1>Lista de Tarefas</h1>
      <TodoForm addTodo={addTodo} />
      <TodoUpdateForm updateTodo={updateTodo} />
      <TodoDeleteForm deleteTodo={deleteTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
};

export default TodoWrapper;
