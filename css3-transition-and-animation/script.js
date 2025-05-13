const themeToggle = document.getElementById('themeToggle');
const animationBox = document.getElementById('animationBox');
const animatedElement = animationBox.querySelector('.animated-element');
const bounceBtn = document.getElementById('bounceBtn');
const rotateBtn = document.getElementById('rotateBtn');
const fadeBtn = document.getElementById('fadeBtn');
const preferencesForm = document.getElementById('preferencesForm');
const preferencesDisplay = document.getElementById('preferencesDisplay');
const visitCount = document.getElementById('visitCount');

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    }
}

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Animation Controls
function removeAllAnimations() {
    animatedElement.classList.remove('bounce', 'rotate', 'fade');
}

bounceBtn.addEventListener('click', () => {
    removeAllAnimations();
    animatedElement.classList.add('bounce');
});

rotateBtn.addEventListener('click', () => {
    removeAllAnimations();
    animatedElement.classList.add('rotate');
});

fadeBtn.addEventListener('click', () => {
    removeAllAnimations();
    animatedElement.classList.add('fade');
});

// User Preferences
function savePreferences(event) {
    event.preventDefault();
    
    const userName = document.getElementById('userName').value;
    const favoriteColor = document.getElementById('favoriteColor').value;
    
    const preferences = {
        userName,
        favoriteColor,
        lastUpdated: new Date().toLocaleString()
    };
    
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    displayPreferences();
}

function displayPreferences() {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        preferencesDisplay.innerHTML = `
            <h3>Saved Preferences:</h3>
            <p>Name: ${preferences.userName}</p>
            <p>Favorite Color: <span style="color: ${preferences.favoriteColor}">${preferences.favoriteColor}</span></p>
            <p>Last Updated: ${preferences.lastUpdated}</p>
        `;
    }
}

// Visit Counter
function updateVisitCount() {
    let count = localStorage.getItem('visitCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitCount', count);
    visitCount.textContent = count;
}

// Initialize
function init() {
    initTheme();
    displayPreferences();
    updateVisitCount();
    
    // Load saved preferences into form
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        document.getElementById('userName').value = preferences.userName || '';
        document.getElementById('favoriteColor').value = preferences.favoriteColor || '#000000';
    }
}

// Event Listeners
preferencesForm.addEventListener('submit', savePreferences);

// Initialize the application
init();
