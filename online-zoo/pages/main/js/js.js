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

for (let index = 0; index < testimonials.length; index++) {
    const testimonial = testimonials[index];
    const testim = testims[index];
    const bgTestimonial = document.querySelector('.bg-testimonials');
    testimonial.addEventListener("click", function(e) {
        bgTestimonial.classList.add('bg-testimonial-active');
        testimonial.classList.add('testimonials-active');
        testim.classList.add('testimonials-mark-active');
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