//add eventlistener to do form
const form = document.querySelector("#itemForm");
const itemInput = document.querySelector("#itemInput");
const itemPriority = document.getElementById("prioritySelect");
const itemDescreption = document.querySelector("#itemDescreption");
const itemList = document.querySelector(".item-list");
const feedback = document.querySelector(".feedback");
const addItem = document.querySelector("#add-task");
const clearbtn = document.querySelector(".clearbtn");
const completeBtn = document.querySelectorAll(".complete-item");

let todoItems = [];

//get item list
const getList = function(todoItems) {
    itemList.innerHTML = "";
    todoItems.forEach((item, index) => {
        itemList.insertAdjacentHTML("beforeend",
            `<div class="item my-5 d-flex justify-content-between align-items-center border-bottom border-success-subtle">
                <div class="d-flex gap-1">
                    <h5 class="item-name text-capitalize">${item.name}
                    <p class="text-muted">${item.descreption ? item.descreption : "No description"}</p>
                    <span class="badge bg-${getPriorityColor(item.priority)}">${item.priority}</span></h5>
                </div>
                <div class="item-icons">
                    <a href="#" class="edit-item mx-2 item-icon text-secondary" data-index="${index}">
                        <i class="far fa-edit"></i>
                    </a>
                    <a href ="#"><i class="far fa-check-circle complete-item mx-2 
                                 item-icon text-success"></i>
                    </a>
                    <a href="#"><i class="bi bi-stopwatch time-item mx-2 
                                item-icon text-danger"></i></a>
                    <a href="#" class="delete-item mx-2 item-icon text-danger" data-index="${index}">
                        <i class="far fa-times-circle"></i>
                    </a>
                </div>
            </div>`
        );
    });
    handleItem();
}

const getPriorityColor = (priority) => {
    if (priority === "high") return "danger";
    if (priority === "medium") return "warning";
    if (priority === "low") return "success";
    return "success"; // Low
};

// Handle item (edit, complete,delete, timer)
const handleItem = function(itemName) {
    const items = itemList.querySelectorAll(".item");

    items.forEach((item) => {
        const items = itemList.querySelectorAll(".item");
        items.forEach((item)=>{
            //completed event
            let taskNameElement = item.querySelector(".item-name");
            if(taskNameElement) {
                item.querySelector(".complete-item").addEventListener("click", function () {
                    taskNameElement.classList.toggle("completed");
            })
        }
        setLocalStorage(todoItems);
        
                }
        )
        
        const editIcon = item.querySelector(".edit-item");
        if (editIcon) {
            editIcon.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                const task = todoItems[index];

                // remplire le champ
                itemInput.value = task.name;
                itemDescreption.value = task.descreption;
                itemPriority.value = task.priority;

                // Changer button "Edit task"
                addItem.innerHTML = "Edit task";

                // modifier tach "Edit task" button
                addItem.onclick = function() {
                    task.name = itemInput.value;
                    task.descreption = itemDescreption.value;
                    task.priority = itemPriority.value;

                    // m a j la liste 
                    setLocalStorage(todoItems);
                    getList(todoItems);

                    // Renesialiser le button et les champs
                    addItem.innerHTML = "Add task";
                    itemInput.value = "";
                    itemDescreption.value = "";
                    itemPriority.value = "low";
                };
            });
        }

            //suppression de tache
        const deleteIcon = item.querySelector(".delete-item");
        if (deleteIcon) {
            deleteIcon.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                todoItems.splice(index, 1); // Remove the task
                setLocalStorage(todoItems);
                getList(todoItems);
            });
        }
    }
);
}


// Add task
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const itemName = itemInput.value;
    const itemDescreptionValue = itemDescreption.value;
    const itemPriorityValue = itemPriority.value;

    if (itemName.length === 0) {
        sendFeedback("Please enter valid value", "text-danger");
    } else {
        const task = {
            name: itemName,
            descreption: itemDescreptionValue,
            priority: itemPriorityValue
        };
        todoItems.push(task);
        setLocalStorage(todoItems);
        getList(todoItems);
        sendFeedback("Task added successfully", "text-success");

        
        itemInput.value = "";
        itemDescreption.value = "";
        itemPriority.value = "low";
    }
});

// Send feedback
function sendFeedback(text, className) {
    feedback.classList.add(className);
    feedback.innerHTML = text;
    setTimeout(() => {
        feedback.classList.remove(className);
        feedback.innerHTML = "Write task description";
    }, 3000);
}
//clear all 
clearbtn.onclick=()=>
    {
    confirm("Are you sure to clear list ?") &&
    (todoItems=[], localStorage.clear,getList(todoItems));
};



// Local storage
const setLocalStorage = function(todoItems) {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
};

const getLocalStorage = function() {
    const todoStorage = localStorage.getItem("todoItems");
    if (todoStorage === null) {
        todoItems = [];
    } else {
        todoItems = JSON.parse(todoStorage);
        getList(todoItems);
    }
};

getLocalStorage();
