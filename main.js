const todoControl   = document.querySelector(".todo-control")
const todoList      = document.querySelector(".todo-list")
const todoCompleted = document.querySelector(".todo-completed")
const todoContainer = document.querySelector(".todo-container")

let obj = [
    {
        value: "Сварить кофе",
        completed: false
    },

    {
        value: "Помыть посуду",
        completed: true
    }
]

const setDataStorage = () => {
    const loadData = JSON.parse(document.cookie.split('=')[1]) 
    loadData != null ? obj = loadData : void 0
}

setDataStorage()

const saveDataStorage = () => document.cookie = `todo-data=${JSON.stringify(obj)}`

const render = () => {
    todoList.textContent      = ""
    todoCompleted.textContent = ""

    obj.forEach(el => {
        const li = document.createElement("li")
        li.classList.add("todo-item")
        li.innerHTML = 
            `
                <span class="text-todo">${el.value}</span>
                    <div class="todo-buttons">
                        <button class="todo-remove"></button>
                        <button class="todo-complete"></button>
                    </div>
            `
        el.completed ? todoCompleted.append(li) : todoList.append(li)
        saveDataStorage()
    })
}
render()

todoControl.addEventListener("submit", event => {
    event.preventDefault()

    const input = todoControl.querySelector("input")
    
    if(input.value == "") return
    
    newObj = {
        value: input.value,
        completed: false
    }
    
    obj.push(newObj)
    render()
    input.value = ''
});

const search = elem => {
    const elemText      = elem.querySelector("span").textContent
    const elemCompleted = todoCompleted.contains(elem)

    obj.forEach((el, index) => {
        if (el.value === elemText) {
            if (el.completed === elemCompleted) {
                ind = index
            }
        }
    })

    return ind
}

todoContainer.addEventListener("click", event => {
    event.preventDefault();

    const target = event.target
    if (!target.matches("button")) return

    let index = search(target.closest("li"))

    if (target.matches(".todo-remove")) {
        obj.splice(index, 1)
    }

    if (target.matches(".todo-complete")) {
        obj[index].completed = !obj[index].completed
    }

    saveDataStorage()
    render()
})