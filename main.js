const input = document.querySelector(".inputbox")
const buttion = document.querySelector(".addtask")
const tasks = document.querySelector(".tasks")
const filter=document.querySelector(".filter")

buttion.addEventListener("click",addtask)
tasks.addEventListener("click",taskevents)
filter.addEventListener("click",filterlist)

function addtask(){
    const taskcont = document.createElement('div')
    const tasklable = document.createElement('li')
    tasklable.innerText=input.value
    const taskcheak = document.createElement('button')
    taskcheak.innerHTML='<i class="fa fa-check-square"></i>'
    const tasktrash = document.createElement('button')
    tasktrash.innerHTML='<i class="fa fa-trash"></i>'

    taskcont.classList.add("taskcont")
    tasklable.classList.add("tasklable")
    taskcheak.classList.add("taskcheak")
    tasktrash.classList.add("tasktrash")

    taskcont.appendChild(tasklable)
    taskcont.appendChild(taskcheak)
    taskcont.appendChild(tasktrash)
    tasks.appendChild(taskcont)

    input.value=""

}

function taskevents(e){
    const target = e.target
    if(target.classList[0] === "tasktrash"){
        target.parentElement.classList.add("deleted")
        target.parentElement.addEventListener("transitionend",function(){target.parentElement.remove()})
    }
    else if(target.classList[0] === "taskcheak"){
        if(target.parentElement.classList[1] === "cheaked"){
            target.parentElement.classList.remove("cheaked")
            target.childNodes[0].classList="fa fa-check-square"
        }else{
        target.parentElement.classList.add("cheaked")
        target.childNodes[0].classList="fa fa-remove"
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