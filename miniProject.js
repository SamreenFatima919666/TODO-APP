const inputTask = document.getElementById("task");
const button = document.getElementById("btn");
const taskList = document.getElementById("task-list");
 

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(tasks);

renderTasks();

button.addEventListener("click", addTask);
function addTask(){
    const taskText = inputTask.value.trim();
if (taskText === ""){
 Swal.fire({
    title: "Empty Task!",
    text: "Please enter your task.",
    icon: "warning",
    confirmButtonText: "Okay",
    confirmButtonColor: "#8B5CF6",
    background: "#181820",
    color: "#F5F5F5"
});
    return;
}


const task ={
    text : taskText,
    completed : false
}
tasks.push(task)
inputTask.value = "";
saveTask();
renderTasks();
}


function renderTasks(){
    taskList.innerHTML = "";

    tasks.forEach(function(task , index){
        const li = document.createElement("li");
        const taskText = document.createElement("p");
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.classList.add("completed");
        }

const buttonDiv = document.createElement("div");
const doneBtn = document.createElement("button");
doneBtn.textContent = "Done";
doneBtn.addEventListener("click", function(){
    tasks[index].completed= !tasks[index].completed;
    saveTask();
renderTasks();
})
const deletebtn = document.createElement("button");
deletebtn.textContent = "Delete";

deletebtn.addEventListener("click", function(){
    tasks.splice(index, 1);
    saveTask();
    renderTasks();
})
buttonDiv.appendChild(doneBtn);
buttonDiv.appendChild(deletebtn);
li.appendChild(taskText);
li.appendChild(buttonDiv);
taskList.appendChild(li);
    })
} 

function saveTask(){
    const data = JSON.stringify(tasks);
localStorage.setItem("tasks" , data);
}