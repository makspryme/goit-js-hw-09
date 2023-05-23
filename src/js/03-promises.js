import { Notify } from 'notiflix';

// Notify.success('Good date!');

const refs = {
  fisrtStep: document.querySelector('input[name="delay"]'),
  delayStep: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', startPromises);

function startPromises(e) {
  e.preventDefault();

  const first = refs.fisrtStep.value;
  const delay = refs.delayStep.value;
  const amount = refs.amount.value;
  let position = 1;

  let timeDelay = Number(first);

  setTimeout(() => {
    createPromise(position, timeDelay)
      .then(({ position, timeDelay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${timeDelay}ms`);
      })
      .catch(({ position, timeDelay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${timeDelay}ms`);
      });
    const intervalId = setInterval(() => {
      position += 1;
      timeDelay += Number(delay);

      createPromise(position, timeDelay)
        .then(({ position, timeDelay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${timeDelay}ms`);
        })
        .catch(({ position, timeDelay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${timeDelay}ms`);
        });

      clearTimer(position, amount, intervalId);
    }, delay);
  }, first);
}

function createPromise(position, timeDelay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, timeDelay });
    } else {
      reject({ position, timeDelay });
    }
  });

  return promise;
}

function clearTimer(position, amount, intervalId) {
  if (position == amount) {
    clearInterval(intervalId);
  }
}
