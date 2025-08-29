const categories = ['personal', 'work', 'study', 'health', 'gym', 'other'];

function showCategory(category){
    document.querySelectorAll('.task').forEach(task => task.classList.add('hidden'));
    document.querySelector(`.task.${category}`).classList.remove('hidden');
    document.querySelectorAll('.ctg').forEach(ctg => ctg.classList.remove('active'));
    document.querySelector(`.ctg.${category}`).classList.add('active');
}

function saveTasks(category){
    const list = document.querySelector(`.task.${category} .list ul`);
    localStorage.setItem(`tasks-${category}`, list.innerHTML);
}

function addTask(category){
    const addBar = document.getElementById(`addBar-${category}`);
    const list = document.querySelector(`.task.${category} .list ul`);

    if(addBar.value === ""){
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement('li');
    li.textContent = addBar.value;
    li.innerHTML += `
    <img src="assests/crossed.png" alt="checkbox" class="delete" />
    `;
    list.appendChild(li);
    addBar.value = "";
    saveTasks(category);

    li.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveTasks();
    }
    else if (e.target.className === "delete"){
        e.target.parentElement.remove();
        saveTasks();
    }
    })
}


function loadTasks(){
    categories.forEach(category =>{
        const list = document.querySelector(`.task.${category} .list ul`);
        const saveTasks = localStorage.getItem(`tasks-${category}`);
        if(saveTasks){
            list.innerHTML = saveTasks;
            list.addEventListener("click", function(e) {
            if (e.target.tagName === "LI") {
                e.target.classList.toggle("checked");
                saveTasks();
            }
            else if (e.target.className === "delete"){
                e.target.parentElement.remove();
                saveTasks();
            }
            })
        }
    });
}

document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll('.ctg').forEach(ctg => {
        ctg.addEventListener('click', () => {
            showCategory(ctg.classList[1]);
        })
    });
    loadTasks();
});

