import { birdsData } from './birds.js';
import { birdsDataEn } from './birdsEn.js';

const playGame = document.querySelector('.bird-animation');
const tryAgain = document.querySelector('.try-again');
const quotes = document.querySelector('.quotes');
const game = document.querySelector('.game');
const score = document.querySelector('.score');
const chooseLang = document.querySelector('.choose-lang');
const birdGalery = document.querySelector('.bird-gallery');
let optionBtns = document.querySelectorAll('.option-btn')
const quote = document.querySelector('.quote');
const butQuote = document.querySelector('.change-quote');
const gallery = document.querySelector('.bird-gallery-btn');
const nextLevel = document.querySelector('.next-level');

let isPlaySound = true;
let changeStyle = true;
let scoreLevel = 7;
let scoreCount = 0;

let langSelect = 'ru';
let actualTopic = 0;
let rightOption = 0;
const ru = document.querySelector('.ru');
const en = document.querySelector('.en');

let topicTitleRu = ['Разминка', 'Воробьиные', 'Лесные птицы', 'Певчье птицы', 'Хищные птицы', 'Морские птицы'];
let topicTitleEn = ['Warm-up', 'Passerines', 'Forest birds', 'Songbirds', 'Birds of prey', 'Sea birds'];

ru.addEventListener('click', function() {
    langSelect = 'ru';
    changeQuotes()
    makeTransl()
})

en.addEventListener('click', function() {
    langSelect = 'en';
    changeQuotes()
    makeTransl()
})

function setLocalStorage() {
    localStorage.setItem('language-az', langSelect);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('language-az')) {
        langSelect = localStorage.getItem('language-az');
    } else {
        langSelect = 'ru';
    }
}

window.addEventListener('load', getLocalStorage)
window.addEventListener('load', changeQuotes)
window.addEventListener('load', makeTransl)

makeTopic()

function makeTransl() {
    makeTopic()
    if (langSelect === 'en') {
        gallery.textContent = 'Gallery';
        document.querySelector('.logo-play').textContent = 'Play';
        tryAgain.textContent = 'Try again';
        document.querySelector('.about-option-start').textContent = 'Listen to the player. Select a bird from the list';
        document.querySelector('.choose-lang-p').textContent = 'Choose language:';
        nextLevel.textContent = 'Next level';
    } else {
        gallery.textContent = 'Галерея';
        document.querySelector('.logo-play').textContent = 'Играть';
        tryAgain.textContent = 'Пробовать снова';
        document.querySelector('.about-option-start').textContent = 'Послушайте плеер. Выберите птицу из списка';
        document.querySelector('.choose-lang-p').textContent = 'Выберите язык:';
        nextLevel.textContent = 'Следующий уровень';
    }
}


//--------------------------Quotes
async function changeQuotes() {
    const quotes = langSelect === 'en' ? './js/data.json' : './js/dataRu.json';
    const res = await fetch(quotes);
    const data = await res.json();

    let n = Math.floor(Math.random() * 16);
    let text = document.getElementsByClassName('quote')[0].textContent;
    if (text == (`"${data[n].text}."`)) {
        if (n < 10) { n = n + 1 } else { n = n - 1 }
        quote.textContent = `"${data[n].text}."`
    } else {
        quote.textContent = `"${data[n].text}."`
    }
}

butQuote.addEventListener('click', changeQuotes);

//play
playGame.addEventListener('click', function() {
    document.querySelector('.gallery').classList.add('gallery-hidden');
    document.querySelector('.final-hidden').classList.remove('final');
    quotes.classList.add('quotes-hidden');
    game.classList.add('game-start');
    playGame.classList.add('bird-animation-hidden');
    score.classList.add('score-start');
    chooseLang.classList.add('choose-lang-hidden');
    birdGalery.classList.add('bird-gallery-hidden');
    rightOption = getRandomNum(0, 5)
    audio.src = birdsData[actualTopic][rightOption].audio;
    lengthSong.textContent = getTimeCodeFromNum(audio.duration);
    getlengthSong()
    getlengthSongOption()
    getOption()
    stopAudioGalery()
    scoreCount = 0;
    let scoreRes = langSelect === 'en' ? `Score: ${scoreCount}` : `Счет: ${scoreCount}`;
    score.textContent = scoreRes
    changeStyle = true;
});

