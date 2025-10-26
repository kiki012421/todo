"use client";

import { useState, useEffect } from 'react';
import TodoList from '@/components/TodoList';
import TodoForm from '@/components/TodoForm';
import styles from './page.module.css';

export default function Home() {
  const [todos, setTodos] = useState([]);

  // 从本地存储加载待办事项
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // 保存待办事项到本地存储
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 添加待办事项
  const addTodo = (text) => {
    if (text.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    
    setTodos([...todos, newTodo]);
  };

  // 删除待办事项
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 切换待办事项完成状态
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 清除已完成的待办事项
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>待办事项列表</h1>
        <TodoForm addTodo={addTodo} />
        <TodoList 
          todos={todos} 
          toggleTodo={toggleTodo} 
          deleteTodo={deleteTodo} 
        />
        <div className={styles.stats}>
          <span>总计: {todos.length} 项</span>
          <button 
            className={styles.clearButton}
            onClick={clearCompleted}
          >
            清除已完成
          </button>
        </div>
      </div>
    </main>
  );
}