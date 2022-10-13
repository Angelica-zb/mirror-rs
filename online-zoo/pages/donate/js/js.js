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

//donate
const anotherAmount = document.querySelector('.another-amount');
let radioLabel = document.querySelectorAll('.radio-dot')
let radioSlider = document.querySelectorAll('.radio-slider')

for (let index = 0; index < radioLabel.length; index++) {
    let radio = radioSlider[index]
    let check = radioLabel[index]
    check.addEventListener('click', function(e) {
        anotherAmount.value = radio.value;
    })
}

anotherAmount.addEventListener('input', () => {
    var max_chars = 4;
    if (anotherAmount.value.length > max_chars) {
        anotherAmount.value = anotherAmount.value.substr(0, max_chars);
    }
    let val = anotherAmount.value
    for (let index = 0; index < radioSlider.length; index++) {
        let radio = radioSlider[index]
        if (val == radio.value) {
            radio.checked = true
        } else {
            radio.checked = false
        };
    }
})