import React, { useState } from 'react';
import api from '../services/api';

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('ALTA');
  const [type, setType] = useState('DATA');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Data antes de enviar:', dueDate);
    console.log(title, description, dueDate, priority, type, completed);
    if (title && description) {
      try {
        const response = await api.post('/tasks', { 
          title, 
          description, 
          dueDate: type === 'DATA' ? dueDate : null, 
          dueInDays: type === 'PRAZO' ? 0 : null, 
          priority,
          type,
          completed
        });
        addTodo(response.data);
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('ALTA');
        setType('DATA');
        setCompleted(false);
      } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
      }
    }
  };

  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
      <input 
        type='text' 
        placeholder='Título da tarefa' 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <input 
        type='text' 
        placeholder='Descrição da tarefa' 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <input 
        type='date' 
        placeholder='Data de Vencimento' 
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
      <button type='submit'>Adicionar</button>
    </form>
  );
};

export default TodoForm;
