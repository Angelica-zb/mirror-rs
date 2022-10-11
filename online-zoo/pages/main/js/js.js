alert('Здравстуй, проверяющий, прошу прощения, но работа не готова до конца, проверьте пожалуйста ближе к концу кросс - чека.Задержка произошла по причине болезни.Буду очень благодарна.Хорошего дня');
//бургер меню
let burgerButtons = document.querySelectorAll('.burger-button, .cross-bur, .bg-bur');
for (let index = 0; index < burgerButtons.length; index++) {
    const burgerButton = burgerButtons[index];
    const bgBur = document.querySelector('.bg-bur');
    const burgerMenu = document.querySelector('.burger-menu');
    burgerButton.addEventListener("click", function(e) {
        burgerMenu.classList.toggle('activ');
        bgBur.classList.toggle('burger-button-bg');
    });
}
//Pop-up
let testimonials = document.querySelectorAll('.testimonials-mark')
let testims = document.querySelectorAll('.testimonials-mark-container');
let bgActive = document.querySelector('.testimonials-mark-active');


for (let index = 0; index < testimonials.length; index++) {
    const testimonial = testimonials[index];
    const testim = testims[index];
    const bgTestimonial = document.querySelector('.bg-testimonials');
    testimonial.addEventListener("click", function(e) {
        bgTestimonial.classList.add('bg-testimonial-active');
        testimonial.classList.add('testimonials-active');
        testim.classList.add('testimonials-mark-active');

        // let copy = testimonial.importNode(true)
        // bgActive.appendChild(copy)
    });
}

let cross = document.querySelectorAll('.testimonials-cross-img, .bg-testimonials');
for (let index = 0; index < cross.length; index++) {
    const cros = cross[index];
    const bgTestimonial = document.querySelector('.bg-testimonials');
    cros.addEventListener("click", function(e) {
        bgTestimonial.classList.remove('bg-testimonial-active');
        let testimonials = document.querySelectorAll('.testimonials-mark')
        let testims = document.querySelectorAll('.testimonials-mark-container');
        for (let index = 0; index < testimonials.length; index++) {
            const testimonial = testimonials[index];
            const testim = testims[index];
            testimonial.classList.remove('testimonials-active');
            testim.classList.remove('testimonials-mark-active');
        }
    });
}

//скрол отзывов
const rangeTestimonials = document.querySelector('.range-testimonials');
const testimonialsСontainer = document.querySelector('.testimonials-container');
const testimonialsMarkContainer = document.querySelector('.testimonials-mark-container');
rangeTestimonials.addEventListener('input', () => {
    rangeTestimonials.max = (window.matchMedia('(max-width: 1200px)').matches) ? '9' : '8';
    let value = rangeTestimonials.value;
    let offsetL = (testimonialsMarkContainer.offsetWidth + 28) * (value - 1);
    testimonialsСontainer.style.right = offsetL + 'px';
});

//