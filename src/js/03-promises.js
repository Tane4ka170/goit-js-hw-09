import * as Notiflix from 'notiflix';

const form = document.querySelector('form.form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]')

function createPromise(position, delay) {
  return new Promise((resolve, reject) =>{
    setTimeout(() =>{
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay);
  });
};

form.addEventListener('submit', onSubmit);
function onSubmit(event){
  event.preventDefault();
  let delay = Number (inputDelay.value);
  let step = Number (inputStep.value);
  let amount = Number (inputAmount.value);
  let position = 0;
  delay = delay - step;
  form.reset();
  for(let i = 0; i < amount; i++){
    position = i + 1;
    delay += step;
    createPromise(position, delay)
    .then(({position, delay}) =>{
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({position, delay}) =>{
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    })
  }
}