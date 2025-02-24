var taskList = [];

document.getElementById("formNewTask").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting

    var value = document.getElementById("inputNewTask").value;

    var newTaskItem = {
        completed: false,
        text: value
    }; // Add the new task to the task list

    taskList.push(newTaskItem); // Add the new task to the task list

    localStorage.setItem("taskList", JSON.stringify(taskList)); // Save the data to local storage

    newTask(newTaskItem); // Create a new task
});

function getData() { // Function to get the data from local storage
    var data = JSON.parse(localStorage.getItem("taskList"));

    if (data && data.length > 0) {
        console.log("Data retrieved", data);
        taskList = data;
        data.forEach(element => { // Loop through the data and create a new task for each element
            newTask(element);
        });
    } else {
        console.log("No data found", data);
    }
}

getData();

function newTask(task) {

    // Create new elements on DOM
    var newTask = document.createElement("li");
    var newTaskLabel = document.createElement("label");
    var newTaskCheckbox = document.createElement("input");
    var newTaskText = document.createElement("span"); // Create a new span element to hold the task text
    var newTaskEdit = document.createElement("button"); // Create a new button element to edit the task
    var newTaskDelete = document.createElement("button"); // Create a new button element to delete the task

    // Set the type of the input elements 
    newTaskCheckbox.type = "checkbox";
    newTaskCheckbox.checked = task.completed; // Set the value of the new task checkbox element

    newTaskText.type = "text";
    newTaskText.innerText = task.text; // Set the value of the new task text element

    newTaskEdit.innerHTML = '<img class="icon" src="/imgs/icons8-edit-100.png"></img>'; // Set the value of the new task edit button to a pencil emoji
    newTaskEdit.disabled = task.completed; // Disable the edit button if the task is completed

    newTaskDelete.innerHTML = '<img class="icon" src="/imgs/icons8-delete-100.png"></img>'; // Set the value of the new task delete button to a garbage emoji

    newTaskCheckbox.addEventListener("change", () => {
        task.completed = !task.completed; // Toggle the completed status of the task
        localStorage.setItem("taskList", JSON.stringify(taskList)); // Save the data to local storage
        newTaskEdit.disabled = task.completed; // Disable the edit button if the task is completed
        console.log("Task completed", newTaskCheckbox.checked);
    });

    newTaskEdit.addEventListener("click", () => {
        newTaskCheckbox.disabled = true;
        newTaskEdit.disabled = true;
        newTaskText.contentEditable = true;
        newTaskText.focus();
    });

    // Add event listeners to the new task elements
    newTaskDelete.addEventListener("click", () => {
        newTask.remove();
    });

    newTaskText.addEventListener("focusout", () => {
        newTaskCheckbox.disabled = false;
        newTaskEdit.disabled = false;
        newTaskText.contentEditable = false;
    });

    newTaskText.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            newTaskCheckbox.disabled = false;
            newTaskEdit.disabled = false;
            newTaskText.contentEditable = false;
        }
    });

    // Append the new task elements to the DOM
    newTaskLabel.appendChild(newTaskCheckbox);
    newTaskLabel.appendChild(newTaskText);
    newTask.appendChild(newTaskLabel);
    newTask.appendChild(newTaskEdit);
    newTask.appendChild(newTaskDelete);

    // Append the new task to the list
    var List = document.getElementById("List");
    //taskList.appendChild(newTask); 
    // Append the new task to the list

    // Insert the new task at the beginning of the list
    List.insertBefore(newTask, List.firstChild);
}
