//add eventlistener to do form
const form = document.querySelector("#itemForm"); //selectionner form
const itemInput = document.querySelector("#itemInput"); //selecttionner input box (form)
const itemPriority = document.getElementById("#prioritySelect");
const itemDescreption = document.querySelector("#itemDescreption");
const itemList = document.querySelector(".item-list");
const feedback = document.querySelector(".feedback");
const addItem = document.querySelector("#add-task");
//console.log(form,itemInput);

let todoItems = [];
//get item list

const getList = function(todoItems){
    itemList.innerHTML= "";
    todoItems.forEach(item => {
        itemList.insertAdjacentHTML("beforeend",
            `<div class="item my-5 d-flex 
                        justify-content-between 
                        align-items-center
                        border-bottom border-success-subtle">
                <div class="d-flex gap-1">
                    <h5 class="text-capitalize">${item.name}<p class="text-muted">${item.descreption ? item.descreption : "No description"}</p><span class="badge bg-${getPriorityColor(item.priority)}">${item.priority}</span></h5>
                    <br>
            
                </div>
                        <div class="item-icons">
                            <a href ="#"><i class="far fa-check-circle complete-item mx-2 
                                 item-icon text-success"></i></a>
                            <a href ="#"><i class="far fa-edit edit-item mx-2 
                                    item-icon text-secondary"></i></a>
                            <a href="#"><i class="bi bi-eye-fill show-item mx-2 
                                item-icon text-success"></i></a>
                            <a href="#"><i class="bi bi-stopwatch time-item mx-2 
                                item-icon text-danger"></i></a>
                            <a href ="#"><i class="far fa-times-circle  delete-item mx-2 
                                    item-icon text-danger"></i></a>
                        
                        </div>
            </div>
            `
            )
        
    });
    handleItem(item);
}
const getPriorityColor = (priority) => {
    if (priority === "high") return "danger";
    if (priority === "medium") return "warning";
    return "success"; // Low
};
//handle item > gerer les taches 
const handleItem =function (itemName){
    const items = itemList.querySelectorAll(".item-list");
    items.forEach((item)=>{
        if(item.querySelector(".item-name").textContent.trim().
        toLowerCase()===itemName.trim().toLowerCase()){
            //completed event
            item.querySelector(".complete-item").addEventListener("click",function(){
                let itemName = item.querySelector(".item-name");
                itemName.classList.toggle("completed")
            })

        }
        //edit task
        //remove

    }
    )
}
//add task
form.addEventListener("submit",function(e){
    e.preventDefault();
    const itemName=itemInput.value;
    const itemDescreption = document.getElementById("itemDescreption").value;
    const itemPriority = document.getElementById("prioritySelect").value;
    if (itemName.length===0){
        sendFeedback("Please enter valid value","text-danger"); 
    }else{
        const task = {
            name:itemName,
            descreption:itemDescreption,
            priority:itemPriority
        };
        todoItems.push(task);
        setLocalStorage(todoItems);
        getList(todoItems);
        sendFeedback("Task added successfully", "text-success");
    }
})
//send feedback 
function sendFeedback(text,className){
    feedback.classList.add(`${className}`);
    feedback.innerHTML=text;
    setTimeout(()=>{
    feedback.classList.remove(`${className}`);
    feedback.innerHTML=("Write task discreption");         
    }, 3000)

}
//local storage
const setLocalStorage=function(todoItems){
    localStorage.setItem("todoItems",JSON.stringify(todoItems));
};