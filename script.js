// COUNTDOWN
const countdown = document.getElementById("countdown");
const streamDate = new Date();
streamDate.setHours(streamDate.getHours() + 6);

function updateCountdown() {
  const now = new Date().getTime();
  const distance = streamDate - now;

  const hours = Math.floor(distance / (1000*60*60));
  const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
  const seconds = Math.floor((distance % (1000*60))/1000);

  countdown.innerHTML =
    `${String(hours).padStart(2,"0")}:` +
    `${String(minutes).padStart(2,"0")}:` +
    `${String(seconds).padStart(2,"0")}`;
}
setInterval(updateCountdown,1000);
updateCountdown();


// COUNTER ANIMATION
document.querySelectorAll(".counter").forEach(counter=>{
  const target = +counter.dataset.target;
  let count = 0;
  const increment = target / 100;

  function update(){
    count += increment;
    if(count < target){
      counter.innerText = Math.floor(count);
      requestAnimationFrame(update);
    } else {
      counter.innerText = target;
    }
  }
  update();
});


// TILT EFFECT
document.querySelectorAll(".tilt").forEach(card=>{
  card.addEventListener("mousemove",(e)=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width/2;
    const centerY = rect.height/2;

    const rotateX = -(y-centerY)/10;
    const rotateY = (x-centerX)/10;

    card.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave",()=>{
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});


// WEIGHTED SPIN WHEEL (NO API)
const wheel = document.getElementById("wheel");
const spinBtn = document.querySelector(".spin-btn");

const segments = [
  { name:"Common", weight:50 },
  { name:"Rare", weight:30 },
  { name:"Epic", weight:15 },
  { name:"Legendary", weight:5 }
];

function weightedRandom(){
  const total = segments.reduce((sum,s)=>sum+s.weight,0);
  let random = Math.random()*total;

  for(let segment of segments){
    if(random < segment.weight) return segment;
    random -= segment.weight;
  }
}

spinBtn.addEventListener("click",()=>{
  const result = weightedRandom();
  const randomDeg = 3600 + Math.random()*720;
  wheel.style.transform = `rotate(${randomDeg}deg)`;

  setTimeout(()=>{
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    alert("You won: " + result.name);
  },5000);
});


// PARTICLE BACKGROUND
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<100;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*2,
    d:Math.random()*1
  });
}

function drawParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="rgba(255,0,106,0.3)";
  ctx.beginPath();
  particles.forEach(p=>{
    ctx.moveTo(p.x,p.y);
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2,true);
  });
  ctx.fill();
  updateParticles();
}

function updateParticles(){
  particles.forEach(p=>{
    p.y += p.d;
    if(p.y>canvas.height){
      p.y=0;
      p.x=Math.random()*canvas.width;
    }
  });
}

setInterval(drawParticles,33);