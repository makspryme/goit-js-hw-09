const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');

btnStartEl.addEventListener('click', startChangeBodyColor);

function startChangeBodyColor(e) {
  btnStopEl.removeAttribute('disabled');
  btnStartEl.setAttribute('disabled', '');

  document.body.style.backgroundColor = getRandomHexColor();

  const intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  btnStopEl.addEventListener('click', stopChangeBodyColor);

  function stopChangeBodyColor(e) {
    btnStartEl.removeAttribute('disabled');
    btnStopEl.setAttribute('disabled', '');

    clearInterval(intervalId);
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

