function displayTasks() {
    var tasks = localStorage.getItem("tasks")
    var statistic_box = document.getElementById("stats-box")
    document.body.innerHTML =
        `
    <h1 class="header">To Do App</h1>
    <div class="add-tasks">
        <input type="text" placeholder="Add task">
        <button id="add-btn">Add</button>
    </div>
    <div class="statistics-box" id="stats-box">
        <div>Tasks Completed: ${localStorage.getItem("tasks_completed") ? localStorage.getItem("tasks_completed") : "0"}</div>
        <div>Tasks Created: ${localStorage.getItem("tasks_added") ? localStorage.getItem("tasks_added") : "0"}</div>
        <div>Tasks Completion Rate: ${localStorage.getItem("tasks_completed") ? ((parseInt(localStorage.getItem("tasks_completed")) / parseInt(localStorage.getItem("tasks_added"))) * 100).toFixed(2)+"%" : "0%"}</div>
    </div>
    `
    if (tasks) {
        tasks = tasks.split(",")
        html =
            `<div class="task-container" id="tsk-cont">`
        tasks.forEach((task, index) => {
            html +=
                `
            <div class="task-card">
                <h3 class="task">${task}</h3>
                <div class="btn-container">
                    <input type="hidden" value="${index}">
                    <button class="complete" id="complete-btn">Complete</button>
                    <button class="delete" id="delete-btn">Delete</button>
                </div>
            </div>
            `
        })
        html +=
            `
        </div>
        <h3 class="footer">&copy;2024, Obaro</h3>
        `
        document.body.innerHTML += html
    } else {
        document.body.innerHTML =
            `
    <h1 class="header"> To Do App</h1>
    <div class="add-tasks">
        <input type="text" placeholder="Add task">
        <button id="add-btn">Add</button>
    </div>
    <h2 class="no-tasks" id="">There are no Tasks</h2>
    <h3 class="footer">&copy;2024, Obaro</h3>
    <div class="statistics-box" id="stats-box">
        <div>Tasks Completed: ${localStorage.getItem("tasks_completed") ? localStorage.getItem("tasks_completed") : "0"}</div>
        <div>Tasks Created: ${localStorage.getItem("tasks_added") ? localStorage.getItem("tasks_added") : "0"}</div>
        <div>Tasks Completion Rate: ${localStorage.getItem("tasks_completed") ? ((parseInt(localStorage.getItem("tasks_completed")) / parseInt(localStorage.getItem("tasks_added"))) * 100).toFixed(2)+"%" : "0%"}</div>
    </div>
    `
    }
}

displayTasks()

const addBtn = document.getElementById('add-btn')
addBtn.onclick = (e) => {
    const taskInput = e.target.parentElement.children[0]
    if (taskInput.value) {
        const task = taskInput.value
        var tasks = localStorage.getItem("tasks")
        var tasks_added = localStorage.getItem("tasks_added")
        if (tasks) {
            tasks = tasks + `,${task}`
        } else {
            tasks = `${task}`
        }
        localStorage.setItem("tasks", tasks)
        if (tasks_added) {
            tasks_added = parseInt(tasks_added) + 1
        } else {
            tasks_added = 1
        }
        localStorage.setItem("tasks_added", tasks_added)
    }
    localStorage.setItem("tasks_added", tasks_added)
    displayTasks()
    location.reload()
}


const delBtns = document.getElementsByClassName('delete')
Array.from(delBtns).forEach((delBtn) => {
    delBtn.onclick = (e) => {
        var id = e.target.parentElement.children[0].value
        var tasks = localStorage.getItem("tasks")
        tasks = tasks.split(",")
        tasks = tasks.filter((task, index) => index != id)
        localStorage.setItem("tasks", tasks)
        displayTasks()
        location.reload()
    }
})

const completeBtns = document.getElementsByClassName('complete')
Array.from(completeBtns).forEach((completeBtn) => {
    completeBtn.onclick = (e) => {
        var id = e.target.parentElement.children[0].value
        var tasks = localStorage.getItem("tasks")
        tasks = tasks.split(",")
        tasks = tasks.filter((task, index) => index != id)
        var tasks_completed = localStorage.getItem("tasks_completed")
        if (tasks_completed) {
            tasks_completed = parseInt(tasks_completed) + 1
        } else {
            tasks_completed = 1
        }
        localStorage.setItem("tasks_completed", tasks_completed)
        localStorage.setItem("tasks", tasks)
        displayTasks()
        location.reload()
    }
})

