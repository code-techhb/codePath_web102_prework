/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

import GAMES_DATA from "./games.js";
const GAMES_JSON = JSON.parse(GAMES_DATA);
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */
const gamesContainer = document.getElementById("games-container");

// function to add games to the page
function addGamesToPage(games) {
  gamesContainer.innerHTML = "";
  if (games.length === 0) {
    const noGameMessage = document.createElement("p");
    noGameMessage.textContent =
      " ☹️ Sorry, we don't have that game in our database yet.";
    noGameMessage.classList.add("no-game-message");
    gamesContainer.appendChild(noGameMessage);
  } else {
    games.forEach((game) => {
      const gameCard = document.createElement("div");
      gameCard.classList.add("game-card");
      gameCard.innerHTML = `
        <img src="${game.img}" alt="${game.name}" class="game-img" />
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <p>Backers: ${game.backers.toLocaleString()}</p>
      `;
      gamesContainer.appendChild(gameCard);
    });
  }
}
addGamesToPage(GAMES_JSON);

// Search functionality
document
  .getElementById("search-bar")
  .addEventListener("input", function (event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredGames = GAMES_JSON.filter((game) =>
      game.name.toLowerCase().includes(searchTerm)
    );
    deleteChildElements(gamesContainer);
    addGamesToPage(filteredGames);
  });

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

const totalContributions = GAMES_JSON.reduce(
  (total, game) => total + game.backers,
  0
);
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;
const raisedCard = document.getElementById("total-raised");

const raisedAmount = GAMES_JSON.reduce(
  (total, game) => total + game.pledged,
  0
);
raisedCard.innerHTML = `$${raisedAmount.toLocaleString()}`;

const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);
  const result = GAMES_JSON.filter((game) => game.pledged < game.goal);
  addGamesToPage(result);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);
  const result = GAMES_JSON.filter((game) => game.pledged > game.goal);
  addGamesToPage(result);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);
  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
const unfundedString =
  unfundedGames.length === 0
    ? "All of our games are fully funded!"
    : `We have ${unfundedGames.length} unfunded games. Pledge today to keep them going!`;
const unfundedElement = document.createElement("p");
unfundedElement.innerHTML = unfundedString;

const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
const totalGames = GAMES_JSON.length;
const unfundedCount = unfundedGames.length;

const summaryString = `We have raised a total of $${totalRaised.toLocaleString()} for ${totalGames} game${
  totalGames !== 1 ? "s" : ""
}. ${
  unfundedCount === 0
    ? "All of our games are fully funded!"
    : `We have ${unfundedCount} unfunded game${
        unfundedCount !== 1 ? "s" : ""
      }. Pledge today to keep them going!`
}`;

const summaryElement = document.createElement("p");
summaryElement.innerHTML = summaryString;
document.getElementById("description-container").appendChild(summaryElement);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

const [firstGame, secondGame] = sortedGames;

const firstGameElement = document.createElement("h2");
firstGameElement.innerHTML = firstGame.name;
firstGameContainer.appendChild(firstGameElement);
// runner up item
const secondGameElement = document.createElement("h2");
secondGameElement.innerHTML = secondGame.name;
secondGameContainer.appendChild(secondGameElement);
