const addIcon = document.querySelector(".add");
const addForm = document.querySelector("#add-form");
const colseIcon = document.querySelector(".close");
const errorTag = document.querySelector(".error");
let editCardID = null;

//select the text input
const input1 = document.querySelector(".todo-title");
const input2 = document.querySelector(".todo-description");

const showForm = () =>{
    addForm.classList.add("active");
    errorTag.style.visibility = "hidden";
    if(!editCardID){
        input1.value = '';
        input2.value = '';
    }
    input1.focus();
};

addIcon.addEventListener('click',showForm);

const hideForm = () =>{
    addForm.classList.remove("active");
};

colseIcon.addEventListener('click', hideForm);

// This is the array that will hold the todo list items
let todoItems = [];

// This function will create a new todo object based on the
// text that was entered in the text input, and push it into
// the `todoItems` array
function addTodo(title, description){
    const todo = {
        heading : title, 
        text : description,
        id: Date.now(),
    }
    todoItems.push(todo);
    renderTodo(todo);
}

function editTodo(id, title, description){
    const index = todoItems.findIndex( item => item.id === id);
    todoItems[index].heading = title;
    todoItems[index].text = description;
    const card = document.querySelector(`[id='${id}']`);
    card.children[0].textContent = title;
}

// our html Tamplate is :::  <div class="card">finsih todo project</div>
function renderTodo(todo){
    const cards = document.querySelector(".cards");

    const tamplateHTML = `<div class="card" id="${todo.id}" draggable="true" ondragstart="DragStart(event)" ondragend="DragEnd(event)">
                            <p class="card-text">${todo.heading}</p>

                            <div class="card-icon">
                                <i class="fas fa-edit icon edit greenH" data-id="${todo.id}" onclick="editCard(this)"></i>
                                <i class="far fa-trash-alt icon delete redH" data-id="${todo.id}" onclick="deleteCard(this)"></i>
                            </div>
                        </div>`;
    cards.innerHTML += tamplateHTML;
};


// add a submit event listener
addForm.addEventListener('submit', saveTodo);


//function to save todo items
function saveTodo(event){
        // prevent page refresh on form submission
        event.preventDefault();
       
        // Get the value of the input and remove whitespace
        const titleText = input1.value.trim();
        const descriptionText = input2.value.trim();

        if(titleText !== ''){
            editCardID ? editTodo(editCardID, titleText, descriptionText) : addTodo(titleText, descriptionText);
            input1.value = '';
            input2.value = '';
            input1.focus();
            errorTag.style.visibility = "hidden";
            addForm.classList.remove("active");
        }
        else{
            errorTag.style.visibility = "visible";
        }
        editCardID = null;
}


// Delete ToDo::::::
function deleteCard(obj){
    const id = obj.dataset.id;
    // const todo = {
    //     deleted: true,
    //     ...todoItems[index]
    // };

    // remove the todo item from the array by filtering it out
    todoItems = todoItems.filter(item => item.id !== Number(id));
    const item = document.querySelector(`[id='${id}']`);
    item.remove();
}

// EditCard ToDo::::::
function editCard(obj){
    const id = obj.dataset.id;
    let index = todoItems.findIndex(item => item.id === Number(id));
    const editTodo = todoItems[index];
    editCardID = editTodo.id;
    showForm();
    input1.value = editTodo.heading;
    input2.value = editTodo.text;
    
}

// Drag and Drop
let boxs = document.getElementsByClassName('box');
for(var box of boxs){
    box.addEventListener('dragover',DragOver);
    box.addEventListener('dragenter',DragEnter);
    box.addEventListener('drop', Drop);
}
 
let startBox = null;
// call on DragStart
function DragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    startBox = ev.target.closest(".box");
}

function DragEnd(){
    startBox.style.border = "none";
    startBox = null;
}

// call on OnDrop
  function Drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if(ev.target.classList.contains('cards')){
        ev.target.style.border = "none";
    }   ev.target.appendChild(document.getElementById(data));
 }

 // call on Drag Over
function DragOver(ev) {
    ev.preventDefault();
    ev.target.closest(".box").style.border= "2px solid gold";
}

function DragEnter(ev){
    ev.preventDefault();
}

