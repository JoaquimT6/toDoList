import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const TodoList = ({ todos, deleteTodo }) => {
  const formatPriority = (priority) => {
    switch (priority) {
      case 'ALTA': return 'Alta';
      case 'MEDIA': return 'Média';
      case 'BAIXA': return 'Baixa';
      default: return priority;
    }
  };

  const formatType = (type) => {
    switch (type) {
      case 'DATA': return 'Data';
      case 'PRAZO': return 'Prazo';
      case 'LIVRE': return 'Livre';
      default: return type;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className='TodoList'>
      {todos.map(todo => (
        <div key={todo.id} className='Todo'>
          <p>ID: {todo.id}</p>
          <p className={todo.completed ? 'completed' : ''}>{todo.title}</p>
          <p>{todo.description}</p>
          <p>{todo.dueDate ? formatDate(todo.dueDate) : 'Sem data'}</p>
          <p>{formatPriority(todo.priority)}</p>
          <p>{formatType(todo.type)}</p>
          
        </div>
      ))}
    </div>
  );
};

export default TodoList;
