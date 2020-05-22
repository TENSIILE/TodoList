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
    const getData = JSON.parse(localStorage.getItem('TodoListData'))
    if(getData != null) obj = getData
}

setDataStorage()

const saveDataStorage = () => {
    localStorage.setItem('TodoListData', JSON.stringify(obj))
}

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
        if (el.completed) todoCompleted.append(li)
        else todoList.append(li)

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
    render();
});

const search = elem => {
    const elemText      = elem.querySelector("span").textContent
    const elemCompleted = todoCompleted.contains(elem)

    obj.forEach((el, index) => {
        if (el.value === elemText) {
            if (el.completed === elemCompleted) {
                ind = index;
            }
        }
    })

    return ind
}

todoContainer.addEventListener("click", event => {
    event.preventDefault();

    const target = event.target
    if (!target.matches("button")) return

    if (target.matches(".todo-remove")) {
        let index = search(target.closest("li"))

        obj.splice(index, 1)
        saveDataStorage()
    };

    if (target.matches(".todo-complete")) {
        let index = search(target.closest("li"))
        
        obj[index].completed = !obj[index].completed
        
        saveDataStorage()
    };
    render()
})