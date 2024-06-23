import React, { useState } from 'react';
import api from '../services/api';

const TodoUpdateForm = ({ updateTodo }) => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('ALTA');
  const [type, setType] = useState('DATA');

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (id && (title || description || dueDate || priority || type)) {
      try {
        const response = await api.put(`/tasks/${id}`, { 
          title, 
          description, 
          dueDate: type === 'DATA' ? dueDate : null,
          dueInDays: type === 'PRAZO' ? 0 : null,
          priority, 
          type 
        });
        updateTodo(response.data);
        setId('');
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('ALTA');
        setType('DATA');
      } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
      }
    }
  };

  return (
    <form className='TodoForm' onSubmit={handleUpdate}>
      <input 
        type='text' 
        placeholder='ID da tarefa' 
        value={id} 
        onChange={(e) => setId(e.target.value)} 
      />
      <input 
        type='text' 
        placeholder='Novo título da tarefa' 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <input 
        type='text' 
        placeholder='Nova descrição da tarefa' 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <input 
        type='date' 
        placeholder='Nova Data de Vencimento' 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)} 
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="ALTA">Alta</option>
        <option value="MEDIA">Média</option>
        <option value="BAIXA">Baixa</option>
      </select>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="DATA">Data</option>
        <option value="PRAZO">Prazo</option>
        <option value="LIVRE">Livre</option>
      </select>
      <button type='submit'>Atualizar</button>
    </form>
  );
};

export default TodoUpdateForm;
