const keyName = "task";
const addTaskBtn = document.getElementById("add-task");
const deleteTaskBtn = document.getElementById("clear-tasks");
const taskElement = document.getElementById("new-task");
const deleteTaskBtnAElement = document.getElementById("a-remove");
const deleteTaskBtnIElement = document.getElementById("icon-remove");
const ulElement = document.getElementById("tasks");
const filterElement = document.getElementById("filter-wrapper");

function makeTasks(text) {
  const liElement = document.createElement("li");
  const aRemove = document.createElement("a");
  const iconRemove = document.createElement("i");
  iconRemove.className = "material-icons";
  iconRemove.textContent = "remove_circle";
  aRemove.href = "#";
  aRemove.className = "secondary-content";
  aRemove.appendChild(iconRemove);
  liElement.className = "collection-item";
  liElement.textContent = text;
  liElement.appendChild(aRemove);
  ulElement.appendChild(liElement);
}

function addTask() {
  const taskValue = taskElement.value;
  const newTaskValue = "new task";

  if (!taskValue) {
    alert("please put in a value");
    return;
  }

  makeTasks(taskValue);
  const taskArray = [taskValue];
  taskArray.push(newTaskValue);
  localStorage.setItem(keyName, JSON.stringify(taskArray));
  taskElement.value = "";
}

function addTaskByEnter(e) {
  const taskElementLength = taskElement.value.length;

  if (e.keyCode === 13) {
    addTaskBtn.click();
    e.preventDefault();
  }

  if (taskElement.value === " ") {
    alert("please don't start you task with a space");

    taskElement.value = "";
  }

  if (taskElementLength > 29) {
    alert("please chose a smaller amount of text to make your task");
  }
}

function deleteTask(e) {
  if (e.target.tagName === "I") {
    e.target.parentElement.parentElement.remove();
  }
}

function deleteAllTasks() {
  let ulLength = document.getElementById("tasks").childElementCount;
  if (ulLength === 0) {
    alert("Add some tasks");
  }

  while (ulLength > 0) {
    ulElement.removeChild(ulElement.childNodes[0]);
    ulLength = document.getElementById("tasks").childElementCount;
  }
}

function filterTasks() {
  const filterValue = document.getElementById("fiter").value;

  console.log(filterValue);
}

function recoverTasks() {
  makeTasks(localStorage.getItem(keyName));
}

document.addEventListener("DOMContentLoaded", recoverTasks);
filterElement.addEventListener("keyup", filterTasks);
ulElement.addEventListener("click", deleteTask);
deleteTaskBtn.addEventListener("click", deleteAllTasks);
taskElement.addEventListener("keyup", addTaskByEnter);
addTaskBtn.addEventListener("click", addTask);
