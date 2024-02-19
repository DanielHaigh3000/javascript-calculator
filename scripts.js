// Global variables
let total;
let curNum;
let lastCalc;
let hasDecimal = false;

// Select elements
const calculatorViewport = document.querySelector('.calculator__viewport');
const calculatorKeypad = document.querySelector('.calculator__keypad');
const calculatorInput = document.querySelector('.calculator__input');
const calculatorTempTotal = document.querySelector('.calculator__total');

// Functions for addition, etc.
const calcAdd = function (totalNum, currentNum) {
  total = totalNum + currentNum;
  console.log(total);
  return total;
};

const calcMultiply = function (totalNum, currentNum) {
  total = totalNum * currentNum;
  console.log(total);
  return total;
};

const calcSubtract = function (totalNum, currentNum) {
  total = totalNum - currentNum;
  console.log(total);
  return total;
};

const calcDivide = function (totalNum, currentNum) {
  total = totalNum / currentNum;
  console.log(total);
  return total;
};

// Get the currently pressed number
const getCurrentNumber = function (e) {
  curNum = parseFloat(calculatorTempTotal.innerText);
  return curNum;
};

// Display currently pressed number on screen
const displayNum = function (e) {
  // Double-checking that we're getting a number
  if (e.target.dataset.hasOwnProperty('num')) {
    // If getting decimal AND we already have one, stop function to prevent double decimal in display
    if (e.target.dataset.num === '.' && hasDecimal) return;

    // If getting decimal and we don't already have one ...
    // Change flag so we know to ignore next decimal
    if (e.target.dataset.num === '.') hasDecimal = true;

    // Otherwise, display the decimal and keep moving along
    calculatorInput.innerText += e.target.dataset.num;
    calculatorTempTotal.innerText += e.target.dataset.num;
    // Hor scroll anchored right with long nums
    calculatorInput.scrollTo(calculatorInput.offsetWidth, 0);
  }
};

// Calculation logic checks
const checkCalculation = function (e, calcType) {
  // If curNum hasn't been set, don't go anything just yet
  if (curNum === undefined) return;

  // If total hasn't been set...
  //// Set lastCalc, display the calc symbol, reset the temporary total
  //// make total the same as previous curNum, then return total
  if (total === undefined) {
    lastCalc = calcType;
    displayCalc(e);
    resetTempTotal();
    total = curNum;
    curNum = undefined; // Protects against someone doing ex. 2 + = (forces second number)
    return total;
  }

  // If lastCalc is blank, set it, display the symbol, then return
  //// This triggers on subsequent calculations so calc symbols don't show when they aren't supposed to
  if (lastCalc === '') {
    lastCalc = calcType;
    displayCalc(e);
    return;
  }
};

// Reset temporary total
const resetTempTotal = function () {
  calculatorTempTotal.innerText = '';
};

// Display calculation symbol (+,-,*, etc)
const displayCalc = function (e) {
  if (e.target.dataset.hasOwnProperty('key')) {
    calculatorInput.innerText += e.target.dataset.key;
    hasDecimal = false;
  }
};

// Clear all values
const clearValues = function () {
  curNum = undefined;
  total = undefined;
  lastCalc = undefined;
  calculatorInput.innerText = '';
  calculatorTempTotal.innerText = '';
};

// Event Listeners
calculatorKeypad.querySelectorAll('[data-num]').forEach(num =>
  num.addEventListener('click', function (e) {
    if (lastCalc === '') return;
    displayNum(e);
    getCurrentNumber(e);
  })
);

calculatorKeypad
  .querySelector('[data-key="+"')
  .addEventListener('click', e => checkCalculation(e, 'add'));

calculatorKeypad
  .querySelector('[data-key="x"')
  .addEventListener('click', e => checkCalculation(e, 'multiply'));

calculatorKeypad
  .querySelector('[data-key="-"')
  .addEventListener('click', e => checkCalculation(e, 'subtract'));

calculatorKeypad
  .querySelector('[data-key="/"')
  .addEventListener('click', e => checkCalculation(e, 'divide'));

calculatorKeypad
  .querySelector('[data-key="="')
  .addEventListener('click', () => {
    if (curNum === undefined || total === undefined) return;
    if (lastCalc === 'add') {
      calcAdd(total, curNum);
    }
    if (lastCalc === 'multiply') {
      calcMultiply(total, curNum);
    }
    if (lastCalc === 'subtract') {
      calcSubtract(total, curNum);
    }
    if (lastCalc === 'divide') {
      calcDivide(total, curNum);
    }

    // Once calculation is complete, display on screen
    calculatorInput.innerText = total;
    // Clear the temp total
    resetTempTotal();
    // Clear lastCalc
    lastCalc = '';
  });

calculatorKeypad
  .querySelector('[data-key="AC"')
  .addEventListener('click', () => clearValues());

// ********************* TODO ***********************

// v1. use buttons on the screen
// v2. recognize keyboard codes as well for numbers, addition, multiplication, etc.
// v3. show X number of previous steps (calculation history)

// Things to fix:
// a. JavaScript decimal number fixing (e.g. 0.1 + 0.2 does NOT equal 0.3)
//
