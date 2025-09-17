const NUM_DICE = 5;
let diceValues = [0, 0, 0, 0, 0];

function rollDice() {
  let total = 0;
  for (let i = 0; i < NUM_DICE; i++) {
    const hold = document.getElementById(`hold${i+1}`).checked;
    if (!hold) {
      diceValues[i] = Math.floor(Math.random() * 6) + 1;
    }
    document.getElementById(`die${i+1}`).value = diceValues[i];
    total += diceValues[i];
  }
  document.getElementById("rollBtn").focus();
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize dice values on first load
  for (let i = 0; i < NUM_DICE; i++) {
    diceValues[i] = Math.floor(Math.random() * 6) + 1;
    document.getElementById(`die${i+1}`).value = diceValues[i];
    document.getElementById(`hold${i+1}`).checked = false;
  }
  document.getElementById("rollBtn").addEventListener("click", rollDice);
  // Allow Enter key to roll dice
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      rollDice();
    }
  });
});