tryAgain.addEventListener('click', function() {
    document.querySelector('.final-hidden').classList.remove('final');
    game.classList.add('game-start');
    score.classList.add('score-start');
    actualTopic = 0;
    rightOption = getRandomNum(0, 5)
    audio.src = birdsData[actualTopic][rightOption].audio;
    lengthSong.textContent = getTimeCodeFromNum(audio.duration);
    getlengthSong()
    getlengthSongOption()
    getOption()
    makeTopic()
    document.querySelector('.about-option-start').classList.remove('about-option-start-hidden')
    document.querySelector('.about-option').classList.add('about-option-hidden')
    makeTopic()
    document.querySelector('.correct-title').textContent = '******';
    document.querySelector('.correct-img').style.backgroundImage = 'url(./assets/img/bird.06a46938.jpg)';
    play.classList.remove('pause');
    isPlay = false;
    stopAudioOption();
    for (let i = 0; i < optionBtns.length; i++) {
        optionBtns[i].classList.remove('option-btn-no')
        optionBtns[i].classList.remove('option-btn-yes')
    }
    scoreCount = 0;
    let scoreRes = langSelect === 'en' ? `Score: ${scoreCount}` : `Счет: ${scoreCount}`;
    score.textContent = scoreRes
    changeStyle = true;
    nextLevel.classList.remove('next-level-active')
    nextLevel.disabled = true;
})

//next level
nextLevel.addEventListener('click', function() {
    nextLevel.classList.remove('next-level-active')
    nextLevel.disabled = true;
    actualTopic++;
    rightOption = getRandomNum(0, 5)
    getlengthSong()
    getlengthSongOption
    getOption()
    document.querySelector('.about-option-start').classList.remove('about-option-start-hidden')
    document.querySelector('.about-option').classList.add('about-option-hidden')
    makeTopic()
    document.querySelector('.correct-title').textContent = '******';
    document.querySelector('.correct-img').style.backgroundImage = 'url(./assets/img/bird.06a46938.jpg)';
    play.classList.remove('pause');
    isPlay = false;
    stopAudioOption();
    for (let i = 0; i < optionBtns.length; i++) {
        optionBtns[i].classList.remove('option-btn-no')
        optionBtns[i].classList.remove('option-btn-yes')
    }
    let scoreRes = langSelect === 'en' ? `Score: ${scoreCount}` : `Счет: ${scoreCount}`;
    score.textContent = scoreRes
    changeStyle = true;
})

//topic
function makeTopic() {
    let topicWr = langSelect === 'en' ? topicTitleEn : topicTitleRu;
    let topic = document.querySelectorAll('.topic');
    for (let i = 0; i < topic.length; i++) {
        topic[i].textContent = topicWr[i]
        topic[i].classList.remove('topic-active')
        topic[actualTopic].classList.add('topic-active')
    }
}

//------------------player
const play = document.querySelector('.play');
const current = document.querySelector('.current');
const lengthSong = document.querySelector('.length-song');
let isPlay = false;
const audio = new Audio();

function getlengthSong() {
    audio.src = birdsData[actualTopic][rightOption].audio;
    audio.addEventListener('canplay', () => {
        lengthSong.textContent = getTimeCodeFromNum(audio.duration);
    })
}

function playAudio() {
    let currentSong = audio.currentTime;
    audio.src = birdsData[actualTopic][rightOption].audio;
    if (!isPlay) {
        audio.currentTime = currentSong;
        audio.play();
        isPlay = true;
        stopAudioOption()
    } else {
        audio.currentTime = currentSong;
        audio.pause();
        isPlay = false;
    }
    audio.addEventListener('ended', function() {
        pauseAudio()
        isPlay = false;
        currentSong = audio.currentTime;
        audio.currentTime = 0
    });
}

function pauseAudio() {
    play.classList.toggle('pause');
}

play.addEventListener('click', function(p) {
    playAudio()
    pauseAudio();
})

//timeline
const timeline = document.querySelector(".timeline");
const thumb = timeline.querySelector('.thumb');
const progressBar = document.querySelector(".progress");

