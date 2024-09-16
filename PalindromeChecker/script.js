"use Strict";
const myInput = document.getElementById("text_input");

window.onload = function() {
  myInput.focus();
};
const fieldset= document.querySelector('fieldset');
        function checkPalindrome() {
            let initial_inputText = document.getElementById("text_input").value;
            let revised_inputText = initial_inputText.toUpperCase().replace(/[^a-zA-Z0-9]/g, '');
            if (revised_inputText === "") {
                alert("Please input a value");
            } else {
                let reversedText = revised_inputText.split('').reverse().join('');
                
                if (revised_inputText === reversedText) {
                    // fieldset.style.background="rgba(0, 150, 0, 0.75)";
                    document.getElementById('result').innerHTML = "=>Yes";
                } else {
                    // fieldset.style.background="red";
                    document.getElementById('result').innerHTML = "=>No";
                }
            }
        }
        function reset(){
            let result_content= document.getElementById("result");
            let initial_inputText = document.getElementById("text_input");
            result_content.innerHTML="";
            initial_inputText.value="";
            fieldset.style.background="black";
        }