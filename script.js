// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Track attendance
let count = 0;
const maxCount = 50;

// Handle Form Submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  //Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  // Increment count only if max not reached
  if (count < maxCount) {
    count++;
    // Update attendee count display
    const attendeeCountSpan = document.getElementById("attendeeCount");
    attendeeCountSpan.textContent = count;
    // Update Progress Bar visually
    const progressBar = document.getElementById("progressBar");
    const percent = (count / maxCount) * 100;
    progressBar.style.width = `${percent}%`;
    // Update team counter
    const teamCounter = document.getElementById(team + "Count");
    teamCounter.textContent = parseInt(teamCounter.textContent) + 1;
    // Show welcome message
    const greeting = document.getElementById("greeting");
    greeting.textContent = `Welcome, ${name} from ${teamName}!`;
    greeting.className = "success-message";
    greeting.style.display = "block";

    // If attendance reaches max, show celebration and winning team
    if (count === maxCount) {
      // Get team counts
      const waterCount = parseInt(
        document.getElementById("waterCount").textContent
      );
      const zeroCount = parseInt(
        document.getElementById("zeroCount").textContent
      );
      const powerCount = parseInt(
        document.getElementById("powerCount").textContent
      );
      let winningTeam = "";
      let winningEmoji = "";
      let winningCardId = "";
      if (waterCount >= zeroCount && waterCount >= powerCount) {
        winningTeam = "Team Water Wise";
        winningEmoji = "🌊";
        winningCardId = "water";
      } else if (zeroCount >= waterCount && zeroCount >= powerCount) {
        winningTeam = "Team Net Zero";
        winningEmoji = "🌿";
        winningCardId = "zero";
      } else {
        winningTeam = "Team Renewables";
        winningEmoji = "⚡";
        winningCardId = "power";
      }
      greeting.textContent = `🎉 All 50 attendees checked in! ${winningEmoji} ${winningTeam} has the most members! 🎉`;
      greeting.className = "success-message";
      greeting.style.display = "block";
      // Highlight winning team card
      document.querySelectorAll(".team-card").forEach(function (card) {
        card.style.border = "none";
        card.style.boxShadow = "none";
      });
      const winnerCard = document.querySelector(`.team-card.${winningCardId}`);
      if (winnerCard) {
        winnerCard.style.border = "3px solid gold";
        winnerCard.style.boxShadow = "0 0 18px gold";
      }
    }
  }
  form.reset(); // Reset form fields
});
