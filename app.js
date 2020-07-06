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

  if (!taskValue) {
    alert("please put in a value");
    return;
  }

  makeTasks(taskValue);
  const oldTask = localStorage.getItem(keyName);
  const taskArray = oldTask ? JSON.parse(oldTask) : new Array();
  taskArray.push(taskValue);
  localStorage.setItem(keyName, JSON.stringify(taskArray));
  taskElement.value = "";
}

function addTaskByEnter(e) {
  if (e.keyCode === 13) {
    addTaskBtn.click();
    e.preventDefault();
  }

  if (taskElement.value === " ") {
    alert("please don't start you task with a space");

    taskElement.value = "";
  }

  const taskElementLength = taskElement.value.length;

  if (taskElementLength > 29) {
    alert("please chose a smaller amount of text to make your task");
  }
}

function deleteTask(e) {
  if (e.target.tagName === "I") {
    const deleteTaskText =
      e.target.parentElement.parentElement.firstChild.textContent;
    const taskArray = JSON.parse(localStorage.getItem(keyName));
    const filterTaskArray = taskArray.filter(function (task) {
      return task !== deleteTaskText;
    });
    localStorage.setItem(keyName, JSON.stringify(filterTaskArray));

    e.target.parentElement.parentElement.remove();
  }
}
function deleteAllTasks() {
  let ulLength = document.getElementById("tasks").childElementCount;

  while (ulLength > 0) {
    ulElement.removeChild(ulElement.childNodes[0]);
    ulLength = document.getElementById("tasks").childElementCount;
  }

  localStorage.removeItem(keyName);
}

function filterTasks() {
  const filterValue = document.getElementById("fiter").value;

  console.log(filterValue);
}

function recoverTasks() {
  const taskString = localStorage.getItem(keyName);
  if (taskString) {
    const taskArray = JSON.parse(taskString);
    taskArray.forEach(makeTasks);
  }
}

document.addEventListener("DOMContentLoaded", recoverTasks);
filterElement.addEventListener("keyup", filterTasks);
ulElement.addEventListener("click", deleteTask);
deleteTaskBtn.addEventListener("click", deleteAllTasks);
taskElement.addEventListener("keyup", addTaskByEnter);
addTaskBtn.addEventListener("click", addTask);
