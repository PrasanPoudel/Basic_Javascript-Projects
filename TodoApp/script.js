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
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAATNJREFUSEvtllESAUEMRHtvwklwEpwEJ+EmOAlHsa02KpWayUxmt6wP+fCVydNJJ3SYKbqZuPiDv9b5n2/1EcBqRDvuAC4AnlKjRvG5f7AbAdVPlwIvgan0MBGUZfaDcned1n17rxNCWerUf1BMFrwA8ChAWWTbK2CuDs4yNxoXzEJUagvq4tIydoUekNwNgNugKjUiF0woC3rxMcmQSzi/DKGM3Jiy4IiDNZyKZVU8byTBLWbScE+pdC8JpiGoOBIyU3ljZ25rZVsd2VsLrYG75uIaeY4mQENlRNZwqRswep2kgPWFwHMmrTogpV3OHYrmAyKz4rxTlylivmpz2cSI2Wq+ULHVushUcB4YeuAdpZ9FydP3uEaZzSGUakN/BFpAxTe1iouFogl/cLRjzfmztfoFNiZDHyBclzQAAAAASUVORK5CYII="/>
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
function capitalizeFirstLetter(element) {
  element.value = element.value.charAt(0).toUpperCase() + element.value.slice(1);
}