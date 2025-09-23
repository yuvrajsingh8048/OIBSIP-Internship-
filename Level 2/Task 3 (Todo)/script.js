document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const taskTableBody = document.querySelector('#task-table tbody');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks from the array
    function renderTasks() {
        taskTableBody.innerHTML = '';
        tasks.forEach((task, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.title}</td>
                <td>${task.description}</td>
                <td>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </td>`
            ;
            taskTableBody.appendChild(row);
        });
    }

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = {
            title: titleInput.value,
            description: descriptionInput.value
        };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        form.reset();
    });

    // Handle task deletion
    taskTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    });

    // Initial render
    renderTasks();
});