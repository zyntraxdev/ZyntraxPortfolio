// Live clock
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-GB", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  document.getElementById("localTime").textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Background animation
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const nodes = [];
const nodeCount = 60;

for (let i = 0; i < nodeCount; i++) {
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    n.x += n.vx;
    n.y += n.vy;

    if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
    if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

    ctx.beginPath();
    ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#00ff88";
    ctx.fill();

    for (let j = i + 1; j < nodes.length; j++) {
      const n2 = nodes[j];
      const dx = n.x - n2.x;
      const dy = n.y - n2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.strokeStyle = "rgba(0, 255, 136, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();

// Modal open/close
function openTermsModal() {
  document.getElementById("termsModal").style.display = "block";
}
function closeTermsModal() {
  document.getElementById("termsModal").style.display = "none";
}

// Cursor tracking
const cubeCursor = document.getElementById("cursorCube");

document.addEventListener("mousemove", (e) => {
  cubeCursor.style.top = `${e.clientY}px`;
  cubeCursor.style.left = `${e.clientX}px`;
});
function openProjectModal() {
  document.getElementById("projectModal").style.display = "block";
}
function closeProjectModal() {
  document.getElementById("projectModal").style.display = "none";
}

