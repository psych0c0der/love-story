document.addEventListener("DOMContentLoaded", () => {
  const questionEl = document.getElementById("question");
  const overlay = document.getElementById("overlay");
  const finalScene = document.getElementById("finalScene");
  const finalImagePopup = document.getElementById("finalImagePopup");
  const lovePopup = document.getElementById("lovePopup");
  const noPopup = document.getElementById("noPopup");
  const floatContainer = document.getElementById("floatContainer");
  const imageContainer = document.getElementById("imageContainer");

  const loveSound = document.getElementById("loveSound");
  const bgMusic = document.getElementById("bgMusic");
  const finalSong = document.getElementById("finalSong");

  const yesButtons = document.querySelectorAll(".yes");
  const nope = document.getElementById("nope");

  /* Floating emojis */
  const emojis = ["💖","💕","💋","🌸","🌷","🌹","😘","💐"];
  setInterval(() => {
    const span = document.createElement("span");
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.left = Math.random() * 100 + "vw";
    span.style.animationDuration = 8 + Math.random() * 6 + "s";
    floatContainer.appendChild(span);
    setTimeout(() => span.remove(), 15000);
  }, 700);

  const questions = [
    "Are you ready for this? 💖✨",
    "Cook together and steal bites? 🍳",
    "Late night walks and talks? 🌙",
    "Dance for no reason? 💃",
    "Play games together? 🎮",
    "Travel the world together? 🌍",
    "Grow old holding hands? 👵👴",
    "Annoy each other daily? 😜",
    "Choose me every day? 💖",
    "Do you agree to be loved forever? ♾️💞"
  ];

  let index = 0;
  let musicStarted = false;
  questionEl.textContent = questions[index];

  function showLovePopup() {
    loveSound.currentTime = 0;
    loveSound.volume = 0.6;
    loveSound.play().catch(()=>{});
    lovePopup.style.visibility = "visible";
    lovePopup.style.opacity = "1";
    setTimeout(() => {
      lovePopup.style.opacity = "0";
      lovePopup.style.visibility = "hidden";
    }, 1200);
  }

  function startImages() {
    let current = 0;
    const last = 40;
    const padding = 24;
    const usedPositions = [];

    function getPos(size) {
      const maxX = window.innerWidth - size - padding;
      const maxY = window.innerHeight - size - padding;
      return {
        x: Math.random() * maxX,
        y: Math.random() * maxY
      };
    }

    const interval = setInterval(() => {
      if (current > last) {
        clearInterval(interval);
        setTimeout(() => {
          finalImagePopup.classList.remove("hidden");
        }, 2000);
        return;
      }

      const img = document.createElement("img");
      img.src = `kabu/${current}.jpg`;
      img.className = "memory-img";

      const size = 150 + Math.random() * 80;
      img.style.width = size + "px";

      img.onload = () => {
        const pos = getPos(size);
        img.style.left = pos.x + "px";
        img.style.top = pos.y + "px";
        imageContainer.appendChild(img);
      };

      current++;
    }, 2000);
  }

  function next() {
    showLovePopup();

    if (!musicStarted && index === 0) {
      bgMusic.volume = 0.35;
      bgMusic.play().catch(()=>{});
      musicStarted = true;
    }

    index++;

    if (index < questions.length) {
      questionEl.textContent = questions[index];
    } else {
      bgMusic.pause();
      finalSong.volume = 0.5;
      finalSong.play().catch(()=>{});
      overlay.style.display = "none";
      finalScene.classList.remove("hidden");
      setTimeout(startImages, 1500);
    }
  }

  yesButtons.forEach(btn => btn.addEventListener("click", next));
});
