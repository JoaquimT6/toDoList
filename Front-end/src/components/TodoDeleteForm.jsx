import React, { useState } from 'react';
import api from '../services/api';

const TodoDeleteForm = ({ deleteTodo }) => {
  const [id, setId] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    if (id) {
      try {
        await api.delete(`/tasks/${id}`);
        deleteTodo(id);
        setId('');
      } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
      }
    }
  };

  return (
    <form className='TodoForm' onSubmit={handleDelete}>
      <input 
        type='text' 
        placeholder='ID da tarefa a ser excluída' 
        value={id} 
        onChange={(e) => setId(e.target.value)} 
      />
      <button type='submit'>Excluir</button>
    </form>
  );
};

export default TodoDeleteForm;
