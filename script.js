// Countdown Timer
const countdown = document.getElementById("countdown");

const streamDate = new Date();
streamDate.setHours(streamDate.getHours() + 5);

function updateCountdown() {
  const now = new Date().getTime();
  const distance = streamDate - now;

  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.innerHTML =
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;
}

setInterval(updateCountdown, 1000);
updateCountdown();


// Spin Wheel
const wheel = document.getElementById("wheel");
const spinBtn = document.querySelector(".spin-btn");

spinBtn.addEventListener("click", () => {
  const randomDegree = Math.floor(3000 + Math.random() * 2000);
  wheel.style.transform = `rotate(${randomDegree}deg)`;
});
