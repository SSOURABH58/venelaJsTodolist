const input = document.querySelector(".inputbox")
const buttion = document.querySelector(".addtask")
const tasks = document.querySelector(".tasks")
const filter=document.querySelector(".filter")
let todos

document.addEventListener("DOMContentLoaded",gettodos)
buttion.addEventListener("click",addtask)
tasks.addEventListener("click",taskevents)
filter.addEventListener("click",filterlist)

function addtask(){
    const id = todos.length
    let isthair = 0
    let task = input.value
    todos.forEach(todo=>{
        if(task === todo.task)
            isthair+=1
    })
    if(isthair){
        task=`${task} (${isthair})`
    }
    createlist(task,"taskcont",id)
    savetodo(input.value,"taskcont",id)
    input.value=""
}

function createlist(todo,todoclass,id){
    const taskcont = document.createElement('div')
    const tasklable = document.createElement('li')
    tasklable.innerText=todo
    const taskcheak = document.createElement('button')
    taskcheak.innerHTML='<i class="fa fa-check-square"></i>'
    const tasktrash = document.createElement('button')
    tasktrash.innerHTML='<i class="fa fa-trash"></i>'

    taskcont.classList.add("taskcont")
    tasklable.classList.add("tasklable")
    taskcheak.classList.add("taskcheak")
    tasktrash.classList.add("tasktrash")

    if(todoclass==="cheaked"){
        taskcont.classList.add(todoclass)
        taskcheak.childNodes[0].classList="fa fa-remove"
    }

    taskcont.id=id

    taskcont.appendChild(tasklable)
    taskcont.appendChild(taskcheak)
    taskcont.appendChild(tasktrash)
    tasks.appendChild(taskcont)
}

function taskevents(e){
    const target = e.target
    const parent =target.parentElement
    if(target.classList[0] === "tasktrash"){
        parent.classList.add("deleted")
        parent.addEventListener("transitionend",function(){parent.remove()})
        edittodo(parent.id,"-1")
    }
    else if(target.classList[0] === "taskcheak"){
        if(parent.classList[1] === "cheaked"){
            parent.classList.remove("cheaked")
            target.childNodes[0].classList="fa fa-check-square"
            edittodo(parent.id,"taskcont")
        }else{
            parent.classList.add("cheaked")
            target.childNodes[0].classList="fa fa-remove"
            edittodo(parent.id,"cheaked")
        }
    }
}

function filterlist(e){
    const target = e.target
    const list = tasks.childNodes
    list.forEach(element => {
        switch(target.value){
            case "all": 
                element.style.display="flex"
                break
            case "complated": 
                if(element.classList.contains("cheaked")){
                    element.style.display="flex"
                }else{
                    element.style.display="none"
                }
                break
            case "uncomplated": 
                if(!element.classList.contains("cheaked")){
                    element.style.display="flex"
                }else{
                    element.style.display="none"
                }
                break
        }
    })
}

function savetodo(task,todoclass,id){
    todos.push({"id":id,"task":task,"taskclass":todoclass})
    localStorage.setItem("todos",JSON.stringify(todos))
}

function edittodo(id,todoclass){
    if(todoclass === "-1")
        {
        let i=0
        todos.forEach(todo=>{
            console.log(todo.id,id,i)
            if(todo.id===Number(id))
                {
                
                console.log(todos.splice(i,1))
                }
            i+=1
        })
        }
    else
        todos[id].taskclass=todoclass
    localStorage.setItem("todos",JSON.stringify(todos))
}


function gettodos(){
    if(localStorage.getItem("todos")===null)
        todos = []
    else
        todos = JSON.parse(localStorage.getItem("todos")) 
    todos.forEach(todo => createlist(todo.task,todo.taskclass,todo.id))
}