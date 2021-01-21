const addIcon = document.querySelector(".add");
const todoForm = document.querySelector(".todo-form");
const closeIcon = document.querySelector(".close");

//select both Text Area
const input1 = document.querySelector('.todo-title');
const input2 = document.querySelector('.todo-description');

//select error text
const error = document.querySelector('.error');

const showForm = () =>{
    todoForm.classList.add("displayItem");
};

addIcon.addEventListener('click',showForm);

const hideForm = () =>{
    todoForm.classList.remove("displayItem");
};

closeIcon.addEventListener('click', hideForm);

// This is the array that will hold the todo list items
let todoItem = [];

// This function will create a new todo object based on the text that was entered in the textarea input, and push it into the `todoItem` array
function addTodo(title, description){
    const todo = {
        heading : title,
        text : description,
        id: Date.now(),
    }
    todoItem.push(todo);
    renderTodo(todo.heading);
    console.log(todoItem);
}

// our html Tamplate is :::  <div class="card"> Items titles </div>
function renderTodo(title){
    const cards = document.querySelector('.cards');
    const tamplateHtml = ` <div class="card">${title}</div>`;
    cards.innerHTML += tamplateHtml;
}

// select form
const form = document.querySelector(".todo-form > form");

// add submit event on add_card button click
form.addEventListener('submit',saveTodo);

function saveTodo(event){
    // prevent page refresh on form submission
    event.preventDefault();

      // Get the value of the input and remove whitespace
    const titleText = input1.value.trim();
    const descriptionText = input2.value.trim();

    if(titleText !== ''){
        addTodo(titleText, descriptionText);
        input1.value = '';
        input2.value = '';
        input1.focus();
        error.style.visibility = "hidden";
    }
    else{
        error.style.visibility = "visible";
    }
}









