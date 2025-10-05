let container = document.querySelector(".container");
let form = document.querySelector(".form");
let inPut = document.querySelector(".the-task");
let submet = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let deleteAll = document.querySelector(".clear-all")


//Empty Array 
let arrayOfTasks = [] 

if (localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

getDataFromLocalStorage()


submet.onclick= function() {
    if(inPut.value !== "") {
        addTasksToArray(inPut.value)
        inPut.value = ""
    }
}

tasks.addEventListener("click",(e) => {
    if(e.target.classList.contains("del")){
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
        e.target.parentElement.remove();
    }
        //for active task or done
    if(e.target.classList.contains("task")){
        //toggle completed
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        //toggle done class
        e.target.classList.toggle("done")
    }
})

deleteAll.onclick= function () {
    tasks.innerHTML =""
    window.localStorage.clear()
}
addTasksToArray = function(taskText){
    let task = {
        "id": Date.now(),
        "title": taskText,
        "completed": false,
    }
    arrayOfTasks.push(task)

    addElementToPageFrom(arrayOfTasks);

    // adding too local storage
    addDtaToLocalStorage(arrayOfTasks);
}

function addElementToPageFrom(arrayOfTasks){
    tasks.innerHTML= "";
    arrayOfTasks.forEach(task => {
        let div = document.createElement("div")
        div.className = "task";
        if (task.completed){
            div.className = "task done"
        }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
        // delete btn 
        let span = document.createElement("span");
        span.className = "del"
        span.appendChild(document.createTextNode("Delete"));

        div.appendChild(span)
        tasks.appendChild(div)



    });
}
function addDtaToLocalStorage(arrayOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks")
    if(data){
        let tasks = JSON.parse(data)
        addElementToPageFrom(tasks)
    }
}
function deleteTaskWith(taskId){
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId )
    addDtaToLocalStorage(arrayOfTasks)
}

function toggleStatusTaskWith(taskId){
    for(let i = 0 ; i < arrayOfTasks.length; i++){
        if(arrayOfTasks[i].id == taskId){
            arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed == true : arrayOfTasks[i].completed == false
        }
    }
    addDtaToLocalStorage(arrayOfTasks)
}
// submet.addEventListener("click", function (e) {
//     if (inPut.value !== "") {
//         window.localStorage.setItem("task", inPut.value.toUpperCase());

//         let miniDiv = document.createElement("div")
//         let miniTask = document.createElement("p")
//         let miniBtn = document.createElement("button")
//         miniTask.textContent = inPut.value ;
//         miniBtn.textContent = "Delete"
//         miniBtn.classList.add("btn");
//         miniDiv.classList.add("mini-div");
//         miniDiv.append(miniTask);
//         miniDiv.append(miniBtn);
//         tasks.append(miniDiv);

//     }

//     // miniBtn.addEventListener("click", function (){
//     //     document.miniDiv.remove();
//     // })
// })
// document.querySelector(".btn").addEventListener("click", function (e){
//     document.this.target.remove
// })

