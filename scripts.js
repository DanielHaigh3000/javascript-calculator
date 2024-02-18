// Global variables
let total;
let curNum;
let lastCalc;

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
  if (e.target.dataset.hasOwnProperty('num')) {
    calculatorInput.innerText += e.target.dataset.num;
    calculatorTempTotal.innerText += e.target.dataset.num;
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
// v2. recognize keyboard codes as well for addition, multiplication, etc.
// v3. show X number of previous steps (calculation history)
// v4. JavaScript decimal number fixing (e.g. 0.1 + 0.2 does NOT equal 0.3)
