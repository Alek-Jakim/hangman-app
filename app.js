//DOM Selectors
const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = [
    "swell",
    "morsel",
    "mutter",
    "asylum",
    "lost",
    "exemption",
    "grass",
    "organisation",
    "repetition",
    "line",
    "tie",
    "ballot",
    "house",
    "thin",
    "Sunday",
    "admiration",
    "border",
    "stereotype",
    "live",
    "flower",
    "wage",
    "mobile",
    "pass",
    "jam",
    "packet",
    "surface",
    "syndrome",
    "weed",
    "lock",
    "cat"];


let randomNum = Math.floor(Math.random() * words.length)

let selectedWord = words[randomNum]

const correctLetters = [];
const wrongLetters = [];

const displayWord = () => {
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `)
            .join('')
        }
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '')

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'You Won! Congratulations!'
        popup.style.display = 'flex'
    }
}

//update the wrong letters
const updateWrongLetterEl = () => {
    //display all wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `
    //display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        }
        else {
            part.style.display = 'none';
        }
    });

    //check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'You Lost! Better Luck Next Time!'
        popup.style.display = 'flex';
    }
}

const showNotification = () => {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show')
    }, 3000)
}

//event listener
window.addEventListener('keydown', e => {
    e.preventDefault();

    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter)

                displayWord();
            }
            else {
                showNotification();
            }
        }
        else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLetterEl();
            } else {
                showNotification()
            }
        }
    }
})

//restart game
playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    displayWord();

    updateWrongLetterEl();

    popup.style.display = 'none'
    document.location.reload(true)
})

displayWord()