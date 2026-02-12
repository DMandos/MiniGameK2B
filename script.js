const bgMusic = new Audio("sounds/background.mp3");
bgMusic.loop = true;
//bgMusic.volume = 1; // χαμηλή ένταση παιζεις με δεκαδικα
const intro = document.getElementById("intro");
const introVideo = document.getElementById("introVideo");
const container = document.getElementById("container");
const endScreen = document.getElementById("endScreen");
const cards = document.querySelectorAll(".card");
const musicToggle = document.getElementById("musicToggle");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;


const startMusic = () => {
   bgMusic.play();
    document.removeEventListener("click", startMusic);
};

document.addEventListener("click", startMusic);


let musicMuted = false;

musicToggle.textContent = "🔊";

musicToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // να μη μετράει σαν game click

    musicMuted = !musicMuted;
    bgMusic.muted = musicMuted;

    musicToggle.textContent = musicMuted ? "🔇" : "🔊";
});


container.style.display = "none"; // κρύψε game αρχικά


introVideo.addEventListener("click", () => {
    introVideo.play();
});


introVideo.onended = () => {
    intro.classList.add("fadeOut");

    setTimeout(() => {
        intro.style.display = "none";
        container.style.display = "block";
        shuffleCard(); // start game
    }, 800);
};



function flipCard({ target: clickedCard }) {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;

        let img1 = cardOne.querySelector(".back-view img").src;
        let img2 = cardTwo.querySelector(".back-view img").src;
        matchCards(img1, img2);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        new Audio("sounds/correct.mp3").play();

        if (matched === 10) {
            container.style.backgroundColor = "#0ad600";
            setTimeout(() => {
            container.style.backgroundColor = "whitesmoke";
        }, 1000);
            endGame();
        }

        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disableDeck = false;
        return;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
        new Audio("sounds/buzzer.mp3").play();
        container.style.backgroundColor = "#e3242b";
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
        container.style.backgroundColor = "whitesmoke";
    }, 1200);
}

function endGame() {

    setTimeout(() => {
        container.style.display = "none";
        endScreen.style.display = "block";
        
        //const audio = new Audio("sounds/magkas.mp3");
        //audio.play();

        endScreen.addEventListener("click", () => {
            window.open("https://b2b.kotsovolos.gr", "_blank");
        }, { once: false });

    }, 1200);

    setTimeout(() => {
        endScreen.style.display = "none";
        container.style.display = "block";
        document.body.style.backgroundImage = "url('images/bgrnd.jpg')";
        shuffleCard();
    }, 200000);
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";

    let arr = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10];
    arr.sort(() => Math.random() - 0.5);

    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let img = card.querySelector(".back-view img");
        img.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();
cards.forEach(card => card.addEventListener("click", flipCard));



const floatingImages = [
  {
    normal: "images/fly-1.png",
    hover: "images/fly-1b.png"
  },
  {
    normal: "images/fly-2.png",
    hover: "images/fly-2b.png"
  },
  {
    normal: "images/fly-3.png",
    hover: "images/fly-3b.png"
  },
  {
    normal: "images/fly-4.png",
    hover: "images/fly-4b.png"
  }
];

function spawnFloatingImage() {
  const data = floatingImages[Math.floor(Math.random() * floatingImages.length)];

  const wrapper = document.createElement("div");
  wrapper.className = "floating-img";

  // random Y
  wrapper.style.top = Math.random() * 60 + 10 + "%";

  const img = document.createElement("img");
  img.src = data.normal;

  img.addEventListener("mouseenter", () => {
    img.src = data.hover;
  });

  img.addEventListener("mouseleave", () => {
    img.src = data.normal;
  });

  wrapper.appendChild(img);
  document.body.appendChild(wrapper);

  // remove after 4s
  setTimeout(() => {
    wrapper.remove();
  }, 4000);
}


function floatingLoop() {
  spawnFloatingImage();

  const nextTime = Math.random() * 20000 + 9000; //+ 20000;  20–40s
  setTimeout(floatingLoop, nextTime);
}

// ξεκίνα ΜΟΝΟ όταν αρχίσει το παιχνίδι
introVideo.onended = () => {
  intro.classList.add("fadeOut");

  setTimeout(() => {
    intro.style.display = "none";
    container.style.display = "block";
    shuffleCard();
    floatingLoop();
  }, 800);
};


