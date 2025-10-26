"use client";

import { useState } from 'react';
import styles from './TodoForm.module.css';

export default function TodoForm({ addTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="请输入待办事项..."
      />
      <button type="submit" className={styles.button}>
        添加
      </button>
    </form>
  );
}