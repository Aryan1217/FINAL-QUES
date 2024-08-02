// Total competition time in seconds (1 hour = 3600 seconds)
const totalCompetitionTime = 3600;
let timeLeft;

// Function to start the timer on both pages
function startTimer() {
    const timerElement = document.getElementById('timer');

    // Check if the timer has already started
    const startTime = localStorage.getItem('startTime');
    if (startTime) {
        // Calculate the elapsed time since the start
        const elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
        timeLeft = totalCompetitionTime - elapsedTime;

        // If time has expired, set timeLeft to 0
        if (timeLeft <= 0) {
            timeLeft = 0;
            timerElement.textContent = "Time's up!";
            if (window.location.pathname.includes('intermediate.html')) {
                // Redirect to bonus questions page if time runs out on intermediate questions
                window.location.href = 'bonus.html';
            }
        }
    } else {
        // If no start time is recorded, reset the timer
        timeLeft = totalCompetitionTime;
    }

    // Update the timer every second
    const countdown = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerElement.textContent = "Time's up!";
            // Redirect to bonus questions page if time runs out on intermediate questions
            if (window.location.pathname.includes('intermediate.html')) {
                window.location.href = 'bonus.html';
            }
        }

        timeLeft--;
    }, 1000);
}

// Function to initialize the timer
function initializeTimer() {
    // Start the timer when the page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startTimer);
    } else {
        startTimer();
    }
}

// Check if the page is 'questions.html', 'intermediate.html', or 'bonus.html' and initialize the timer accordingly
if (window.location.pathname.includes('questions.html') || window.location.pathname.includes('intermediate.html')) {
    initializeTimer();
}

// Add event listeners for navigation buttons
document.getElementById('nextBtn')?.addEventListener('click', function() {
    window.location.href = 'intermediate.html';
});

document.getElementById('backBtn')?.addEventListener('click', function() {
    window.location.href = 'questions.html';
});

document.getElementById('backToStartBtn')?.addEventListener('click', function() {
    localStorage.removeItem('startTime'); // Reset timer when navigating back to the start
    window.location.href = 'index.html';
});
