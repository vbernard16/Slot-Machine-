const reelList = {
    '20': '🦜',
    '50': '🦩',
    '100': '🦚',
}

const symbolList = Object.entries(reelList)
// remove unused `gameContainer` and `slotContainer`
const gameContainer = document.querySelector('.game-container')
const slotContainer = document.querySelector('.slot-container')
const reels = document.querySelectorAll('.reel')
const scrollText = document.querySelector('#scroll-text')
// remove unused `betDiv`
const betDiv = document.querySelector('#bet-div')
const betDisplay = document.querySelector('#bet-display')
const betBtn = document.querySelector('#bet-btn')
const betInput = document.querySelector('#bet-input')
const playBtn = document.querySelector('#play-btn')
const cashOutBtn = document.querySelector('#cash-out-btn')
const replayBtn = document.querySelector('#replay-btn')
const respinBtn = document.querySelector('#respin-btn')
// remove unused `heroTitle`
const heroTitle = document.querySelector('#hero-title')

respinBtn.classList.add('hidden')
replayBtn.classList.add('hidden')

let userFunds
let reelResult = []


// Creating the starting state of the slot machine
// creating dynamically named variables for each slot
// and updating their innerHTML to the symbols in the reel list
const startState = () => {
    for (let i = 0; i < symbolList.length; i ++){
        reels[i].innerHTML =  `<h1>🦚🦩🦜 🦚🦩🦜 🦚🦩🦜 🦚🦩🦜 </h1>`
        reels[i].classList.add('slide')
        scrollText.append(reels[i])
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
        betDisplay.innerHTML = `Please place a bet to play.`
    }
    else{
        for (let i = 0; i < symbolList.length; i++){
            getRandomSymbol()
            reels[i].innerHTML = `<h1>${reelResult[i][1]}</h1>`
            playBtn.classList.add('hidden')
            respinBtn.style.display = 'inline'
            replayBtn.style.display = 'inline'
            reels[i].classList.remove('slide')
        } 
        findContiguousValues(reelResult) 
    }
}


const respin = () => {
    startState()
    getRandomSymbol()
    reelResult = []
}

const cashOut = () => {
    cashOutBtn.addEventListener('click', () => {
        betInput.value.length === 0 ?
            betDisplay.innerHTML = `You need to have funds to cash out. Please play` :
                betDisplay.innerHTML = `Thanks for playing! Your Winnings: $`+`${userFunds}` 
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
    else if (betInput.value > 100){
        betDisplay.innerHTML = 'Max bet is $100. Please input appropriate bet'
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
        // wonderful naming of this var
        const firstRoundSum = primaryNum + secondaryNum + tertiaryNum
        const firstRoundProduct = firstRoundSum / tertiaryNum

        if (firstRoundProduct === 3) {
            sumList.push(primaryNum, secondaryNum, tertiaryNum)
            let sumValue = addValues(sumList)
            userFunds+= sumValue
            betDisplay.innerHTML = `JackPot! ` + '+ $' + `${sumValue} added to your account.`+'Current Funds: $'+`${userFunds}`
            } 
        else {
                userFunds -= 10
                userFunds <= 0 ? betDisplay.innerHTML = 'Bust! You ran out of money! Your Balance: $'+`${userFunds}` : betDisplay.innerHTML = 'Round Loss! Funds Remaining: $'+`${userFunds}`
             }      
    }
