const toggleBtn = document.querySelector('.navbar_toogleBtn');
const upper = document.querySelector('.navbar_upper');
const icons = document.querySelector('.navbar_icons');

toggleBtn.addEventListener('click', () => {
    upper.classList.toggle('active');
    icons.classList.toggle('active');
});
