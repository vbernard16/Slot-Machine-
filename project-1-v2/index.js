const reelList = {
    '20': '🦜',
    '100': '🦚',
    '50': '🦩',
}

const symbolList = Object.entries(reelList)
const gameContainer = document.querySelector('.game-container')
const slotContainer = document.querySelector('.slot-container')
const reel = document.querySelectorAll('.reel')
const scrollText = document.querySelector('#scroll-text')
const betDisplay = document.querySelector('#bet-display')
const betBtn = document.querySelector('#bet-btn')
const betInput = document.querySelector('#bet-input')
const heroTitle = document.querySelector('#hero-title')
const betDiv = document.querySelector('#bet-div')
const playBtn = document.querySelector('#play-btn')
const cashOutBtn = document.querySelector('#cash-out-btn')
const replayBtn = document.querySelector('#replay-btn')
const respinBtn = document.querySelector('#respin-btn')
respinBtn.classList.add('hidden')
replayBtn.classList.add('hidden')

let userFunds
let reelResult = []

let backgroundAudio = new Audio('audio/background-audio.mp3')
let roundWinAudio = new Audio('audio/round-win-audio.mp3')
let roundLossAudio = new Audio('audio/round-loss-audio.mp3')
backgroundAudio.play()

// Creating the starting state of the slot machine
// creating dynamically named variables for each slot
// and updating their innerHTML to the symbols in the reel list
const startState = () => {
    for (let i = 0; i < symbolList.length; i ++){
        reel[i].innerHTML =  `<h1>🦚🦩🦜 🦚🦩🦜 🦚🦩🦜 🦚🦩🦜 </h1>`
        reel[i].classList.add('slide')
        scrollText.append(reel[i])
    }
}
startState()

// Randomly choosing symbols from reelList and adding them to the empty Result
// list array
const getRandomSymbol = () => {
    const randSymbol = symbolList[Math.floor(Math.random() * symbolList.length)]
    reelResult.push(randSymbol)
}


const playGame = () => {
    if (betInput.value.length === 0){
        disableBtn(playBtn)
        betDisplay.innerHTML = `Please place a bet to play.`
    }
    else{
        enableBtn(playBtn)
        for (let i = 0; i < symbolList.length; i++){
            getRandomSymbol()
            reel[i].innerHTML = `<h1>${reelResult[i][1]}</h1>`
            playBtn.classList.add('hidden')
            respinBtn.style.display = 'inline'
            replayBtn.style.display = 'inline'
            reel[i].classList.remove('slide')
        } 
        findContiguousValues(reelResult) 
    }
}


const respin = () => {
    startState()
    getRandomSymbol()
    reelResult = []
}

const disableBtn = (btn) => {
    btn.disabled = true
}

const enableBtn = (btn) => {
    btn.disabled = false
}

const cashOut = () => {
    cashOutBtn.addEventListener('click', () => {
        betInput.value.length === 0 ?
            betDisplay.innerHTML = `You need to have funds to cash out. Please play` :
                betDisplay.innerHTML = `Thanks for playing! Your Winnings: ${userFunds}` 
    })
}

cashOut()


playBtn.addEventListener('click', playGame)
respinBtn.addEventListener('click', respin)
replayBtn.addEventListener('click', playGame)
 

betBtn.addEventListener('click', () => {
    if (betInput.value.length === 0){
        betDisplay.innerHTML = 'Please place a bet'
    }
    else{
        userFunds = parseInt(betInput.value)
        betDisplay.innerHTML = 'Your bet: $'+`${userFunds}`
    }
})


// Used to add number values in an array
const addValues = (array) =>{
    return array.reduce((accumulator, value) => {
        return accumulator + value
    }, 0)
}



function findContiguousValues(array){
        let sumList = []
        const primaryNum = parseInt(array[0][0])
        const secondaryNum = parseInt(array[1][0])
        const tertiaryNum = parseInt(array[2][0])
        const firstRoundSum = primaryNum + secondaryNum + tertiaryNum
        const firstRoundProduct = firstRoundSum / tertiaryNum

        if (firstRoundProduct === 3) {
            sumList.push(primaryNum, secondaryNum, tertiaryNum)
            let sumValue = addValues(sumList)
            userFunds+= sumValue
            betDisplay.innerHTML = `JackPot! ` + '+ $' + `${sumValue} added to your account. Current Funds: ${userFunds}`
            } 
        else {
                userFunds -= 10
                userFunds <= 0 ? betDisplay.innerHTML = `Bust! You ran out of money! Your Balance: ${userFunds}` : betDisplay.innerHTML = `Round Loss! Funds Remaining: ${userFunds}`
             }      
    }

