const addbar = document.getElementById("addBar");
const list = document.querySelector(".list ul");

function addTask() {
    if (addbar.value === ""){
        alert("Please enter a task");
    }
    else {
       const li = document.createElement("li");
       li.textContent = addbar.value;
       li.innerHTML += `<img src="assests/crossed.png" alt="checkbox" class="delete">`;
       list.appendChild(li);
       addbar.value = ""; // Clear the input field
    }
    savetasks();
}

list.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        savetasks();
    }
    else if (e.target.className === "delete"){
        e.target.parentElement.remove();
        savetasks();
    }
})

function savetasks(){
    localStorage.setItem("tasks", list.innerHTML);
}
function loadTasks() {
    list.innerHTML = localStorage.getItem("tasks");
}

loadTasks();