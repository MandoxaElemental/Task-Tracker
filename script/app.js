import { saveToLocalStorage, getLocalStorage, removeFromLocalStorage } from "./localStorage.js";

let AddBox = document.getElementById('addBox')
let NewTaskBtn = document.getElementById('newTask')
let AddBoxCancel = document.getElementById('cancelBtn')
let OptionBoxCancel = document.getElementById('cancelOptionBtn')
let AddBtn = document.getElementById('addBtn')
let NameInput = document.getElementById('nameInput')
let DescriptionInput = document.getElementById('descriptionInput')
let PriorityInput = document.getElementById('priorityInput')
let DateInput = document.getElementById('dateInput')
let StatusInput = document.getElementById('statusInput')
let ToDo = document.getElementById('toDo')
let InProgress = document.getElementById('inProgress')
let Complete = document.getElementById('complete')
let InfoBox = document.getElementById('infoBox')
let OptionBox = document.getElementById('optionBox')
let NameOption = document.getElementById('nameOption')
let DescriptionOption = document.getElementById('descriptionOption')
let PriorityOption = document.getElementById('priorityOption')
let DateOption = document.getElementById('dateOption')
let StatusOption = document.getElementById('statusOption')
let SaveOptionBtn = document.getElementById('optionBtn')
let Back = document.getElementById('back')

NewTaskBtn.addEventListener('click', async() => {
    AddBox.className = 'addTask fadeIn'
})
AddBoxCancel.addEventListener('click', async() => {
    AddBox.className = 'hidden'
})
Back.addEventListener('click', async() => {
    InfoBox.className = 'hidden'
})
OptionBoxCancel.addEventListener('click', async() => {
    OptionBox.className = 'hidden'
})

AddBtn.addEventListener('click', async () => {
    let newName = NameInput.value
    let newDescription = DescriptionInput.value
    let newPriority = PriorityInput.value
    let newDate = DateInput.value
    let newStatus = StatusInput.value
    if(newName === "" || newDescription === "" || newPriority === "" || newDate === "" || newStatus === ""){
        console.log('error')
    } else {
       let NewArr = createObject(newName, newDescription, newPriority, newDate, newStatus)
        console.log(NewArr)
        saveToLocalStorage(NewArr)
        AddBox.className = 'hidden'
        taskList()
    }
    NameInput.value = ""
    DescriptionInput.value = ""
    PriorityInput.value = ""
    DateInput.value = ""
})

const createObject = (name, description, priority, date, status) => {
    let MyTask = {
        id: 0 + getLocalStorage().length,
        name: name,
        description: description,
        priority: priority,
        date: date,
        status: status
    }
    return MyTask
}

function taskList(){
    ToDo.innerHTML = ""
    let Arr = getLocalStorage()
    Arr.map(tasks => {
        let newDiv = document.createElement('div')
        let TaskName = document.createElement('p') 
        if(tasks.priority === "low"){
            TaskName.className = 'low'
        } else if (tasks.priority === "medium"){
            TaskName.className = "medium"
        } else if (tasks.priority === "high"){
            TaskName.className = "high"
        }
        TaskName.innerText = tasks.name
        newDiv.appendChild(TaskName)
        let TaskDate = document.createElement('p') 
        TaskDate.innerText = tasks.date
        newDiv.appendChild(TaskDate)
        let detailsBtn = document.createElement('button')
        detailsBtn.innerText = 'View Details'

        detailsBtn.addEventListener('click', async()=>{
            InfoBox.className = "addTask fadeIn"
            document.getElementById('infoName').innerText = tasks.name
            document.getElementById('infoDesc').innerText = tasks.description
            document.getElementById('infoDate').innerText = tasks.date
            
        })
        newDiv.appendChild(detailsBtn)
        let optionBtn = document.createElement('button')
        optionBtn.innerText = 'Options'

        optionBtn.addEventListener('click', async () => {
            OptionBox.className = "addTask fadeIn"
            NameOption.value = tasks.name
            DescriptionOption.value = tasks.description
            PriorityOption.value = tasks.priority
            DateOption.value = tasks.date
            StatusOption.value = tasks.status
            let currentID = tasks.id
            console.log(currentID)

            SaveOptionBtn.addEventListener('click', async () => {

            })
        })


        newDiv.appendChild(optionBtn)
        newDiv.setAttribute('id', tasks.id)

        if(tasks.status === "To Do"){
            ToDo.appendChild(newDiv)
        } else if (tasks.status === "In Progress") {
            InProgress.appendChild(newDiv)
        } else if (tasks.status === "Complete"){
            Complete.appendChild(newDiv)
        }
    });
};

taskList()