thumb.onmousedown = function(event) {
    event.preventDefault();
    let shiftX = event.clientX - thumb.getBoundingClientRect().left;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
        let newLeft = event.clientX - shiftX - timeline.getBoundingClientRect().left;
        if (newLeft < 0) {
            newLeft = 0;
        }
        let rightEdge = timeline.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }
        thumb.style.left = newLeft + 'px';
        progressBar.style.width = newLeft / parseInt(timeline.offsetWidth) * 100 + "%";
        audio.currentTime = audio.duration * (newLeft / parseInt(timeline.offsetWidth))
        current.textContent = getTimeCodeFromNum(audio.currentTime);
    }

    function onMouseUp() {
        // setTimeout(() => {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
        // }, 0)
        current.textContent = getTimeCodeFromNum(audio.currentTime);
    }
    audio.addEventListener('ended', function() {
        audio.currentTime = 0
        progressBar.style.width = 0 + "%";
        thumb.style.left = 0 + 'px';
        current.textContent = getTimeCodeFromNum(audio.currentTime);
        play.classList.remove('pause');
    });
};

// timeline.addEventListener("mousedown", event => {
//     const timelineWidth = window.getComputedStyle(timeline).width;
//     const timeToSeek = event.offsetX / parseInt(timelineWidth) * audio.duration;
//     let newLeft = (timeToSeek * parseInt(timelineWidth)) / audio.duration
//     if (newLeft < 0) {
//         newLeft = 0;
//     }
//     let rightEdge = timeline.offsetWidth;
//     if (newLeft > rightEdge) {
//         newLeft = rightEdge ;
//     }
//     audio.currentTime = timeToSeek
//     current.textContent = getTimeCodeFromNum(audio.currentTime);
//     thumb.style.left = newLeft + 'px';
//     progressBar.style.width = newLeft / parseInt(timelineWidth) * 100 + "%";
// });

thumb.ondragstart = function() {
    return false;
};

setInterval(() => {
    current.textContent = getTimeCodeFromNum(audio.currentTime);
    let newLeft = (audio.currentTime * parseInt(timeline.offsetWidth)) / audio.duration
    if (newLeft < 0) {
        newLeft = 0;
    }
    let rightEdge = timeline.offsetWidth;
    if (newLeft > rightEdge) {
        newLeft = rightEdge;
    }
    thumb.style.left = newLeft + 'px';
    progressBar.style.width = newLeft / parseInt(timeline.offsetWidth) * 100 + "%";
}, 20);

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

//volume
document.querySelector(".volume-percentage").style.width = '75%';
const volumeSlider = document.querySelector(".volume-slider");
volumeSlider.addEventListener('click', e => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    document.querySelector(".volume-percentage").style.width = newVolume * 100 + '%';
})

document.querySelector(".volume-button").addEventListener("click", () => {
    const volumeEl = document.querySelector(".volume-button");
    audio.muted = !audio.muted;
    if (audio.muted) {
        volumeEl.style.opacity = 0.4;
    } else {
        volumeEl.style.opacity = 1;
    }
});

//options
let optionVar = document.querySelectorAll('.option-var')

function getOption() {
    const birdsD = langSelect === 'en' ? birdsDataEn : birdsData;
    for (let i = 0; i < optionVar.length; i++) {
        let opt = optionVar[i];
        opt.textContent == ''
        opt.textContent = birdsD[actualTopic][i].name;
    }
}

//get options
const answerOptions = document.querySelector('.answer-options')
answerOptions.addEventListener("click", () => {
    document.querySelector('.about-option-start').classList.add('about-option-start-hidden')
    document.querySelector('.about-option').classList.remove('about-option-hidden')
})

//------------------player-variants
const audioOption = new Audio();
const playOption = document.querySelector('.play-option');
const currentOption = document.querySelector('.current-option');
const lengthSongOption = document.querySelector('.length-song-option');
let isPlayOption = false;

function getlengthSongOption() {
    audioOption.src = birdsData[actualTopic][k].audio;
    audioOption.addEventListener('canplay', () => {
        lengthSongOption.textContent = getTimeCodeFromNum(audioOption.duration);
    })
}

