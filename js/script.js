const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const deleteButton = document.querySelectorAll('.trash-btn');

const addListOfTasksToDOM = async () => {
    const tasks = await getListOfTasks();
    todoList.innerHTML = '';
    tasks.forEach(task => {
        const todoItem = document.createElement('li');
        todoItem.setAttribute('id', 'li_' + task._id);
        todoItem.classList.add('todo');

        const checkBox = document.createElement('input');
        checkBox.classList.add('complete-task');
        checkBox.setAttribute('value', task._id);
        checkBox.setAttribute('id', task._id);
        checkBox.setAttribute('type', 'checkbox');
        todoItem.appendChild(checkBox);

        const todoSpan = document.createElement('span');
        todoSpan.innerText = task.description;
        todoSpan.classList.add('todo-item');
        todoSpan.setAttribute('id', task._id);
        todoItem.appendChild(todoSpan);

        if (task.done == true) {
            todoSpan.classList.add('checked-task');
            checkBox.setAttribute('checked', true);
        }

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        trashButton.setAttribute('value', task._id);
        todoItem.appendChild(trashButton);
        todoList.appendChild(todoItem);

        trashButton.addEventListener('click', deleteTask);
        checkBox.addEventListener('click', checkTask);
        todoSpan.addEventListener('click', editTask);
    });
};

const addNewTask = async (todoButton) => {
    todoButton.preventDefault();
    await postTaskItem(todoInput.value);
    todoInput.value = '';
    addListOfTasksToDOM();
};

const deleteTask = async (trashButton) => {
    await deleteTaskItem(trashButton.target.value);
    addListOfTasksToDOM();
};

const checkTask = async (checkMark) => {
    const checkBox = document.getElementById(checkMark.target.id);
    if (checkBox.checked) {
        await editCheckTask(checkBox.value, true);
    } else {
        await editCheckTask(checkBox.value, false);
    }
    addListOfTasksToDOM();
};

const editTask = async (span) => {
    const spanTodo = span.target;
    const listItem = document.getElementById('li_' + spanTodo.id);
    const editField = document.createElement('input');
    editField.setAttribute('type', 'text');
    editField.setAttribute('value', spanTodo.innerHTML);
    editField.setAttribute('id', 'input_' + spanTodo.id);

    const saveButton = document.createElement('button');
    saveButton.setAttribute('value', spanTodo.id);
    saveButton.innerHTML = '<i class="fas fa-save"></i>';
    saveButton.classList.add('save-btn');
    spanTodo.innerHTML = '';

    spanTodo.append(editField);
    listItem.append(saveButton);

    saveButton.addEventListener('click', saveEditTask)
};

const saveEditTask = async (saveButton) => {
    const taskId = saveButton.target.value;
    const editField = document.getElementById('input_' + taskId).value;
    await editSavedTask(taskId, editField);
    addListOfTasksToDOM();
};

addListOfTasksToDOM();
todoButton.addEventListener('click', addNewTask);