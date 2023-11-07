'use strict';

function onEvent(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

function removeEvent(event, selector, callback) {
  return selector.removeEventListener(event, callback);
}
 
function getElement(selector, parent = document) {
  return parent.getElementById(selector);
}
 
function select(selector, parent = document) {
  return parent.querySelector(selector);
}
 
function selectAll(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}


function print(arg) {
  console.log(arg);
}


function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

// Filter array
function filterArray(array, callback) {
  return array.filter(callback);
}

// Create an HTML element
function create(element, parent = document) {
  return parent.createElement(element);
}

const input = select('#input');
const output = select('#output');
const guessNum = select('#guess-number');
const resetBtn = select('#reset');
const guessBtn = select('#guess-button');
const heading = select('.heading');
let count = 4;
let randomNum = randomNumber(1, 20);



function validateInput(number) {
  const inputNum = parseInt(number.trim());
  if (isNaN(inputNum)) {
    return (output.innerText = `Please enter a number`);
  }
  return inputNum;
}

function Hint(number) {
  const inputNum = parseInt(number.trim());
  if (count > 1) {
    if (inputNum > randomNum) {
      output.innerText = `Try a lower number`;
    } else if (inputNum < randomNum) {
      output.innerText = `Try a higher number`;
    } else if (inputNum > 20) {
      output.innerText = `Please enter a number between 1 and 20`;
    } else if (inputNum === randomNum) {
      output.innerText = `Correct! The secret number was: ${randomNum}`;
      resetBtn.style.display = 'block';
    }
  } else {
    output.innerText = `Out of attempts! The secret number was ${randomNum}`;
    guessBtn.style.display = 'none';
    resetBtn.style.display = 'block';
  }
}

function reset() {
  randomNum = randomNumber(1, 20);
  input.value = '';
  guessBtn.style.display = 'block';
  output.innerText = `Please enter a number between 1 and 10`;
  count = 4;
  guessNum.innerText = `${count}`;
  resetBtn.style.display = 'none';
}

onEvent('load', window, () => {
  resetBtn.style.display = 'none';
  output.style.display = 'none';
  input.value = '';
  guessNum.innerText = `${count}`;
  
});

onEvent('click', guessBtn, () => {
  heading.style.display = 'none';
  output.style.display = 'block';
  let guessNumber = input.value;
  validateInput(guessNumber);
  Hint(guessNumber);
  count--;
  guessNum.innerText = `${count}`;
  
});

onEvent('click', resetBtn, () => {
  reset();
});