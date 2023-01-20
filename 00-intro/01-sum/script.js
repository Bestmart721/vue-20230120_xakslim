import { sum } from './sum.js';

const a = document.querySelector('input[name=a]');
const b = document.querySelector('input[name=b]');
const result = document.querySelector('output[name=result]');

function calculate() {
  try {
    result.value = sum(a.valueAsNumber, b.valueAsNumber);
  } catch (e) {
    result.value = e.message;
  }
}

a.addEventListener('input', calculate);
b.addEventListener('input', calculate);
