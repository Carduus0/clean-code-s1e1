//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

let taskInput = document.querySelector(".new-task__input"); //Add a new task.
let addButton = document.querySelector(".task__add"); //first button
let incompleteTaskHolder = document.querySelector(".incompleted-tasks"); //ul of #incompleteTasks
let completedTasksHolder = document.querySelector(".completed-tasks"); //completed-tasks

//New task list item
const createNewTaskElement = function (taskString) {
  let listItem = document.createElement("li");
  listItem.className = "todo__item";
  //input (checkbox)
  let checkBox = document.createElement("input"); //checkbx
  //label
  let label = document.createElement("label"); //label
  //input (text)
  let editInput = document.createElement("input"); //text
  //button.edit
  let editButton = document.createElement("button"); //edit button

  //button.delete
  let deleteButton = document.createElement("button"); //delete button
  let deleteButtonImg = document.createElement("img"); //delete button image

  label.innerText = taskString;
  label.className = "todo__label"; //task
  //Each elements, needs appending
  checkBox.type = "checkbox";
  checkBox.className = "todo__checkbox";
  editInput.type = "text";
  editInput.className = "todo__input--hidden"; //task
  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "task__edit"; //edit
  deleteButton.className = "task__delete"; //delete
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "delete__cross";
  deleteButtonImg.alt = "button delete";
  deleteButton.appendChild(deleteButtonImg);
  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

//Edit an existing task.

const editTask = function () {
  let listItem = this.parentNode;

  let editInput = listItem.querySelector(".todo__input--hidden");
  let label = listItem.querySelector(".todo__label");
  let editBtn = listItem.querySelector(".task__edit");
  let containsClass = listItem.classList.contains("task__edit-mode");
  //If class of the parent is .editmode
  if (containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle(".task__edit-mode");
};

//Delete task.
const deleteTask = function () {
  console.log("Delete Task...");

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

//Mark task completed
const taskCompleted = function () {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  let listItem = this.parentNode;
  let completLabel = listItem.classList.contains("todo__label");
  completLabel.className = "completed-tasks__label";
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  let listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

const ajaxRequest = function () {
  console.log("AJAX Request");
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  //select ListItems children
  let checkBox = taskListItem.querySelector(".todo__checkbox");
  let editButton = taskListItem.querySelector(".task__edit");
  let deleteButton = taskListItem.querySelector(".task__delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
