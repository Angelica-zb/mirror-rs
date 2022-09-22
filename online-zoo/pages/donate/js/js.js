//бургер меню
let burgerButtons = document.querySelectorAll('.burger-button, .cross-bur, .burger-nav-item, .bg-bur');
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

//pop up форма         
const loginButtons = document.querySelector('.login-buttons');
const popupRegister = document.querySelector('.popup-register');
const loginButtonsL = document.querySelector('.login-buttons-login');
const popupRegisterL = document.querySelector('.popup-register-login');
const LogPopUp = document.querySelector('.login-popup');
const popUp = document.querySelector('.pop-up');
const bgBur = document.querySelector('.bg-popup');
const form = document.forms[0];


let PopUps = document.querySelectorAll('.login, .account');
if (PopUps.length > 0) {

    for (let index = 0; index < PopUps.length; index++) {
        const loginUp = PopUps[index];


        loginUp.addEventListener("click", function(e) {
            popUp.classList.toggle('popup-activ');
            bgBur.classList.toggle('bg-popup-active');

        });
    }
};

//изменение формы pop up 
let PopL = document.querySelectorAll('.login-a-register');
if (PopL.length > 0) {

    for (let index = 0; index < PopL.length; index++) {
        const loginUp = PopL[index];



        loginUp.addEventListener("click", function(e) {

            loginButtons.classList.toggle('done');
            popupRegister.classList.toggle('done');
            loginButtonsL.classList.toggle('done');
            popupRegisterL.classList.toggle('done');
            LogPopUp.classList.toggle('login-popup-active');
        });
    }
};

//обнулениие изменения при скрытии
bgBur.addEventListener("click", function(e) {
    popUp.classList.remove('popup-activ');
    setTimeout(function() {
        loginButtons.classList.add('done');
        popupRegister.classList.add('done');
        loginButtonsL.classList.remove('done');
        popupRegisterL.classList.remove('done');
        LogPopUp.classList.remove('login-popup-active');
        bgBur.classList.remove('bg-popup-active');
        form.reset();
    }, 500)
});

//alert заполненной формы
let inputMail = document.querySelector('.login-in-mail');
let inputPas = document.querySelector('.login-in-password');
let popupButton = document.querySelector('.login-popup-button');

popupButton.addEventListener("click", function(e) {
    alert(`Email: ${inputMail.value}\nPassword: ${inputPas.value}`);
});

//слайдер
let offset = 0;
let offset2 = 0;
let offset3 = 0;
const allSlid = document.querySelector('.all-slide');
const slide = document.querySelector('.slide');
const dot = document.querySelector('.slide-dot-active');
const dotM = document.querySelector('.slide-dot-active-mobile');
// const dotFirst = document.querySelector('.slide-dot-first');
// const dotLast = document.querySelector('.slide-dot-last');
// const dotCenter = document.querySelector('.slide-dot-center');

document.querySelector('.arrow-left').addEventListener('click', function() {
    offset = offset + slide.offsetWidth;
    if (offset > slide.offsetWidth) {
        offset = 0;
    }
    allSlid.style.left = offset + 'px';

    offset2 = offset2 - 30;
    if (-offset2 > 30) {
        offset2 = 0;
    }
    dot.style.left = offset2 + 'px';

    offset3 = offset3 - 14;
    if (-offset3 > 14) {
        offset3 = 0;
    }
    dotM.style.left = offset3 + 'px';

    // dotFirst.classList.toggle('slide-dot-active');
    // dotCenter.classList.toggle('slide-dot-active');

});

document.querySelector('.arrow-right').addEventListener('click', function() {
    offset = offset - slide.offsetWidth;
    if (-offset > slide.offsetWidth) {
        offset = 0;
    }
    allSlid.style.left = offset + 'px';

    offset2 = offset2 + 30;
    if (offset2 > 30) {
        offset2 = 0;
    }
    dot.style.left = offset2 + 'px';

    offset3 = offset3 + 14;
    if (offset3 > 14) {
        offset3 = 0;
    }
    dotM.style.left = offset3 + 'px';
    // dotLast.classList.toggle('slide-dot-active');
    // dotCenter.classList.toggle('slide-dot-active');
});