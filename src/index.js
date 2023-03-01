"use strict";

function onChecked(e) {
    let isCompleted = e.checked;

    let label = e.parentElement.getElementsByTagName("label")[0];
    let buttonsContainer = e.parentElement.querySelector(".buttons-container");

    if(isCompleted){
        label.innerHTML = `<del>${label.innerHTML}</del>`;

        console.log(buttonsContainer.firstElementChild);
        buttonsContainer.firstElementChild.classList.add("hidden");

        
    }else{
        let labelValue = label.lastElementChild.innerHTML;
        label.removeChild(label.lastElementChild);
        label.innerHTML = labelValue;
        buttonsContainer.firstElementChild.classList.remove("hidden");
    }
    
}

function addTask(e){
    e.addEventListener("keyup", ({key}) => {
        if(key === "Enter"){
            
            if(e.value !== ""){
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
                                `
                outerDiv.appendChild(task);                  

                document.querySelector(".task-container").appendChild(outerDiv);

                e.value = "";
            }
            
        }
    })
}

function deleteTask(e){
    e.parentElement.parentElement.remove();
}

function editTask(e){

    let label = e.parentElement.parentElement.getElementsByTagName("label")[0];

    let input = document.createElement("input");
    input.title = "Task name";
    input.value = label.textContent;
    input.classList.add("bg-gray-700", "group-hover:bg-gray-600", "border-b", "focus:outline-none", "w-full");
    input.type = "text";

    let tempLabel = label;
    label.replaceWith(input);

    input.focus();

    input.addEventListener("focusout", () => {
        input.replaceWith(tempLabel);
    })

    input.addEventListener("keyup", ({key}) => {
        if(key === "Enter"){
            if(input.value !== ""){
                tempLabel.textContent = input.value;
                input.blur();
                input.replaceWith(tempLabel);
            }
        }
    });
}