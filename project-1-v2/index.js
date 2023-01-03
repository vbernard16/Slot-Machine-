const reelList = {
    '10': '🦜',
    '20': '🦚',
    '30': '🦩',
    '40': '🐓',
    '50': '🐤'
}

const symbolList = Object.entries(reelList)
const gameContainer = document.querySelector('#game-container')
const slotContainer = document.querySelector('#slot-container')
const betDisplay = document.querySelector('#bet-display')
const betBtn = document.querySelector('#bet-btn')
const betInput = document.querySelector('#bet-input')
const heroTitle = document.querySelector('#hero-title')
const betDiv = document.querySelector('#bet-div')
const playBtn = document.querySelector('#play-btn')
const cashOutBtn = document.querySelector('#cash-out-btn')
const reel = document.querySelector('.reel')
let userFunds = betInput.value
const reelResult = []
const slot = []
let isGameOver = false
const reelH1 = reel.innerHTML


const cashOut = () => {
    cashOutBtn.addEventListener('click', () => {
        isGameOver = true
        console.log(isGameOver)
    })
}

// Creating the starting state of the slot machine
// creating dynamically named variables for each slot
// and updating their innerHTML to the symbols in the reel list
for (i = 0; i < symbolList.length; i ++){
    const reelDiv = document.createElement('div')
     slot[i+1] = document.querySelector('.r'+[i+1])
     slot[i+1].innerHTML = `<h1>🦚🐓🦩🦜🐤 🦚🐓🦩🦜🐤</h1>` 
    reelDiv.appendChild(slot[i+1])
    slotContainer.append(reelDiv)
}

// possible fix: on playgame click, hide slot-container, and then append
// result list to a new div that is empty

// r1.classList.add('slide')

// Randomly choosing symbols from reelList and adding them to the empty Result
// list array
const getRandomSymbol = () => {
    const randSymbol = symbolList[Math.floor(Math.random() * symbolList.length)]
    reelResult.push(randSymbol)
}


// try using a recursive statement instead of a for loop
const playGame = () => {
    
    for (i = 0; i < symbolList.length; i++){
        reel.classList.add('remove-animation')
        slot[i+1].classList.add('remove-animation')
        getRandomSymbol()
        slot[i+1].innerHTML = `<h1>${reelResult[i][1]}</h1>`
        slotContainer.classList.add('remove-animation')
    }
    
    findContiguousValues(reelResult)
}


 playBtn.addEventListener('click', playGame)


const displayBet = () => {
    betBtn.addEventListener('click', () => {
        userFunds = parseInt(betInput.value)
        betDisplay.innerHTML = 'Your bet is: $'+`${userFunds}`
    })
}

displayBet()


// Used to add number values in an array
const addValues = (array) =>{
    return array.reduce((accumulator, value) => {
        return accumulator + value
    }, 0)
}



function findContiguousValues(array){
    for (i = 0; i < array.length; i++){
        const sumList = []
        const primaryNum = parseInt(array[i][0])
        const secondaryNum = parseInt(array[i + 1][0])
        const tertiaryNum = parseInt(array[i + 2][0])
        const quartenaryNum = parseInt(array[i + 3][0])
        const firstRoundSum = primaryNum + secondaryNum + tertiaryNum
        const firstRoundProduct = firstRoundSum / tertiaryNum

        if (firstRoundProduct === 3 && tertiaryNum === secondaryNum && secondaryNum === primaryNum) {
            console.log(`First Round Complete. Three identical contiguous nums: ${primaryNum} and ${secondaryNum} and ${tertiaryNum}`)
            sumList.push(primaryNum, secondaryNum, tertiaryNum)
            let sumValue = addValues(sumList)
            console.log(`summed value is: ${sumValue}`)
            userFunds +=sumValue
            betDisplay.innerHTML = `Your account: ${userFunds}`
            const secondRoundSum = firstRoundSum + quartenaryNum
            const secondRoundProduct = secondRoundSum / quartenaryNum
            if (secondRoundProduct === 4 && quartenaryNum === tertiaryNum){
                console.log(`Second Round Complete. Four identical contiguous nums: ${primaryNum} and ${secondaryNum} and ${tertiaryNum}`)
                sumList.push(quartenaryNum)
                addValues(sumList)
                const quinaryNum = parseInt(array[i + 4][0])
                const thirdRoundSum = secondRoundSum + quinaryNum
                const thirdRoundProduct = thirdRoundSum / quinaryNum
                console.log(`summed value is: ${sumValue}`)
                if (thirdRoundProduct === 5 && quinaryNum === quartenaryNum){
                    console.log(`Goodness gravy. Third Round complete. FIVE identical contiguous nums found!`)
                    sumList.push(quinaryNum)
                    addValues(sumList)
                    console.log(`summed value is: ${sumValue}`)
                }
            }  
        }
        else {
            userFunds -= 10
            betDisplay.innerHTML = `Your account: ${userFunds}`
            
        }
        
    }
    console.log(`user funds is: ${userFunds}`)
}
