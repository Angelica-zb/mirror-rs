let langSelect = 'ru';






//--------------------------Quotes
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const butQuote = document.querySelector('.change-quote');
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
changeQuotes()
butQuote.addEventListener('click', changeQuotes);

//play
const play = document.querySelector('.bird-animation');
const quotes = document.querySelector('.quotes');
const game = document.querySelector('.game');
const score = document.querySelector('.score');
play.addEventListener('click', function() {
    quotes.classList.add('quotes-hover');
    game.classList.add('game-start');
    play.classList.add('bird-animation-hover');
    score.classList.add('score-start');
})







// window.addEventListener('beforeunload', function() {
//     let stage = [];
//     let difficulty = '';
//     localStorage.setItem('difficulty', JSON.stringify(difficulty));
//     localStorage.setItem('stage', JSON.stringify(stage));
//     localStorage.setItem('stageRes', JSON.stringify(stage));
// })
// import { blueCardsData } from './data/mythicCards/blue/index.js';
// import { brownCardsData } from './data/mythicCards/brown/index.js';
// import { greenCardsData } from './data/mythicCards/green/index.js';
// import { ancientsData } from './data/ancients.js';
// import { difficulties } from './data/difficulties.js';



// //---------------------ancientCard
// let ancientCards = document.querySelectorAll(".ancient-card");
// for (let i = 0; i < ancientCards.length; i++) {
//     let ancientCard = ancientCards[i];
//     ancientCard.addEventListener("click", function(e) {
//         shuffle.classList.remove('none')
//         deckContainer.classList.add('none')
//         for (let k = 0; k < ancientCards.length; k++) {
//             let rem = ancientCards[k]
//             rem.classList.remove("active")
//         }
//         ancientCard.classList.add("active")
//         let stage = ancientsData[i]
//         localStorage.setItem('stage', JSON.stringify(stage));
//         localStorage.setItem('stageRes', JSON.stringify(stage));
//     });
// }

// //------------------------difficulty
// let difficultyAll = document.querySelectorAll(".difficulty");
// for (let i = 0; i < difficultyAll.length; i++) {
//     let difficulty = difficultyAll[i];
//     difficulty.addEventListener("click", function(e) {
//         shuffle.classList.remove('none')
//         deckContainer.classList.add('none')
//         for (let k = 0; k < difficultyAll.length; k++) {
//             difficultyAll[k].classList.remove("active")
//         }
//         difficulty.classList.add("active")
//         let difficultyChoose = difficulties[i]
//         localStorage.setItem('difficulty', JSON.stringify(difficultyChoose));
//     });
// }

// //------------------------shuffle
// let shuffle = document.querySelector(".shuffle-button");
// let deckContainer = document.querySelector(".deck-container");

// shuffle.addEventListener("click", function(e) {
//     let choose = JSON.parse(localStorage.getItem('stageRes'));
//     let difficulty = JSON.parse(localStorage.getItem('difficulty'));
//     if (choose.length != 0 && difficulty != '') {
//         localStorage.setItem('stage', JSON.stringify(choose));
//         shuffle.classList.add('none')
//         deckContainer.classList.remove('none')
//         document.querySelector('.deck').style.backgroundImage = `url(./assets/mythicCardBackground.png)`;
//         document.querySelector('.last-card').style.backgroundImage = `url()`;
//         out(choose)
//         localStorage.setItem('deckGreen', JSON.stringify(greenCardsData));
//         localStorage.setItem('deckBrown', JSON.stringify(brownCardsData));
//         localStorage.setItem('deckBlue', JSON.stringify(blueCardsData));
//         let difficulties = JSON.parse(localStorage.getItem('difficulty'));
//         sortCardColl(difficulties, 'blue')
//         sortCardColl(difficulties, 'brown')
//         sortCardColl(difficulties, 'green')
//         let deckFin = []
//         deckFin = deckFin.concat(makeStage(choose, 'thirdStage'))
//         deckFin = deckFin.concat(makeStage(choose, 'secondStage'))
//         deckFin = deckFin.concat(makeStage(choose, 'firstStage'))
//         localStorage.setItem('deckFin', JSON.stringify(deckFin));
//         console.log(`Колода карт:`)
//         console.log(deckFin)
//     } else {
//         alert('Не выбран уровень сложности или карта древнего')
//     }
// })

