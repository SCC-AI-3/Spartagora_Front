const toggleBtn = document.querySelector('.Navbar_toogleBtn');
const upper = document.querySelector('.Navbar_upper');

toggleBtn.addEventListener('click', () => {
    upper.classList.toggle('active');
});
