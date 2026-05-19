const FOOTBAGS = [
  {
    name: "Fire Crochet",
    type: "crochet",
    colors: { c1: "#e74c3c", c2: "#f39c12" },
    desc: "Hand-crocheted with love. The classic festival sack that started it all.",
  },
  {
    name: "Ocean Suede",
    type: "suede",
    colors: { c1: "#3498db", c2: "#1a5276" },
    desc: "Soft suede panels. Perfect for stalls and inside kicks.",
  },
  {
    name: "Neon Burst",
    type: "neon",
    colors: { c1: "#39ff14" },
    desc: "Glows under blacklight. The party favorite.",
  },
  {
    name: "Denim Patch",
    type: "denim",
    colors: { c1: "#5d6d7e", c2: "#2c3e50" },
    desc: "Recycled jeans turned hacky sack. Rugged and reliable.",
  },
  {
    name: "Rainbow Panels",
    type: "panels",
    colors: { c1: "#e74c3c", c2: "#f1c40f", c3: "#9b59b6" },
    desc: "Six-panel pro design. Spins like a dream.",
  },
  {
    name: "Forest Crochet",
    type: "crochet",
    colors: { c1: "#27ae60", c2: "#1e8449" },
    desc: "Earthy greens for outdoor sessions in the park.",
  },
  {
    name: "Sunset Suede",
    type: "suede",
    colors: { c1: "#e67e22", c2: "#d35400" },
    desc: "Warm orange tones. Looks incredible at golden hour.",
  },
  {
    name: "Electric Blue",
    type: "neon",
    colors: { c1: "#00d4ff" },
    desc: "Brighta cyan that pops against any background.",
  },
  {
    name: "Midnight Denim",
    type: "denim",
    colors: { c1: "#1b2631", c2: "#0e1116" },
    desc: "Dark wash denim. Stealth mode activated.",
  },
  {
    name: "Candy Stripe",
    type: "panels",
    colors: { c1: "#ff6b9d", c2: "#fff", c3: "#c44569" },
    desc: "Pink and white panels. Sweet enough to eat.",
  },
  {
    name: "Lavender Dream",
    type: "crochet",
    colors: { c1: "#bb8fce", c2: "#8e44ad" },
    desc: "Soft purple yarn. Gentle on the feet, fierce in play.",
  },
  {
    name: "Gold Medal",
    type: "suede",
    colors: { c1: "#f4d03f", c2: "#b7950b" },
    desc: "Championship gold. For when you're feeling legendary.",
  },
];

function createFootbag(sack, size) {
  const el = document.createElement("div");
  el.className = `footbag ${sack.type}`;
  el.style.setProperty("--size", `${size}px`);
  if (sack.colors.c1) el.style.setProperty("--c1", sack.colors.c1);
  if (sack.colors.c2) el.style.setProperty("--c2", sack.colors.c2);
  if (sack.colors.c3) el.style.setProperty("--c3", sack.colors.c3);
  return el;
}

function placeHeroFootbags() {
  const ring = document.getElementById("hero-footbags");
  const count = 18;
  const sacks = [...FOOTBAGS, ...FOOTBAGS].slice(0, count);

  sacks.forEach((sack, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const radiusX = 42 + (i % 3) * 4;
    const radiusY = 38 + (i % 2) * 5;
    const x = 50 + Math.cos(angle) * radiusX;
    const y = 48 + Math.sin(angle) * radiusY;

    const el = createFootbag(sack, 28 + (i % 4) * 6);
    el.style.left = `${x}%`;
    el.style.top = `${y}%`;
    el.style.setProperty("--rot", `${(angle * 180) / Math.PI}deg`);
    el.style.setProperty("--delay", `${i * 0.15}s`);
    ring.appendChild(el);
  });

  const armLeft = document.querySelector(".arm-left");
  const armRight = document.querySelector(".arm-right");
  FOOTBAGS.slice(0, 4).forEach((s) => armLeft.appendChild(createFootbag(s, 22)));
  FOOTBAGS.slice(4, 8).forEach((s) => armRight.appendChild(createFootbag(s, 22)));
}

function buildCollection() {
  const grid = document.getElementById("sack-grid");
  FOOTBAGS.forEach((sack) => {
    const card = document.createElement("article");
    card.className = "sack-card";
    card.innerHTML = `<h3>${sack.name}</h3><p>${sack.type}</p>`;
    card.prepend(createFootbag(sack, 56));
    card.addEventListener("click", () => openModal(sack));
    grid.appendChild(card);
  });
}

function openModal(sack) {
  const modal = document.getElementById("modal");
  const sackEl = document.getElementById("modal-sack");
  sackEl.innerHTML = "";
  sackEl.appendChild(createFootbag(sack, 80));
  document.getElementById("modal-title").textContent = sack.name;
  document.getElementById("modal-desc").textContent = sack.desc;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal").hidden = true;
  document.body.style.overflow = "";
}

function initModal() {
  document.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function animateStats() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll(".stat-num[data-target]").forEach((el) => {
          const target = +el.dataset.target;
          let current = 0;
          const step = Math.ceil(target / 40);
          const tick = () => {
            current = Math.min(current + step, target);
            el.textContent = current;
            if (current < target) requestAnimationFrame(tick);
          };
          tick();
        });
        observer.disconnect();
      });
    },
    { threshold: 0.3 }
  );
  const about = document.querySelector(".about");
  if (about) observer.observe(about);
}

placeHeroFootbags();
buildCollection();
initModal();
animateStats();
