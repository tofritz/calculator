/* DOM selectors */

const calcDisplay = document.querySelector(".calc-display");
const numButtons = document.querySelectorAll(".button-num");
const dotButton = document.querySelector(".button-dot");
const opButtons = document.querySelectorAll(".button-op");
const evalButton = document.querySelector(".button-eval");
const posnegButton = document.querySelector(".button-posneg");
const clearButton = document.querySelector(".button-clear");
const delButton = document.querySelector(".button-del");

/* display text & functions */

let currentDisplayVal = "";
let previousDisplayVal = "";

const updateDisplayText = text => (calcDisplay.textContent = text);

/* calculator functions & variables */

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => a / b;

const operate = (operator, a, b) => {
  if (operator === "+") return add(a, b);
  if (operator === "-") return sub(a, b);
  if (operator === "×") return mul(a, b);
  if (operator === "÷") return div(a, b);
};

let currentOperator;
let currentResult;
let resultFlag = false;

/* state functions */

checkDisplayValsExist = () => {
  return currentDisplayVal != "" && previousDisplayVal != "";
};

disableEvalButton = () => {
  evalButton.style.pointerEvents = "none";
  resultFlag = true;
};

enableEvalButton = () => {
  evalButton.style.pointerEvents = "auto";
};

checkResultPossible = () => {
  return (
    currentDisplayVal != "" && previousDisplayVal != "" && currentOperator != ""
  );
};

disableButtons = () => {
  document.querySelectorAll(".calc-button").forEach(button => {
    button.style.pointerEvents = "none";
  });
  clearButton.style.pointerEvents = "auto";
};

enableButtons = () => {
  document.querySelectorAll(".calc-button").forEach(button => {
    button.style.pointerEvents = "auto";
  });
};

function evaluateValues() {
  if (currentOperator === "÷" && currentDisplayVal == 0) {
    updateDisplayText("This kills the calculator");
    return;
  }
  currentDisplayVal = String(
    operate(
      currentOperator,
      Number(previousDisplayVal),
      Number(currentDisplayVal)
    )
  );

  updateDisplayText(currentDisplayVal);
}

/* event functions */

function numButtonPress(event) {
  if (resultFlag) {
    //if the result button is previously hit, clear values to start
    resultFlag = false;
    currentDisplayVal = "";
    currentOperator = "";
  }
  currentDisplayVal += event.target.textContent.trim();
  updateDisplayText(currentDisplayVal);

  if (checkDisplayValsExist()) {
    enableEvalButton();
  }
}

function opButtonPress(event) {
  if (resultFlag) {
    //if the result button is previously hit, reset the values so the op button doesnt evaluate
    resultFlag = false;
    previousDisplayVal = "";
    currentOperator = "";
  }
  if (checkResultPossible()) {
    evaluateValues();
  }

  currentOperator = event.target.textContent.trim();
  if (currentDisplayVal != "") previousDisplayVal = currentDisplayVal;
  currentDisplayVal = "";
}

function evalButtonPress(event) {
  evaluateValues();
  disableEvalButton();
}

function posnegButtonPress(event) {
  currentDisplayVal *= -1;
  currentDisplayVal = currentDisplayVal.toString(); // retype to string
  updateDisplayText(currentDisplayVal);
}

function clearButtonPress(event) {
  disableEvalButton();
  currentDisplayVal = "";
  previousDisplayVal = "";
  currentOperator = "";
  previousOperator = "";
  updateDisplayText(currentDisplayVal);
}

function delButtonPress(event) {
  currentDisplayVal = currentDisplayVal.slice(0, -1);
  updateDisplayText(currentDisplayVal);
}

function dotButtonPress(event) {
  if (currentDisplayVal.includes(".")) {
    currentDisplayVal = currentDisplayVal.replace(".", "");
  }
  currentDisplayVal += ".";
  updateDisplayText(currentDisplayVal);
}

/* event listeners */

numButtons.forEach(button => button.addEventListener("click", numButtonPress));
opButtons.forEach(button => button.addEventListener("click", opButtonPress));
dotButton.addEventListener("click", dotButtonPress);
evalButton.addEventListener("click", evalButtonPress);
posnegButton.addEventListener("click", posnegButtonPress);
clearButton.addEventListener("click", clearButtonPress);
delButton.addEventListener("click", delButtonPress);

/* initialize states */
disableEvalButton();

/* keyboard support */

window.addEventListener("keydown", checkKeyPress, true);
function checkKeyPress(key) {
  if (key.shiftKey == true) {
    switch (key.keyCode) {
      case 187:
        console.log("test");
        break;
      case 56:
        opButtonPress;
        break;
    }
  } else {
    switch (key.keyCode) {
      case 48:
        numButtonPress;
        break;
    }
  }
}
