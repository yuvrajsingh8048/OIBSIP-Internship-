const historyDisplay = document.getElementById("history");
const resultDisplay = document.getElementById("result");
const buttons = document.querySelectorAll("button");

let history = "";
let result = "";
let lastAnswer = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "clear") {
      history = "";
      result = "";
    } 
    else if (value === "del") {
      history = history.slice(0, -1);
    } 
    else if (value === "ans") {
      history += lastAnswer;
    } 
    else if (value === "ENTER") {
      try {
        let expression = history.replace(/x/g, "*").replace(/÷/g, "/").replace(/√/g, "Math.sqrt");
        result = eval(expression);
        lastAnswer = result;
      } catch {
        result = "Error";
      }
    } 
    else {
      history += value;
    }

    historyDisplay.value = history;
    resultDisplay.value = result;
  });
});