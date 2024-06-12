const taskInput = document.getElementById('task-input');
const categorySelect = document.getElementById('category-select');
const dueDateInput = document.getElementById('due-date-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskListUl = document.getElementById('task-list-ul');

let tasks = [];

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    const category = categorySelect.value;
    const dueDate = dueDateInput.value;
    const priority = getPriority();

    if (taskText!== '') {
        const task = {
            text: taskText,
            category: category,
            dueDate: dueDate,
            priority: priority,
            completed: false
        };

        tasks.push(task);
        renderTasks();
        taskInput.value = '';
    }
}

function getPriority() {
    const priorityRadios = document.getElementsByName('priority');
    for (let i = 0; i < priorityRadios.length; i++) {
        if (priorityRadios[i].checked) {
            return priorityRadios[i].value;
        }
    }
    return '';
}

function renderTasks() {
    const taskListUl = document.getElementById('task-list-ul');
    taskListUl.innerHTML = '';
  
    // Group tasks by category
    const categories = {};
    tasks.forEach((task) => {
      if (!categories[task.category]) {
        categories[task.category] = [];
      }
      categories[task.category].push(task);
    });
  
    // Render tasks by category
    Object.keys(categories).forEach((category) => {
      const categoryHeader = document.createElement('h2');
      categoryHeader.textContent = category;
      taskListUl.appendChild(categoryHeader);
  
      const categoryTasks = categories[category];
      categoryTasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = 'task-list-item';
        li.innerHTML = `
          <span class="task-text">${task.text}</span>
          <span class="task-priority">${task.priority}</span>
          <span class="task-due-date">${task.dueDate}</span>
          <button class="complete-btn">Complete</button>
          <button class="delete-btn">Delete</button>
        `;
        taskListUl.appendChild(li);
  
        const completeBtn = li.querySelector('.complete-btn');
        completeBtn.addEventListener('click', () => {
          task.completed = !task.completed;
          renderTasks();
        });
  
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
          tasks.splice(tasks.indexOf(task), 1);
          renderTasks();
        });
      });
    });
  }