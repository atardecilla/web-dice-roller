//5 dice, creates a list starting values to 0
const NUM_DICE = 5; 
let diceValues = [0, 0, 0, 0, 0];

// Function to roll the dice and update values
function rollDice() {
  //check which dice are being held (ensures they are not rolled)
  for (let i = 0; i < NUM_DICE; i++) {
    const hold = document.getElementById(`hold${i+1}`).checked;
    if (!hold) { //if not hold, they will be rolled to a random number 1-6
      diceValues[i] = Math.floor(Math.random() * 6) + 1;
    }
    document.getElementById(`die${i+1}`).value = diceValues[i];
  }
  document.getElementById("rollBtn").focus(); 
}

//Initialize the game after fully loading
document.addEventListener("DOMContentLoaded", () => {
  // Initialize dice values on first load
  for (let i = 0; i < NUM_DICE; i++) {
    diceValues[i] = Math.floor(Math.random() * 6) + 1; 
    document.getElementById(`die${i+1}`).value = diceValues[i];
    document.getElementById(`hold${i+1}`).checked = false;
  }
  document.getElementById("rollBtn").addEventListener("click", rollDice); //gives roll button functionality
  // Allows the Enter key to roll dice
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      rollDice(); //runs rollDice function after hitting enter
    }
  });
});