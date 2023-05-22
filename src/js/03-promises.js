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

  setTimeout(() => {
    createPromise(position, first)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    const intervalId = setInterval(() => {
      position += 1;

      createPromise(position, first)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });

      clearTimer(position, amount, intervalId);
    }, delay);
  }, first);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });

  return promise;
}

function clearTimer(position, amount, intervalId) {
  if (position == amount) {
    clearInterval(intervalId);
  }
}
