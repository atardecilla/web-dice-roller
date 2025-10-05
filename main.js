//5 dice, creates a list starting values to 0
const NUM_DICE = 5; 
let diceValues = [0, 0, 0, 0, 0];
//API - hosted on azure and is being called here
const API_URL = 'web-dice-api-ajdfhah2fhfhb2bn.centralus-01.azurewebsites.net';

async function rollDice() { //async function because it fetches API data
  // Get hold checkboxes
  const holdDice = []; //array to store hold status
  for (let i = 0; i < NUM_DICE; i++) { // for each dice, check if hold is checked
    holdDice[i] = document.getElementById(`hold${i+1}`).checked;
  }

  try { //try block to fetch dice rolls from api
    const response = await fetch(`${API_URL}/roll/${NUM_DICE}`);
    const data = await response.json();

    //update dice values if not held
    for (let i = 0; i < NUM_DICE; i++) {
      if (!holdDice[i]) diceValues[i] = data.rolls[i];
      document.getElementById(`die${i+1}`).value = diceValues[i];
    }
  } catch (err) { // error catch block
    console.error('Error fetching dice rolls:', err);
  }
}

//call API on loading the page
async function onloadAPI() {
  try {
    await fetch(`${API_URL}/roll/1`);
  } catch (err) {
    console.warn('Wake-up API call failed:', err);
  }
}

//initialize
document.addEventListener('DOMContentLoaded', () => {
  onloadAPI(); //Call API once on load

  document.getElementById('rollBtn').addEventListener('click', rollDice);
  document.addEventListener('keydown', (e) => { //allows enter key to roll the dice
    if (e.key === "Enter") rollDice();
  });
  //Initial roll
  rollDice();
});