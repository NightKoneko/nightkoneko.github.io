//where to put this stuff eh just put it at the beginning lol
let catSayInput = document.querySelector("#generateCat");
catSayInput.addEventListener("click", generate_random_cat);
const hintBox = document.querySelector("#hintBox");

//handle random cat breed und fact generation
async function get_random_cat() {
  const name_url = "https://api.thecatapi.com/v1/breeds";
  const name_response = await fetch(name_url);
  const name_response_json = await name_response.json();
  const randomBreed = name_response_json[Math.floor(Math.random() * name_response_json.length)];
  const breedName = randomBreed.name;
  const breedId = randomBreed.id;
  //me when breed_id endpoint exists
  const url = `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  const cat_image_url = responseJson[0].url;

  const description_url = "https://catfact.ninja/fact";
  const description_response = await fetch(description_url);
  const description_response_json = await description_response.json();
  const cat_description = description_response_json.fact;
  return {
    "image": cat_image_url,
    "name": breedName,
    "id": breedId,
    "description": cat_description
  };
}

//fixed
function generate_random_cat() {
  document.getElementById("correct").style.display = 'none';
  document.getElementById("incorrect").style.display = 'none';
  hintBox.innerHTML = "";
  const guessBox = document.querySelector("#guessBox");
  guessBox.value = '';
  const cat_info = get_random_cat();
  cat_info.then(function(result) {
    const cat_image = result.image;
    const cat_name = result.name;
    const cat_description = result.description;
    const containercatimage = document.querySelector("#catContainerImage");
    containercatimage.innerHTML = `
        <img style="width: 25%" src="${cat_image}" alt="Random cat image">`;
    const containerthecatname = document.querySelector("#theCatName");
    containerthecatname.innerHTML = `
    <h1>${cat_name}</h1>`;
    const factercat = document.querySelector("#facter");
    factercat.innerHTML = `
    <h3>Here is your cat fact:</h3>`;
    const containerthedescription = document.querySelector("#theDescription");
    containerthedescription.innerHTML = `
    <p>${cat_description}</p>`;
    document.getElementById("guessy").style.display = 'block'
    document.getElementById("theCatName").style.display = 'none';
    document.getElementById("facter").style.display = 'none';
    document.getElementById("theDescription").style.display = 'none';

    // Initialize or retrieve current score
    let score = localStorage.getItem("catGuessScore");
    if (score === null) {
      score = 0; // If no score is found, start at 0
      localStorage.setItem("catGuessScore", score);
    }
    updateScoreDisplay(score); // Update score display on the page

    // handle guess submission
    const guessBtn = document.querySelector("#submitGuess");
    guessBtn.onclick = function() {
      const userGuess = guessBox.value.toLowerCase(); // convert to lowercase
      if (userGuess === cat_name.toLowerCase()) {
        document.getElementById("theCatName").style.display = 'block';
        document.getElementById("facter").style.display = 'block';
        document.getElementById("theDescription").style.display = 'block';
        document.getElementById("correct").style.display = 'block';
        document.getElementById("incorrect").style.display = 'none';
        updateScore(1); // Increase score
      } else {
        document.getElementById("incorrect").style.display = 'block';
        updateScore(-1); // Decrease score
      }
    }

    // handle hint button
    const hintBtn = document.querySelector("#hintButton");
    const catNameLetters = cat_name.split('');
    let hintIndex = 0;
    hintBtn.onclick = function() {
      const hintBox = document.querySelector("#hintBox");
      if (hintIndex < catNameLetters.length) {
        hintBox.innerHTML += catNameLetters[hintIndex];
        hintIndex++;
      } else {
        hintBox.innerHTML = "No more hints available!";
      }
    }
  });
}

function updateScore(change) {
  let currentScore = parseInt(localStorage.getItem("catGuessScore"), 10);
  currentScore += change;
  localStorage.setItem("catGuessScore", currentScore.toString());
  updateScoreDisplay(currentScore);
}

function updateScoreDisplay() {
  // Fetch the score directly within the function
  let score = localStorage.getItem("catGuessScore");
  if (score === null) {
    score = 0; // If no score is found, start at 0
  }
  const scoreDisplay = document.querySelector("#score");
  scoreDisplay.innerHTML = `Score: ${score}`;
}

// This ensures your score is updated as soon as the page loads
document.addEventListener("DOMContentLoaded", function() {
  updateScoreDisplay();
});

document.addEventListener("DOMContentLoaded", function() {
  updateScoreDisplay(); // Make sure this is called to update the score on page load

  // Add an event listener to the reset button
  const resetButton = document.querySelector("#resetScore");
  resetButton.addEventListener("click", function() {
    resetScore(); // Call the resetScore function when the button is clicked
  });
});

function resetScore() {
  localStorage.setItem("catGuessScore", "0"); // Reset the score in localStorage
  updateScoreDisplay(); // Update the score display on the page
}