function playAudioOption(k) {
    let currentSong = audioOption.currentTime;
    audioOption.src = birdsData[actualTopic][k].audio;
    if (!isPlayOption) {
        audio.pause();
        play.classList.remove('pause');
        isPlay = false;
        audioOption.currentTime = currentSong;
        audioOption.play();
        isPlayOption = true;
    } else {
        audioOption.currentTime = currentSong;
        audioOption.pause();
        isPlayOption = false;
    }
    audioOption.addEventListener('ended', function() {
        stopAudioOption();
        currentSong = audioOption.currentTime;
    });
}

function stopAudioOption() {
    playOption.classList.remove('pause-option');
    audioOption.pause();
    isPlayOption = false;
    audioOption.currentTime = 0
}

function pauseAudioOption() {
    playOption.classList.toggle('pause-option');
}

playOption.addEventListener('click', function(p) {
    playAudioOption(k)
    pauseAudioOption();

})

//timeline
const timelineOption = document.querySelector(".timeline-option");
const thumbOption = timelineOption.querySelector('.thumb-option');
const progressBarOption = document.querySelector(".progress-option");

thumbOption.onmousedown = function(event) {
    event.preventDefault();
    let shiftX = event.clientX - thumbOption.getBoundingClientRect().left;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
        let newLeft = event.clientX - shiftX - timelineOption.getBoundingClientRect().left;
        if (newLeft < 0) {
            newLeft = 0;
        }
        let rightEdge = timelineOption.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }
        thumbOption.style.left = newLeft + 'px';
        progressBarOption.style.width = newLeft / parseInt(timelineOption.offsetWidth) * 100 + "%";
        audioOption.currentTime = audioOption.duration * (newLeft / parseInt(timelineOption.offsetWidth))
        current.textContent = getTimeCodeFromNum(audioOption.currentTime);
    }

    function onMouseUp() {
        // setTimeout(() => {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
        // }, 0)
        current.textContent = getTimeCodeFromNum(audioOption.currentTime);
    }
    audioOption.addEventListener('ended', function() {
        audioOption.currentTime = 0
        progressBarOption.style.width = 0 + "%";
        thumbOption.style.left = 0 + 'px';
        currentOption.textContent = getTimeCodeFromNum(audioOption.currentTime);
        playOption.classList.remove('pause');
    });
};

thumbOption.ondragstart = function() {
    return false;
};

setInterval(() => {
    currentOption.textContent = getTimeCodeFromNum(audioOption.currentTime);
    let newLeft = (audioOption.currentTime * parseInt(timelineOption.offsetWidth)) / audioOption.duration
    if (newLeft < 0) {
        newLeft = 0;
    }
    let rightEdge = timelineOption.offsetWidth;
    if (newLeft > rightEdge) {
        newLeft = rightEdge;
    }
    thumbOption.style.left = newLeft + 'px';
    progressBarOption.style.width = newLeft / parseInt(timelineOption.offsetWidth) * 100 + "%";
}, 20);

//volume
document.querySelector(".volume-percentage-option").style.width = '75%';
const volumeSliderOption = document.querySelector(".volume-slider-option");
volumeSliderOption.addEventListener('click', e => {
    const sliderWidth = window.getComputedStyle(volumeSliderOption).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audioOption.volume = newVolume;
    document.querySelector(".volume-percentage-option").style.width = newVolume * 100 + '%';
})

document.querySelector(".volume-button-option").addEventListener("click", () => {
    const volumeElOption = document.querySelector(".volume-button-option");
    audioOption.muted = !audioOption.muted;
    if (audioOption.muted) {
        volumeElOption.style.opacity = 0.4;
    } else {
        volumeElOption.style.opacity = 1;
    }
});

// sound
const sounds = [{
        src: './assets/mp3/yes.mp3',
    },
    {
        src: './assets/mp3/no.mp3',
    },
    {
        src: './assets/mp3/win.mp3',
    },
    {
        src: './assets/mp3/again.mp3',
    }
]

const audioSound = new Audio();

function playAudioSound(sound) {
    if (isPlaySound) {
        audioSound.pause();
        audioSound.src = sounds[sound].src;
        audioSound.play();
    }
}


//right option
let k = 0
let options = document.querySelectorAll('.option')

