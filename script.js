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
  }
  form.reset(); // Reset form fields
});
