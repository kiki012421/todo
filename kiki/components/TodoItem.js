"use client";

import styles from './TodoItem.module.css';

export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className={`${styles.item} ${todo.completed ? styles.completed : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className={styles.checkbox}
      />
      <span className={styles.text}>{todo.text}</span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className={styles.deleteButton}
      >
        删除
      </button>
    </li>
  );
}