for (let i = 0; i < options.length; i++) {
    let option = options[i]
    option.addEventListener("click", function() {
        k = i
        getlengthSongOption()
        stopAudioOption()
        document.querySelector('.option-img').style.backgroundImage = `url(${birdsData[actualTopic][i].image})`;
        document.querySelector('.option-title-lat').textContent = birdsData[actualTopic][i].species;

        let birdsD = langSelect === 'en' ? birdsDataEn : birdsData;
        document.querySelector('.option-title').textContent = birdsD[actualTopic][i].name;
        document.querySelector('.option-description').textContent = birdsD[actualTopic][i].description;
        if (i == rightOption) {
            nextLevel.classList.add('next-level-active')
            nextLevel.disabled = false;
            document.querySelector('.correct-img').style.backgroundImage = `url(${birdsData[actualTopic][rightOption].image})`;
            let birdsD = langSelect === 'en' ? birdsDataEn : birdsData;
            document.querySelector('.correct-title').textContent = birdsD[actualTopic][rightOption].name;
        }
    })
}

//score
let ArrBird = [];
for (let i = 0; i < options.length; i++) {
    let option = options[i];
    let optionBtn = optionBtns[i]
    let optionV = optionVar[i]
    option.addEventListener("click", function makeScore() {
        if (changeStyle) {
            if (!ArrBird.includes(optionV.textContent)) {
                scoreLevel--;
                ArrBird.push(optionV.textContent)
            }
            playAudioSound(1)
            optionBtn.classList.add('option-btn-no')
            if (i === rightOption) {
                playAudioSound(0);
                optionBtn.classList.add('option-btn-yes')
                scoreCount = scoreLevel + scoreCount;
                scoreLevel = 7;
                ArrBird = []
                changeStyle = false;
                audio.pause();
                isPlay = false;
                play.classList.remove('pause');
            }
            if (i === rightOption && actualTopic === 5) {
                playAudioSound(3)
                score.classList.remove('score-start');
                game.classList.remove('game-start');
                document.querySelector('.final-hidden').classList.add('final');
                let t = `Ваше колличество баллов: ${scoreCount} `
                document.querySelector('.final-text').textContent = t;

                if (scoreCount == 36) {
                    playAudioSound(2)
                    tryAgain.classList.add('try-again-hidden');
                    let t = `Вы набрали максимальное колличество баллов`
                    document.querySelector('.final-text').textContent = t;
                }
            }
        }
    })
}

//gallery player
const audioGalery = new Audio();
const playGalery = document.querySelector('.play-gallery');
const currentGalery = document.querySelector('.current-gallery');
const lengthSongGalery = document.querySelector('.length-song-gallery');
const prev = document.querySelector('.gallery-prev')
const next = document.querySelector('.gallery-next')
let galleryTopic = 0;
let galleryNum = 0
let isPlayGalery = false;

function getlengthSongGalery() {
    audioGalery.src = birdsData[galleryTopic][galleryNum].audio;
    audioGalery.addEventListener('canplay', () => {
        lengthSongGalery.textContent = getTimeCodeFromNum(audioGalery.duration);
    })
}

function playAudioGalery() {
    let currentSong = audioGalery.currentTime;
    audioGalery.src = birdsData[galleryTopic][galleryNum].audio;
    if (!isPlayGalery) {
        audioGalery.currentTime = currentSong;
        audioGalery.play();
        isPlayGalery = true;
    } else {
        audioGalery.currentTime = currentSong;
        audioGalery.pause();
        isPlayGalery = false;
    }
    audioGalery.addEventListener('ended', function() {
        stopAudioGalery();
        currentSong = audioGalery.currentTime;
    });
}

function stopAudioGalery() {
    playGalery.classList.remove('pause-gallery');
    audioGalery.pause();
    isPlayGalery = false;
    audioGalery.currentTime = 0
}

function pauseAudioGalery() {
    playGalery.classList.toggle('pause-gallery');
}

playGalery.addEventListener('click', function(p) {
    playAudioGalery(k)
    pauseAudioGalery();
})

//timeline
const timelineGalery = document.querySelector(".timeline-gallery");
const thumbGalery = document.querySelector('.thumb-gallery');
const progressBarGalery = document.querySelector(".progress-gallery");

