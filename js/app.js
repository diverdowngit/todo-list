const addButton = document.querySelector(".add");
const todoForm = document.querySelector(".todo-form");

const showForm = (ev) =>{
    todoForm.classList.toggle("displayItem");
};

addButton.addEventListener('click',showForm);
