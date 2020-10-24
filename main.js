const input = document.querySelector(".inputbox")
const buttion = document.querySelector(".addtask")
const tasks = document.querySelector(".tasks")
const filter=document.querySelector(".filter")
const weatherblock = document.querySelector(".weather")
const weatherblockd = document.querySelector(".weatherd")
const timetab = document.querySelector(".timetab")
let todos

document.addEventListener("DOMContentLoaded",gettodos)
// document.addEventListener("DOMContentLoaded",weatherapi)
document.addEventListener("DOMContentLoaded",weatherapiproxy)
document.addEventListener("DOMContentLoaded",showtime)
buttion.addEventListener("click",addtask)
tasks.addEventListener("click",taskevents)
filter.addEventListener("change",filterlist)

setInterval(showtime, 1000);

function addtask(e){
    e.preventDefault();
    let id = 0
    if(todos.length>0){
        id=todos[todos.length-1].id+1
    }
    let isthair = 0
    let task = input.value
    todos.forEach(todo=>{
        if(task === todo.task)
            isthair+=1
    })
    if(!isthair){
        isthair=""
    }
    
    createlist(input.value,"taskcont",id,isthair)
    savetodo(input.value,"taskcont",id,isthair)
    input.value=""
}

function createlist(todo,todoclass,id,copy){


    const taskcont = document.createElement('div')
    const tasklable = document.createElement('li')
    if(copy)
        tasklable.innerText=`${todo}(${copy})`
    else
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

function savetodo(task,todoclass,id,copy){
    todos.push({"id":id,"task":task,"taskclass":todoclass,"copy":copy})
    localStorage.setItem("todos",JSON.stringify(todos))
}

function edittodo(id,todoclass){
        let i=0
        todos.forEach(todo=>{
            if(todo.id===Number(id))
                {
                    if(todoclass === "-1"){
                        todos.splice(i,1)
                    }else{
                        todos[i].taskclass=todoclass
                    }
                }
            i+=1
        })
    
    localStorage.setItem("todos",JSON.stringify(todos))
}


function gettodos(){
    if(localStorage.getItem("todos")===null)
        todos = []
    else
        todos = JSON.parse(localStorage.getItem("todos")) 
    todos.forEach(todo => createlist(todo.task,todo.taskclass,todo.id,todo.copy))
}

//old function --- using 3rd party api diractly

function weatherapi(){
    let lon
    let lat
    const apikey = "a5cda7877c18c0085082f44f8d49527b"
    // please use your own API key 
    navigator.geolocation.getCurrentPosition(position=>{
        lon = position.coords.longitude
        lat = position.coords.latitude

        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`

        fetch(api)
            .then(responce => {return responce.json()})
            .then(data=>{
                let icon = ""
                switch(data.weather[0].main){
                    case "Clear": icon="☀" 
                    break
                    case "Thunderstorm": icon="🌩" 
                    break
                    case "Rain": icon="🌦" 
                    break
                    case "Snow": icon="❄" 
                    break
                    case "Clouds": icon="☁" 
                    break
                    case "Atmosphere": icon="🌫" 
                    break
                    case "Drizzle": icon="🌧" 
                    break
                }
                weatherblock.innerHTML=`${icon} ${data.weather[0].main} at ${(data.main.temp-273.15).toFixed(2)}℃ in ${data.name}`
                weatherblockd.childNodes[1].innerHTML = `${icon} ${(data.main.temp-273.15).toFixed()}°c`
                weatherblockd.childNodes[3].innerText = `${data.weather[0].main} in ${data.name}`
            })
    })
}

// my proxy for the weather api

function weatherapiproxy(){
    navigator.geolocation.getCurrentPosition(position=>{
        const lat =position.coords.latitude
        const lon = position.coords.longitude
        const coords = {lat,lon}

        const opc = {
            method : 'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(coords)
        }

        // lok.innerHTML=`<p>latitude = ${lat}°</p><p>longitude = ${lon}°</p>`

        fetch('https://node-server-proxy-1.herokuapp.com/weather',opc)
            .then(res=>{return res.json()})
            .then(data=>{
                // wet.innerHTML=`${data.icon} ${data.title} at ${data.temp} in ${data.city}`

                weatherblock.innerHTML=`${data.icon} ${data.title} at ${data.temp}℃ in ${data.city}`
                weatherblockd.childNodes[1].innerHTML = `${data.icon} ${data.temp}°c`
                weatherblockd.childNodes[3].innerText = `${data.title} in ${data.city}`
                
            })
    })
}



function showtime(){
    let data = Date()
    let date = data.split(" ",5)

    let time= date[4].split(":",2)

    if(time[0]>12){
        time[0]-=12
        time.push("pm")
    }else{
        time.push("am")
    }

    timetab.childNodes[1].innerHTML = `${time[0]}:${time[1]}${time[2]}`
    timetab.childNodes[3].innerText = `${date[0]} , ${date[2]} ${date[1]} ${date[3]}`
}