// function out(choose) {
//     let out = '';
//     out +=
//         `<div class="stage-container">
//         <span class="stage-text">Первая стадия</span>
//         <div class="dots-container">
//             <div class="dot green">${choose.firstStage.greenCards}</div>
//             <div class="dot brown">${choose.firstStage.brownCards}</div>
//             <div class="dot blue">${choose.firstStage.blueCards}</div>
//         </div>
//     </div>
//     <div class="stage-container">
//         <span class="stage-text">Вторая стадия</span>
//         <div class="dots-container">
//             <div class="dot green">${choose.secondStage.greenCards}</div>
//             <div class="dot brown">${choose.secondStage.brownCards}</div>
//             <div class="dot blue">${choose.secondStage.blueCards}</div>
//         </div>
//     </div>
//     <div class="stage-container">
//         <span class="stage-text">Третья стадия</span>
//         <div class="dots-container">
//             <div class="dot green">${choose.thirdStage.greenCards}</div>
//             <div class="dot brown">${choose.thirdStage.brownCards}</div>
//             <div class="dot blue">${choose.thirdStage.blueCards}</div>
//         </div>
//     </div>`
//     document.querySelector('.current-state').innerHTML = out;
// }

// function makeStage(choose, st) {
//     let deckStage = []
//     let blueN = +choose[st].blueCards
//     deckStage = deckStage.concat(colorCards(blueN, 'blue'))
//     let brownN = +choose[st].brownCards
//     deckStage = deckStage.concat(colorCards(brownN, 'brown'))
//     let greenN = +choose[st].greenCards
//     deckStage = deckStage.concat(colorCards(greenN, 'green'))
//     shuffleArr(deckStage)
//     return deckStage
// }

// function colorCards(colorNum, color) {
//     let deck = []
//     let deckCol = JSON.parse(localStorage.getItem(`deck${color[0].toUpperCase() + color.slice(1)}`));
//     shuffleArr(deckCol)
//     while (colorNum > 0) {
//         deck.push(deckCol[0])
//         deckCol.shift()
//         colorNum--
//         localStorage.setItem(`deck${color[0].toUpperCase() + color.slice(1)}`, JSON.stringify(deckCol));
//     }
//     return deck
// }

// function shuffleArr(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
// }

// //-------------------stack
// let deck = document.querySelector(".deck");

// deck.addEventListener("click", function(e) {
//     let stack = JSON.parse(localStorage.getItem('deckFin'));
//     if (stack.length == 1) {
//         document.querySelector('.deck').style.backgroundImage = `url()`;
//     }
//     let lastCard = stack.pop();
//     outCard(lastCard)
//     stageCard(lastCard)
//     localStorage.setItem('deckFin', JSON.stringify(stack));
// })

// function outCard(lastCard) {
//     let stack = JSON.parse(localStorage.getItem('deckFin'));
//     if (stack.length > 0) {
//         let n = `./assets/MythicCards/${lastCard.color}/${lastCard.id}.png`
//         document.querySelector('.last-card').style.backgroundImage = `url(${n})`;
//     }
// }

// //-----------------------------stage
// function stageCard(lastCard) {
//     let choose = JSON.parse(localStorage.getItem('stage'));
//     let stack = JSON.parse(localStorage.getItem('deckFin'));
//     if (stack.length > 0) {
//         let FrSecNum = choose.secondStage.greenCards + choose.secondStage.blueCards + choose.secondStage.brownCards;
//         let FrThNum = choose.thirdStage.greenCards + choose.thirdStage.blueCards + choose.thirdStage.brownCards;
//         let color = lastCard.color
//         if (FrThNum >= stack.length > 0) {
//             stageCardChange(choose, 'thirdStage', color)
//         } else if (stack.length > (FrThNum + FrSecNum)) {
//             stageCardChange(choose, 'firstStage', color)
//         } else if ((FrThNum + FrSecNum) >= stack.length && stack.length > FrThNum) {
//             stageCardChange(choose, 'secondStage', color)
//         }
//     }
// }

// function stageCardChange(choose, stage, n) {
//     let l = `${n}Cards`
//     choose[stage][l]--;
//     localStorage.setItem('stage', JSON.stringify(choose));
//     out(choose)
// }

// //--------------------difficulty
// function sortCardColl(difficulties, color) {
//     let choose = JSON.parse(localStorage.getItem('stageRes'));
//     let deckCol = JSON.parse(localStorage.getItem(`deck${color[0].toUpperCase() + color.slice(1)}`));;
//     let deckColChan = sortCard(deckCol, difficulties.diffDel, difficulties.diffDel2)
//     let l = `${color}Cards`
//     let numCol = choose.firstStage[l] + choose.secondStage[l] + choose.thirdStage[l]
//     let r = numCol - deckColChan.length
//     let deckCo = sortCard(deckCol, 'hard', 'easy')
//     while (r > 0) {
//         deckCo.shift();
//         deckColChan.push(deckCo[0]);
//         r--;
//     }
//     localStorage.setItem(`deck${color[0].toUpperCase() + color.slice(1)}`, JSON.stringify(deckColChan));
// }

// function sortCard(deckCol, difficulty1, difficulty2) {
//     let deckColChan = []
//     for (let i = 0; i < deckCol.length; i++) {
//         if (deckCol[i].difficulty != difficulty1 && deckCol[i].difficulty != difficulty2) {
//             deckColChan.push(deckCol[i])
//         } else { deckColChan }
//     }
//     return deckColChan
// }