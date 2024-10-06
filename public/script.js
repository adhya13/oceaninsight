// script.js

// Example: Handling the explore button click to scroll to the featured data section
document.querySelector('.explore-btn').addEventListener('click', () => {
    document.querySelector('.featured').scrollIntoView({ behavior: 'smooth' });
});
