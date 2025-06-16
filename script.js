const calculator = document.querySelector('.calculator');
const calculatorScreen = document.querySelector('.calculator-screen');
const keys = document.querySelector('.calculator-keys');

let prevNumber = '';
let currentNumber = '0';
let operator = '';
let shouldResetScreen = false;

function updateScreen(number) {
    calculatorScreen.value = number;
}

function inputNumber(number) {
    if (currentNumber === '0' || shouldResetScreen) {
        currentNumber = number;
        shouldResetScreen = false;
    } else {
        currentNumber += number;
    }
}

function inputDecimal(dot) {
    if (shouldResetScreen) {
        currentNumber = '0.';
        shouldResetScreen = false;
        return;
    }
    if (!currentNumber.includes(dot)) {
        currentNumber += dot;
    }
}

function handleOperator(nextOperator) {
    if (operator && !shouldResetScreen) {
        calculate();
    }
    prevNumber = currentNumber;
    operator = nextOperator;
    shouldResetScreen = true;
}

function calculate() {
    let result = 0;
    const prev = parseFloat(prevNumber);
    const current = parseFloat(currentNumber);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentNumber = result.toString();
    operator = '';
}

function clearAll() {
    prevNumber = '';
    currentNumber = '0';
    operator = '';
    shouldResetScreen = false;
}

keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('number')) {
        inputNumber(target.value);
        updateScreen(currentNumber);
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateScreen(currentNumber); // Show previous number after operator is pressed
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateScreen(currentNumber);
        return;
    }

    if (target.classList.contains('all-clear')) {
        clearAll();
        updateScreen(currentNumber);
        return;
    }

    if (target.classList.contains('equal-sign')) {
        calculate();
        updateScreen(currentNumber);
        shouldResetScreen = true; // After calculation, next number input should reset the screen
        return;
    }
});

updateScreen(currentNumber); // Initialize screen on load