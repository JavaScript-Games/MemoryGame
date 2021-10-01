document.addEventListener('DOMContentLoaded', () => {
    class Card{
        constructor(name){
            this.name = name,
            this.img = 'images/' + name + '.png'
        }
    }
    const cards = [
        new Card('cheeseburger'),
        new Card('fries'),
        new Card('hotdog'),
        new Card('ice-cream'),
        new Card('milkshake'),
        new Card('pizza'),
    ]
    const cardArray = cards.flatMap(item => [item, item]);
    cardArray.sort(() => 0.5 - Math.random());
    
    const grid = document.querySelector(".grid");
    const resultDisplay = document.querySelector("#result");
    const missDisplay = document.querySelector("#misses");
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let misses = 0;

    function createBoard(){
        cardArray.map((el, i) => {
            let card = document.createElement('img');
            card.setAttribute('class', 'card');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        })
    }

    function flipCard(){
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if(cardsChosen.length === 2){
            setTimeout(checkForMatch, 500)
        }
    }

    function checkForMatch(){
        const cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if(optionOneId == optionTwoId) {
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            //alert('You have clicked the same image!');
        }else if(cardsChosen[0] === cardsChosen[1]){
            //alert('You found a match');
            cards[optionOneId].setAttribute('src', 'images/white.png');
            cards[optionTwoId].setAttribute('src', 'images/white.png');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        }else{
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            misses++;
            //alert('Sorry, try again');
        }
        cardsChosen = [];
        cardsChosenId = [];
        missDisplay.textContent = misses;
        resultDisplay.textContent = cardsWon.length;
        if(cardsWon.length === cardArray.length/2){
            resultDisplay.textContent = "Congratulations! You found them all!"
        }
    }

    resultDisplay.textContent = cardsWon.length;
    missDisplay.textContent = 0;
    createBoard();
})