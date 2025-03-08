const defaults = () => {
    const defaultHtml = `<div class="container">
  <div class="card">
    <div class="card-header">
      <h1>Interactive Code Editor</h1>
      <p class="subtitle">Edit and see changes in real-time</p>
    </div>
    <div class="card-body">
      <div class="profile">
        <div class="avatar">
          <div class="initial">C</div>
        </div>
        <div class="info">
          <h2>Welcome!</h2>
          <p>This is a live preview of your code.</p>
        </div>
      </div>
      <div class="actions">
        <button id="primary-btn" class="btn primary">Change Theme</button>
        <button id="secondary-btn" class="btn secondary">Animate</button>
      </div>
      <div class="status">Ready to code!</div>
    </div>
  </div>
</div>`;

    const defaultCss = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  transition: all 0.3s ease;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f7f9fc;
  color: #333;
  padding: 20px;
  line-height: 1.6;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.card-header {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 5px;
}

.subtitle {
  font-size: 14px;
  opacity: 0.8;
}

.card-body {
  padding: 20px;
}

.profile {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, #a777e3, #6e8efb);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.initial {
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.info h2 {
  font-size: 18px;
  margin-bottom: 5px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  flex-grow: 1;
}

.primary {
  background: #6e8efb;
  color: white;
}

.secondary {
  background: transparent;
  color: #6e8efb;
  border: 1px solid #6e8efb;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.status {
  text-align: center;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 5px;
  font-size: 14px;
  color: #666;
}

/* Dark theme classes that will be toggled */
.dark-theme {
  background-color: #1a1a2e;
  color: #e6e6e6;
}

.dark-theme .card {
  background: #16213e;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.dark-theme .status {
  background: #0f3460;
  color: #e6e6e6;
}

/* Animation class */
.animate {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}`;

    const defaultJs = `// Interactive elements
const themeButton = document.getElementById('primary-btn');
const animateButton = document.getElementById('secondary-btn');
const container = document.querySelector('.container');
const card = document.querySelector('.card');
const status = document.querySelector('.status');

// Theme toggle
let isDarkTheme = false;
themeButton.addEventListener('click', () => {
  isDarkTheme = !isDarkTheme;
  document.body.classList.toggle('dark-theme', isDarkTheme);
  container.classList.toggle('dark-theme', isDarkTheme);
  
  // Update status and button text
  status.textContent = isDarkTheme ? 'Dark theme activated!' : 'Light theme activated!';
  themeButton.textContent = isDarkTheme ? 'Light Theme' : 'Dark Theme';
  
  // Change status background color with animation
  status.style.transition = 'background-color 0.5s, color 0.5s';
  
  // Log to console
  console.log('Theme changed to:', isDarkTheme ? 'dark' : 'light');
});

// Animation toggle
let isAnimating = false;
animateButton.addEventListener('click', () => {
  isAnimating = !isAnimating;
  card.classList.toggle('animate', isAnimating);
  
  // Update status and button text
  status.textContent = isAnimating ? 'Animation started!' : 'Animation stopped!';
  animateButton.textContent = isAnimating ? 'Stop' : 'Animate';
  
  // Log to console
  console.log('Animation:', isAnimating ? 'started' : 'stopped');
});

// Add some interactivity to the avatar
const avatar = document.querySelector('.avatar');
const initial = document.querySelector('.initial');
const letters = 'CODEXY';
let currentIndex = 0;

avatar.addEventListener('click', () => {
  // Change the initial letter
  currentIndex = (currentIndex + 1) % letters.length;
  initial.textContent = letters[currentIndex];
  
  // Add a brief scaling effect
  avatar.style.transform = 'scale(1.2)';
  setTimeout(() => {
    avatar.style.transform = 'scale(1)';
  }, 200);
  
  // Update status
  status.textContent = 'Avatar updated: ' + letters[currentIndex];
  
  // Log to console
  console.log('Avatar initial changed to:', letters[currentIndex]);
});

// Initialize with a welcome message
console.log('Interactive demo loaded successfully!');
status.textContent = 'Ready to code! Click buttons to see actions.';`;

    return [ defaultHtml, defaultCss, defaultJs ];
}

export default defaults;