thumbGalery.onmousedown = function(event) {
    event.preventDefault();
    let shiftX = event.clientX - thumbGalery.getBoundingClientRect().left;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
        let newLeft = event.clientX - shiftX - timelineGalery.getBoundingClientRect().left;
        if (newLeft < 0) {
            newLeft = 0;
        }
        let rightEdge = timelineGalery.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }
        thumbGalery.style.left = newLeft + 'px';
        progressBarGalery.style.width = newLeft / parseInt(timelineGalery.offsetWidth) * 100 + "%";
        audioGalery.currentTime = audioGalery.duration * (newLeft / parseInt(timelineGalery.offsetWidth))
        current.textContent = getTimeCodeFromNum(audioGalery.currentTime);
    }

    function onMouseUp() {
        // setTimeout(() => {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
        // }, 0)
        current.textContent = getTimeCodeFromNum(audioGalery.currentTime);
    }
    audioGalery.addEventListener('ended', function() {
        audioGalery.currentTime = 0
        progressBarGalery.style.width = 0 + "%";
        thumbGalery.style.left = 0 + 'px';
        currentGalery.textContent = getTimeCodeFromNum(audioGalery.currentTime);
        playGalery.classList.remove('pause');
    });
};

thumbGalery.ondragstart = function() {
    return false;
};

setInterval(() => {
    currentGalery.textContent = getTimeCodeFromNum(audioGalery.currentTime);
    let newLeft = (audioGalery.currentTime * parseInt(timelineGalery.offsetWidth)) / audioGalery.duration
    if (newLeft < 0) {
        newLeft = 0;
    }
    let rightEdge = timelineGalery.offsetWidth;
    if (newLeft > rightEdge) {
        newLeft = rightEdge;
    }
    thumbGalery.style.left = newLeft + 'px';
    progressBarGalery.style.width = newLeft / parseInt(timelineGalery.offsetWidth) * 100 + "%";
}, 20);

//volume
document.querySelector(".volume-percentage-gallery").style.width = '75%';
const volumeSliderGalery = document.querySelector(".volume-slider-gallery");
volumeSliderGalery.addEventListener('click', e => {
    const sliderWidth = window.getComputedStyle(volumeSliderGalery).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audioGalery.volume = newVolume;
    document.querySelector(".volume-percentage-gallery").style.width = newVolume * 100 + '%';
})

document.querySelector(".volume-button-gallery").addEventListener("click", () => {
    const volumeElGalery = document.querySelector(".volume-button-gallery");
    audioGalery.muted = !audioGalery.muted;
    if (audioGalery.muted) {
        volumeElGalery.style.opacity = 0.4;
    } else {
        volumeElGalery.style.opacity = 1;
    }
});

//gallery

gallery.addEventListener('click', makeGallery)

function makeGallery() {
    quotes.classList.add('quotes-hidden');
    document.querySelector('.gallery').classList.remove('gallery-hidden');
    chooseLang.classList.add('choose-lang-hidden');
    birdGalery.classList.add('bird-gallery-hidden');
    getlengthSongGalery()
    stopAudioGalery()
    document.querySelector('.gallery-img').style.backgroundImage = `url(${birdsData[galleryTopic][galleryNum].image})`;
    document.querySelector('.gallery-title-lat').textContent = birdsData[galleryTopic][galleryNum].species;

    let birdsD = langSelect === 'en' ? birdsDataEn : birdsData;
    document.querySelector('.gallery-title').textContent = birdsD[galleryTopic][galleryNum].name;
    document.querySelector('.gallery-description').textContent = birdsD[galleryTopic][galleryNum].description;
}
next.addEventListener('click', function() {
    if (galleryNum < 5) {
        galleryNum++
    } else {
        galleryNum = 0;
        if (galleryTopic < 5) {
            galleryTopic++
        } else {
            galleryTopic = 0
        }
    }
    makeGallery()
})
prev.addEventListener('click', function() {
    if (galleryNum > 0) {
        galleryNum--
    } else {
        galleryNum = 5;
        if (galleryTopic > 0) {
            galleryTopic--
        } else {
            galleryTopic = 5
        }
    }
    makeGallery()
})

//hellpers
function getRandomNum(min, max) {
    let ranNum = Math.floor(Math.random() * (max - min + min)) + 1;
    return ranNum
}