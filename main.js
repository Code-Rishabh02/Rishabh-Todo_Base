let tasks = [];
document.addEventListener('DOMContentLoaded', (event) => {
    window.toggleTaskCompletion = (index) => {
        tasks[index].completed = !tasks[index].completed;
        updateTasksList();
        updateStats();
        saveTasks();
    };
    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        updateTasksList();
        updateStats();
        saveTasks();
    };
    window.editTask = (index) => {
        const newText = prompt("Edit task:", tasks[index].text);
        if (newText !== null && newText.trim() !== '') {
            tasks[index].text = newText.trim();
            updateTasksList();
            updateStats();
            saveTasks();
        }
    };
    const animation =()=>{
        const defaults = {
            spread: 360,
            ticks: 50,
            gravity: 0,
            decay: 0.94,
            startVelocity: 30,
            shapes: ["star"],
            colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
          };
          
          function shoot() {
            confetti({
              ...defaults,
              particleCount: 40,
              scalar: 1.2,
              shapes: ["star"],
            });
          
            confetti({
              ...defaults,
              particleCount: 10,
              scalar: 0.75,
              shapes: ["circle"],
            });
          }
          
          setTimeout(shoot, 0);
          setTimeout(shoot, 100);
          setTimeout(shoot, 200);
    }
    const saveTasks=()=>{
        localStorage.setItem('tasks',JSON.stringify(tasks))
    }
    const addTask = () => {
        const taskInput = document.getElementById("taskInput");
        if (taskInput) {
            const taskValue = taskInput.value.trim();
            updateStats();
            if (taskValue) {
                tasks.push({ text: taskValue, completed: false });
                updateTasksList();
                taskInput.value = '';
                saveTasks();
            }
        }
    };
    const updateStats=()=>{
        const completedTasks=tasks.filter(task=>task.completed).length
        const totalTasks= tasks.length
        const progress=(completedTasks/totalTasks)*100
        const progressBar=document.getElementById('progress')
        progressBar.style.width=`${progress}%`
        document.getElementById('numbers').innerText=`${completedTasks}/${totalTasks}`
        if(tasks.length && completedTasks=== totalTasks){
            animation();
        }
    }
    const updateTasksList = () => {
        const taskList = document.getElementById('taskList');
        if (taskList) {
            taskList.innerHTML = '';
            tasks.forEach((task, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <div class="taskItem">
                        <div class="task ${task.completed ? 'completed' : ''}">
                            <input type="checkbox" class="checkbox" 
                                ${task.completed ? 'checked' : ''} 
                                onchange="toggleTaskCompletion(${index})" />
                            <p>${task.text}</p>
                        </div>
                        <div class="icons">
                            <img src="document-editor.png" 
                                style="width: 22px; height: 25px; padding-bottom: 1px" 
                                class="i1" 
                                onclick="editTask(${index})" />
                            <img src="delete-button.png" 
                                style="width: 28px; height: 28px; padding-top: 2px" 
                                class="i2" 
                                onclick="deleteTask(${index})" />
                        </div>
                    </div>
                `;
                taskList.append(listItem);
            });
        }
    };
    const storedTasks= JSON.parse(localStorage.getItem('tasks'))
        if(storedTasks){
            storedTasks.forEach((task)=> tasks.push(task));
            updateTasksList();
            updateStats();

        }
    const element = document.getElementById('newTask');
    if (element) {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            addTask();
        });
    }
});
