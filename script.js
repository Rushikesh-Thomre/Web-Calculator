let displayValue = '0';
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;

function updateDisplay() {
const display = document.getElementById('display');
display.innerText = displayValue;
}

function clearDisplay() {
displayValue = '0';
firstOperand = null;
waitingForSecondOperand = false;
operator = null;
updateDisplay();
}

function inputDigit(digit) {
if (waitingForSecondOperand) {
displayValue = digit.toString();
waitingForSecondOperand = false;
} else {
displayValue = displayValue === '0' ? digit.toString() : displayValue + digit.toString();
}
updateDisplay();
}

function inputDecimal() {
if (!displayValue.includes('.')) {
displayValue += '.';
}
updateDisplay();
}

function toggleSign() {
displayValue = (parseFloat(displayValue) * -1).toString();
updateDisplay();
}

function percent() {
displayValue = (parseFloat(displayValue) / 100).toString();
updateDisplay();
}

function inputOperator(nextOperator) {
const inputValue = parseFloat(displayValue);

if (operator && waitingForSecondOperand) {
operator = nextOperator;
return;
}

if (firstOperand === null && !isNaN(inputValue)) {
firstOperand = inputValue;
} else if (operator) {
const result = performCalculation[operator](firstOperand, inputValue);

displayValue = String(result);
firstOperand = result;
}

waitingForSecondOperand = true;
operator = nextOperator;
updateDisplay();
}

const performCalculation = {
'/': (firstOperand, secondOperand) => firstOperand / secondOperand,
'*': (firstOperand, secondOperand) => firstOperand * secondOperand,
'+': (firstOperand, secondOperand) => firstOperand + secondOperand,
'-': (firstOperand, secondOperand) => firstOperand - secondOperand,
'=': (firstOperand, secondOperand) => secondOperand
};

function calculate() {
if (operator && !waitingForSecondOperand) {
const inputValue = parseFloat(displayValue);
const result = performCalculation[operator](firstOperand, inputValue);

displayValue = String(result);
firstOperand = null;
operator = null;
waitingForSecondOperand = false;
updateDisplay();
}
}

updateDisplay();