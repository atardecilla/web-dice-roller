const NUM_DICE = 5; 
let diceValues = [0, 0, 0, 0, 0];
const API_URL = 'https://web-dice-api-ajdfhah2fhfhb2bn.centralus-01.azurewebsites.net';

async function rollDice() {
  const holdDice = [];
  for (let i = 0; i < NUM_DICE; i++) {
    holdDice[i] = document.getElementById(`hold${i+1}`).checked;
  }

  // Count how many dice need rolling
  const numToRoll = holdDice.filter(h => !h).length;
  if (numToRoll === 0) return; // nothing to roll

  try {
    const response = await fetch(`${API_URL}/roll/${numToRoll}`);
    if (!response.ok) throw new Error(`API returned ${response.status}`);
    const data = await response.json();

    // Fill diceValues only for unheld dice
    let rollIndex = 0;
    for (let i = 0; i < NUM_DICE; i++) {
      if (!holdDice[i]) {
        diceValues[i] = data.rolls[rollIndex];
        rollIndex++;
      }
      document.getElementById(`die${i+1}`).value = diceValues[i];
    }
  } catch (err) {
    console.error('Error fetching dice rolls:', err);
  }
}

// Wake-up API call on load
async function onloadAPI() {
  try {
    await fetch(`${API_URL}/roll/1`);
  } catch (err) {
    console.warn('Wake-up API call failed:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  onloadAPI(); // wake up API
  document.getElementById('rollBtn').addEventListener('click', rollDice);
  document.addEventListener('keydown', (e) => { if (e.key === "Enter") rollDice(); });

  rollDice(); // initial roll
});