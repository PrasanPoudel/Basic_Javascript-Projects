let todoList = JSON.parse(localStorage.getItem('todos')) || [];
const inputElement = document.querySelector('#todo-input');
window.onload = function() {
  inputElement.focus();
  displayItems();
};

function addTodo() {
  let todoItem = inputElement.value.trim();
  if (todoItem !== '') {
    todoList.push({ item: todoItem });
    inputElement.value = '';
    updateLocalStorage();
    displayItems();
  }
}


function displayItems() {
  let containerElement = document.querySelector('.todo-container');
  let newHtml = '';
  for (let i = 0; i < todoList.length; i++) {
    let { item } = todoList[i];
    if (item!=='') {
      newHtml += `
      <div class="todoListItem">
        <p>${item}</p>
        <button class='btn-delete' onclick=
        "
        todoList.splice(${i}, 1);
        updateLocalStorage();
        displayItems();
        ">
        ⌫
        </button>
      </div>
    `;
    }
  }
  containerElement.innerHTML = newHtml;
}

function updateLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todoList));
}