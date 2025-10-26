// 获取DOM元素
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const tasksCounter = document.getElementById('tasks-counter');
const clearCompletedButton = document.getElementById('clear-completed');

// 待办事项数组
let todos = [];

// 初始化应用
function init() {
    // 从本地存储加载待办事项
    loadTodos();
    // 添加事件监听器
    addEventListeners();
}

// 从本地存储加载待办事项
function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        renderTodos();
    }
}

// 保存待办事项到本地存储
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 添加事件监听器
function addEventListeners() {
    // 添加待办事项按钮点击事件
    addButton.addEventListener('click', addTodo);
    
    // 输入框回车事件
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    // 清除已完成按钮点击事件
    clearCompletedButton.addEventListener('click', clearCompleted);
}

// 添加待办事项
function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText === '') {
        alert('请输入待办事项内容！');
        return;
    }
    
    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };
    
    todos.push(todo);
    todoInput.value = '';
    
    renderTodos();
    saveTodos();
}

// 删除待办事项
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    
    renderTodos();
    saveTodos();
}

// 切换待办事项完成状态
function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }
        return todo;
    });
    
    renderTodos();
    saveTodos();
}

// 清除已完成的待办事项
function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    
    renderTodos();
    saveTodos();
}

// 渲染待办事项列表
function renderTodos() {
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        if (todo.completed) {
            todoItem.classList.add('completed');
        }
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(todo.id));
        
        const todoText = document.createElement('span');
        todoText.classList.add('todo-text');
        todoText.textContent = todo.text;
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = '删除';
        deleteButton.addEventListener('click', () => deleteTodo(todo.id));
        
        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteButton);
        
        todoList.appendChild(todoItem);
    });
    
    // 更新计数器
    tasksCounter.textContent = `总计: ${todos.length} 项`;
}

// 初始化应用
document.addEventListener('DOMContentLoaded', init);
