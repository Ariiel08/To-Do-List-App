"use strict";

var tempLabel;
var tempInput;


function onChecked(e) {
    let isCompleted = e.checked;

    let label = e.parentElement.getElementsByTagName("label")[0];
    let buttonsContainer = e.parentElement.querySelector(".buttons-container");

    if(isCompleted){
        label.innerHTML = `<del>${label.innerHTML}</del>`;
        buttonsContainer.firstElementChild.classList.add("hidden");
    }else{
        let labelValue = label.lastElementChild.innerHTML;
        label.removeChild(label.lastElementChild);
        label.innerHTML = labelValue;
        buttonsContainer.firstElementChild.classList.remove("hidden");
    }
    
}

function addTask(e){
    let body = document.getElementsByTagName("body")[0];
    let taskContainer = body.firstElementChild.querySelector(".task-container");
    let noTasks = taskContainer.querySelector(".no-tasks");

    if(e.tagName.toLowerCase() === "input"){
        let btn = document.getElementById("addButtonTask");

        e.addEventListener("keyup", ({key}) => {
            if(e.value !== ""){
                btn.disabled = false;
            }else{
                btn.disabled = true;
            }

            if(key === "Enter"){
                if(e.value !== ""){
                    const task = document.createElement("div");
                    const outerDiv = document.createElement("div");
    
                    outerDiv.classList.add("group");
    
                    task.classList.add("task-element", "flex", "gap-8", "items-center","group-hover:bg-gray-600", "rounded-md", "px-2", "py-1", "cursor-pointer");
    
                    let uuid = crypto.randomUUID();
    
                    task.innerHTML = `<input class="cursor-pointer" onclick="onChecked(this)" type="checkbox" id="${uuid}">
                                        <label class="overflow-hidden break-words w-full cursor-pointer" for="${uuid}">${e.value}</label>

                                        <div class="buttons-container flex gap-4 invisible group-hover:visible">
                                            <button type="button" onclick="editTask(this)" title="edit-button" class="hover:text-blue-300 text-xl"><ion-icon name="create-outline"></ion-icon></button>
                                            <button type="button" onclick="deleteTask(this)" title="remove-button" class="hover:text-red-600 text-lg"><ion-icon name="trash-outline"></ion-icon></button>
                                        </div>

                                        <div class="buttons-container-2 flex gap-4 invisible group-hover:visible hidden">
                                            <button type="button" onclick="editTask(this)" title="confirm-button" class="hover:transition ease-in-out delay-75 duration-75 hover:text-blue-300 text-lg"><ion-icon name="checkmark-outline"></ion-icon></button>
                                            <button type="button" title="cancel-button" class="hover:transition ease-in-out delay-75 duration-75 hover:text-red-600 text-xl"><ion-icon name="close-outline"></ion-icon></button>
                                        </div>
                                    `
                                    
                    outerDiv.appendChild(task);                  
    
                    document.querySelector(".task-container").appendChild(outerDiv);


                    if(taskContainer.querySelector(".task-element") === undefined || taskContainer.querySelector(".task-element") === null){
                        noTasks.classList.remove("hidden");
                    }else{
                        noTasks.classList.add("hidden");
                    } 
    
                    e.value = "";
                    btn.disabled = true;
                }
                
            }
        })
    }else{
        let input = document.getElementById("addInputTask");

        if(input.value !== ""){
            const task = document.createElement("div");
            const outerDiv = document.createElement("div");

            outerDiv.classList.add("group");

            task.classList.add("flex", "gap-8", "items-center","group-hover:bg-gray-600", "rounded-md", "px-2", "py-1", "cursor-pointer");

            let uuid = crypto.randomUUID();

            task.innerHTML = `<input class="cursor-pointer" onclick="onChecked(this)" type="checkbox" id="${uuid}">
                                        <label class="overflow-hidden break-words w-full cursor-pointer" for="${uuid}">${e.value}</label>

                                        <div class="buttons-container flex gap-4 invisible group-hover:visible">
                                            <button type="button" onclick="editTask(this)" title="edit-button" class="hover:text-blue-300 text-xl"><ion-icon name="create-outline"></ion-icon></button>
                                            <button type="button" onclick="deleteTask(this)" title="remove-button" class="hover:text-red-600 text-lg"><ion-icon name="trash-outline"></ion-icon></button>
                                        </div>

                                        <div class="buttons-container-2 flex gap-4 invisible group-hover:visible hidden">
                                            <button type="button" onclick="editTask(this)" title="confirm-button" class="hover:transition ease-in-out delay-75 duration-75 hover:text-blue-300 text-lg"><ion-icon name="checkmark-outline"></ion-icon></button>
                                            <button type="button" title="cancel-button" class="hover:transition ease-in-out delay-75 duration-75 hover:text-red-600 text-xl"><ion-icon name="close-outline"></ion-icon></button>
                                        </div>
                                    `
                            
            outerDiv.appendChild(task);                  

            document.querySelector(".task-container").appendChild(outerDiv);

            if(taskContainer.querySelector(".task-element") === undefined || taskContainer.querySelector(".task-element") === null){
                noTasks.classList.remove("hidden");
            }else{
                noTasks.classList.add("hidden");
            } 

            input.value = "";
            e.disabled = true;
        }
    }
    
}

function deleteTask(e){
    let body = document.getElementsByTagName("body")[0];
    let taskContainer = body.firstElementChild.querySelector(".task-container");
    let noTasks = taskContainer.querySelector(".no-tasks");

    e.parentElement.parentElement.remove();

    if(taskContainer.querySelector(".task-element") === undefined || taskContainer.querySelector(".task-element") === null){
        noTasks.classList.remove("hidden");
    }else{
        noTasks.classList.add("hidden");
    } 
}

function editTask(e){
    
    if(e.title === "edit-button"){
        let buttonsContainer = e.parentElement;
        let buttonsContainer2 = e.parentElement.parentElement.querySelector(".buttons-container-2");

        buttonsContainer.classList.add("hidden");
        buttonsContainer2.classList.remove("hidden");

        let label = e.parentElement.parentElement.getElementsByTagName("label")[0];

        let input = document.createElement("input");
        input.title = "Task name";
        input.value = label.textContent;
        input.classList.add("input-edit", "bg-gray-700", "group-hover:bg-gray-600", "border-b", "focus:outline-none", "w-full");
        input.type = "text";

        tempLabel = label;
        label.replaceWith(input);

        input.focus();

        let clicked;

        buttonsContainer2.firstElementChild.addEventListener("mousedown", () => {
            clicked = true;
        });

        input.addEventListener("focusout", () => {
            if(!clicked){
            input.replaceWith(tempLabel);

            buttonsContainer.classList.remove("hidden");
            buttonsContainer2.classList.add("hidden");
            }
        })

        tempInput = input;

        input.addEventListener("keyup", ({key}) => {
            if(key === "Enter"){
                if(input.value !== ""){
                    tempLabel.textContent = input.value;
                    input.blur();
                    input.replaceWith(tempLabel);
                }
            }
        });
    }else{

        let buttonsContainer = e.parentElement.parentElement.querySelector(".buttons-container");
        let buttonsContainer2 = e.parentElement;

        buttonsContainer.classList.remove("hidden");
        buttonsContainer2.classList.add("hidden");

        let input = tempInput;

        if(input.value !== ""){
            tempLabel.textContent = input.value;
            input.blur();
            input.replaceWith(tempLabel);
        }
    }
    
}