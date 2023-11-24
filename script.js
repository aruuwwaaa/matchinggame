const cards = document.querySelectorAll(".card");
const subCards = document.querySelectorAll(".subCard");
let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;
let lastTime = null;

function startTimer(time) {
  const intervalId = startCountingTime(time);
  return intervalId;
}

const intervalId = startTimer(0);

function flipCard(e) {
  let clickedCard = e.target; //getting user clicked card

  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip");

    if (!cardOne) {
      return (cardOne = clickedCard); //return the cardOne value to clickedCard
    }
    cardTwo = clickedCard;

    disableDeck = true;

    let cardOneImg = cardOne.querySelector("img").src;
    let cardTwoImg = cardTwo.querySelector("img").src;
    let card1 = cardOneImg.slice(cardOneImg.length - 9);
    let card2 = cardTwoImg.slice(cardTwoImg.length - 9);

    matchCards(card1, card2);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    // if two cards img matched
    matchedCard++; //increment matched value by one
    console.log(matchedCard);
    if (matchedCard == 8) {
      // if matched value is 8 that means user has matched all the cards

      setTimeout(() => {
        clearInterval(intervalId);
        alert("Congratulations!");
        alert(lastTime);
        console.log(lastTime);
        lastTime = null;
        const ans = confirm("Do you wanna play again?");
        if (ans) {
          return shuffleCard();
        } else {
          return bye();
        }
      }, 500); //calling shuffleCard function after 1s
    }

    function bye() {
      alert("Bye bye!");
    }

    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = ""; //7.4
    return (disableDeck = false);
  } else {
    setTimeout(() => {
      // if two card not matched
      cardOne.classList.add("shake"); // adding shake class to both card after 400ms
      cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
      // removing both shake and flip classes from the both card after 1.2s
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = ""; //setting both card value to blank

      disableDeck = false;
    }, 1200);
  }
}

function shuffleCard() {
  console.log(lastTime);
  startTimer(0);
  matchedCard = 0;
  cardOne = cardTwo = "";

  let arr = [1, 2, 3, 4, 5, 6, 7, 8]; //creating array of 16 items and each item is repeated twice
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1)); //sorting array item randomly

  cards.forEach((card, index) => {
    //console.log(index);
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);

    let imgTag = card.querySelector("img");
    imgTag.src = `images/img-${arr[index]}.png`;
  });

  subCards.forEach((card, index) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);

    let imgTag = card.querySelector("img");
    imgTag.src = `subjects/img-${arr[index]}.png`;
  });
}
shuffleCard();

cards.forEach((card) => {
  // adding click event to all cards
  card.addEventListener("click", flipCard);
});

function startCountingTime(startTime) {
  let currentTime = startTime;

  const intervalId = setInterval(() => {
    currentTime += 1000; // Increment time by 1 second (1000 milliseconds)

    // Format the current time into hours, minutes, and seconds
    const hours = Math.floor(currentTime / 3600000); // 1 hour = 3600000 milliseconds
    const minutes = Math.floor((currentTime % 3600000) / 60000); // 1 minute = 60000 milliseconds
    const seconds = Math.floor((currentTime % 60000) / 1000);

    // Display the current time
    lastTime = `Time: ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, 1000); // Update time every 1 second (1000 milliseconds)

  // Return the interval ID so that you can stop the timer if needed
  console.log("Interval ID " + intervalId);
  return intervalId;
}

// Usage:
// const startTime = 0; // Start counting from 0 milliseconds
// const intervalId = startCountingTime(startTime);

// To stop the timer after a certain period (e.g., after 10 seconds):
// setTimeout(() => {
//   clearInterval(intervalId);
//   console.log("Timer stopped.");
// }, 10000); // Stop after 10 seconds (10000 milliseconds)
