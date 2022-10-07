//бургер меню
let burgerButtons = document.querySelectorAll('.burger-button, .cross-bur, .bg-bur');
if (burgerButtons.length > 0) {
    for (let index = 0; index < burgerButtons.length; index++) {
        const burgerButton = burgerButtons[index];
        const bgBur = document.querySelector('.bg-bur');
        const burgerMenu = document.querySelector('.burger-menu');
        burgerButton.addEventListener("click", function(e) {
            burgerMenu.classList.toggle('activ');
            bgBur.classList.toggle('burger-button-bg');
        });
    }
};