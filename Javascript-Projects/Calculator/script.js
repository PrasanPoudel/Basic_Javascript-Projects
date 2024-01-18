let screen = "";
let output="";
document.querySelector(".screen").value= screen;
function displayResult()
{
  output= eval(document.querySelector(".screen").value= screen);
  document.querySelector(".screen").value= output;
}

function clearDisplay(){
  screen="";
  document.querySelector(".screen").value= "";
}
function deleteLastInput(){
  let del=screen.split('');
  del.pop();
  screen=del.join('');
  document.querySelector(".screen").value= screen;
}