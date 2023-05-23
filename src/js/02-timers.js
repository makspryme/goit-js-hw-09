import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),

  days: document.querySelector('.timer span[data-days]'),
  hours: document.querySelector('.timer span[data-hours]'),
  minutes: document.querySelector('.timer span[data-minutes]'),
  seconds: document.querySelector('.timer span[data-seconds]'),
  btnStartTime: document.querySelector('button[data-start]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const date = new Date().getTime();
    // let isActiveTime = false;

    isCorrectDate(selectedDate, date);
  },
};

flatpickr(refs.inputDate, options);

function isCorrectDate(selectedDate, date) {
  let isActiveTime = false;

  if (selectedDate <= date) {
    Notify.failure('Please choose a date in the future');
    refs.btnStartTime.setAttribute('disabled', '');
    isActiveTime = false;
  } else {
    Notify.success('Good date!');
    isActiveTime = true;
    refs.btnStartTime.addEventListener('click', activateTimer);
    refs.btnStartTime.removeAttribute('disabled');

    function activateTimer() {
      refs.btnStartTime.setAttribute('disabled', '');
      let dateToEnd = selectedDate - date;
      let intervalId = null;
      refs.inputDate.setAttribute('disabled', '');

      intervalId = setInterval(() => {
        dateToEnd -= 1000;

        const { days, hours, minutes, seconds } = convertMs(dateToEnd);

        refs.days.textContent = days;
        refs.hours.textContent = hours;
        refs.minutes.textContent = minutes;
        refs.seconds.textContent = seconds;

        const stopTimer =
          days === '00' &&
          hours === '00' &&
          minutes === '00' &&
          seconds === '00';

        if (stopTimer) {
          clearInterval(intervalId);
          refs.inputDate.removeAttribute('disabled');

          Notify.success('putin loh');
        }
      }, 1000);
    }
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
