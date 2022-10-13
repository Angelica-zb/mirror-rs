// alert('Здравстуй, проверяющий, прошу прощения, но работа не готова до конца, проверьте пожалуйста ближе к концу кросс - чека.Задержка произошла по причине болезни.Буду очень благодарна.Хорошего дня');
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
rangeTestimonials.max = (window.matchMedia('(max-width: 1200px)').matches) ? '9' : '8';
rangeTestimonials.addEventListener('input', () => {

    let value = rangeTestimonials.value;
    let offsetL = (testimonialsMarkContainer.offsetWidth + 28) * (value - 1);
    testimonialsСontainer.style.right = offsetL + 'px';
});

//slider
const animals = [{
        'id': '1',
        'img': '../../assets/images/petstory/sect3/Rectangle 5-5.jpg',
        'name': 'giant Pandas',
        'local': 'Native to Southwest China',
        'icon': '../../assets/images/petstory/sect3/svg/banana-bamboo_icon.svg',
        'altIcon': 'banana and bamboo',
        'type': 'vegan',
    },
    {
        'id': '2',
        'img': '../../assets/images/petstory/sect3/Rectangle 5-1.jpg',
        'name': 'Eagles',
        'local': 'Native to South America',
        'icon': '../../assets/images/petstory/sect3/svg/meet-fish_icon.svg',
        'altIcon': 'meet and fish',
        'type': 'meet',
    },
    {
        'id': '3',
        'img': '../../assets/images/petstory/sect3/Rectangle 5-4.jpg',
        'name': 'Gorillas',
        'local': 'Native to Congo',
        'icon': '../../assets/images/petstory/sect3/svg/banana-bamboo_icon.svg',
        'altIcon': 'banana and bamboo',
        'type': 'vegan',
    },
    {
        'id': '4',
        'img': '../../assets/images/petstory/sect3/Rectangle 5-2.jpg',
        'name': 'Two-toed Sloth',
        'local': 'Mesoamerica, South America',
        'icon': '../../assets/images/petstory/sect3/svg/banana-bamboo_icon.svg',
        'altIcon': 'banana and bamboo',
        'type': 'vegan',
    },
    {
        'id': '5',
        'img': '../../assets/images/petstory/sect3/Rectangle 5-3.jpg',
        'name': 'cheetahs',
        'local': 'Native to Africa',
        'icon': '../../assets/images/petstory/sect3/svg/meet-fish_icon.svg',
        'altIcon': 'meet and fish',
        'type': 'meet',
    },
    {
        'id': '6',
        'img': '../../assets/images/petstory/sect3/Rectangle 5.jpg',
        'name': 'Penguins',
        'local': 'Native to Antarctica',
        'icon': '../../assets/images/petstory/sect3/svg/meet-fish_icon.svg',
        'altIcon': 'meet and fish',
        'type': 'meet',
    },
    {
        'id': '7',
        'img': '../../assets/images/petstory/sect3/Rectangle 5-6.jpg',
        'name': 'Alligators',
        'local': 'Native to Southeastern U. S.',
        'icon': '../../assets/images/petstory/sect3/svg/meet-fish_icon.svg',
        'altIcon': 'meet and fish',
        'type': 'meet',
    },
    {
        'id': '8',
        'img': '../../assets/images/petstory/sect3/Rectangle 5-7.jpg',
        'name': 'Elephants',
        'local': 'Native to Africa',
        'icon': '../../assets/images/petstory/sect3/svg/banana-bamboo_icon.svg',
        'altIcon': 'banana and bamboo',
        'type': 'vegan',
    }
]
window.addEventListener("resize", (e) => {
    countCards = (window.matchMedia('(max-width: 640px)').matches) ? 4 : 6;
    shuffleArr(animals)
    let L = animalMix(animals)
    document.querySelector('.left').innerHTML = out(L)
    shuffleArr(animals)
    document.querySelector('.visible').innerHTML = out(animalMix(animals))
    shuffleArr(animals)
    let R = animalMix(animals)
    document.querySelector('.right').innerHTML = out(R)
});
let countAnimals = (window.matchMedia('(max-width: 640px)').matches) ? 4 : 6;

let animalMix = (animals) => {
    let countAnimals1 = countAnimals
    let element = []
    for (let i = 0; i < countAnimals1; i++) {
        element.push(animals[i])
    }
    return element
}

function shuffleArr(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArr(animals)
let L = animalMix(animals)
document.querySelector('.left').innerHTML = out(L)
shuffleArr(animals)
document.querySelector('.visible').innerHTML = out(animalMix(animals))
shuffleArr(animals)
let R = animalMix(animals)
document.querySelector('.right').innerHTML = out(R)

function out(animalMix) {
    let out = '';
    for (let i = 0; i < animalMix.length; i++) {
        let animal = animalMix[i]
        out += `<div class="gallery-element-hover">
     <div class="gallery-element">
    <div class="gallery-pic-container">
        <img class="gallery-pic" src="${animal.img}" alt="${animal.altIcon}">
    </div>
    <div class="gallery-description">
        <div class="gallery-text">
            <h4 class="gallery-text-title">${animal.name}</h4>
            <p class="gallery-text-description">${animal.local}</p>
        </div>
        <img src="${animal.icon}" alt="${animal.altIcon}">
    </div>
    </div>
</div>`
    }
    return out;
}

let galleryWrap = document.querySelector('.gallery-container-wrap');
let galleryElem = document.querySelector('.gallery-container');
let gallery = document.querySelector('.gallery-element-all');
let right = document.querySelector('.gallery-arrow-right');
let left = document.querySelector('.gallery-arrow-left');
let visible = document.querySelector('.visible');
gallery.style.right = 0 + 'px';
gallery.style.transform = 'none';
gallery.style.transition = 'none';

right.addEventListener("click", function(e) {
    gallery.style.transition = 'all 0.5s linear';
    let offset = visible.offsetWidth;
    gallery.style.right = offset + 'px';

    setTimeout(() => {
        gallery.style.transform = 'none';
        gallery.style.transition = 'none';
        gallery.style.right = 0 + 'px';
        document.querySelector('.visible').innerHTML = out(R)

        shuffleArr(animals)
        L = animalMix(animals)
        document.querySelector('.left').innerHTML = out(L)
        shuffleArr(animals)
        R = animalMix(animals)
        document.querySelector('.right').innerHTML = out(R)
    }, 500);
})
left.addEventListener("click", function(e) {
    gallery.style.transition = 'all 0.5s linear';
    let offset = visible.offsetWidth;
    gallery.style.right = -offset + 'px';

    setTimeout(() => {
        gallery.style.transform = 'none';
        gallery.style.transition = 'none';
        gallery.style.right = 0 + 'px';
        document.querySelector('.visible').innerHTML = out(L)

        shuffleArr(animals)
        L = animalMix(animals)
        document.querySelector('.left').innerHTML = out(L)
        shuffleArr(animals)
        R = animalMix(animals)
        document.querySelector('.right').innerHTML = out(R)
    }, 500);
})