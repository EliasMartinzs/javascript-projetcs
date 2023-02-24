const switchToggle = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

const toggleDarkLight = function (isDark) {
  nav.style.backgroundColor = isDark
    ? 'rgba(0, 0, 0 / 50%)'
    : 'rgba(255, 255, 255 / 50%)';
  textBox.style.backgroundColor = isDark
    ? 'rgba (255 ,255 ,255 /50%)'
    : 'rgba(0, 0, 0 / 50%)';
  toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode';
  isDark
    ? toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon')
    : toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
  isDark ? imageColor('dark') : imageColor('light');
};

const imageColor = function (color) {
  image1.src = `src/assets/undraw_proud_coder_${color}.svg`;
  image2.src = `src/assets/undraw_feeling_proud_${color}.svg`;
  image3.src = `src/assets/undraw_conceptual_idea_${color}.svg`;
};

// Switch Btn
function switchBtn(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleDarkLight(true);
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    toggleDarkLight(false);
  }
}

// Event Listeners
switchToggle.addEventListener('change', switchBtn);
