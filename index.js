//Letters 
const letters = "abcdefghijklmnopqrstuvwxyz";

//make array of letters
let ArrayOfLetters = Array.from(letters);

//select letter container
let LettersContainer = document.querySelector(".letters");

//loop on the array (Generate Letters)
ArrayOfLetters.forEach(letter =>{
    //create span 
    let span =document.createElement("span");

    //create text node
    let theLetter = document.createTextNode(letter);

    //append letter to span
    span.appendChild(theLetter);

    //add class on span 
    span.className = 'letter-box';

    //append span to the letters container
    LettersContainer.appendChild(span);
});

//Object of words + categories
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Armenia", "Russia", "Italy", "France", "Argentina", "London"]
}

//Get Random Property 

let allKeys = Object.keys(words);  //get all objects of words
//console.log(allKeys);

//random number depends on key length
let randomPropNumber = Math.floor(Math.random()*allKeys.length);
//console.log(randomPropNumber);

let randomPropName = allKeys[randomPropNumber]; //Ex: words[1] => movies //=category
//console.log(randomPropName);

//Category words
let randomPropValue = words[randomPropName];  
//console.log(randomPropValue);

//random number depends on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length); //how much the prob value have elements ex: 7, 8 
//console.log(randomValueNumber);

let randomValueVal = randomPropValue[randomValueNumber];
//console.log(randomValueVal);

//set category info 
document.querySelector(".game-info .category span").innerHTML = randomPropName;

//select letters guess container 
let lettersGuess=document.querySelector(".letters-guess");

//convert chosen word to array
let lettersAndSpace = Array.from(randomValueVal);
//console.log(lettersAndSpace);

//Create spans depend on word
lettersAndSpace.forEach(letter =>{
    //create empty span
    let emptySpan= document.createElement("span");

    //if letter is space
    if(letter === " ") {
        //add class to the span
        emptySpan.className = "has-space";
    }

    //append span to th eguess container
    lettersGuess.appendChild(emptySpan);
});

//select guess spans
let guessSpans =document.querySelectorAll(".letters-guess span");

//set wrong tries ;
let wrongTries = 0 ;

//select the draw element
let theDraw = document.querySelector(".hangmman-draw");


//handle clicking on letters
document.addEventListener("click",(e)=>{
    //set status
      let theStatus = false;

    if(e.target.className === "letter-box"){

        e.target.classList.add("clicked");

        ///get clicked letter
        let clickedLetter = e.target.innerHTML.toLowerCase();

        //the chosen word
        let chosenWord = Array.from(randomValueVal.toLowerCase());

        //Looping on the word and comparing it with letters i clicked 
        chosenWord.forEach((wordLetter,wordIndex) => {
            //if the clicked letter = one of the chosen word letter
            if(clickedLetter === wordLetter){
                //set status to true
                theStatus = true;

                //loop on all guess spans
                guessSpans.forEach((span, spanIndex)=> {

                    if(wordIndex === spanIndex){
                        span.innerHTML = clickedLetter;
                    }

                });

            }

        });
        //outside loop 

        //if chosen letter is wrong
        if(theStatus !== true){
            //increase the wrong tries
            wrongTries++;

            //add class wrong on the draw element
            theDraw.classList.add(`wrong-${wrongTries}`);

            //play fail sound
            document.getElementById("fail").play();

            if(wrongTries === 8){
                endGame();

                LettersContainer.classList.add("finished");

            }
            }else{
                document.getElementById("success").play(); 
            }
    }
});

//end game
function endGame(){
    //create pop up div
    let div = document.createElement("div");
    //create text
    let divText = document.createTextNode(`Game Over, The Word is ${randomValueVal}`);

    //append text to div
    div.appendChild(divText);

    //add class on div

    div.className = "popup";

    //append to the body

    document.body.appendChild(div);
}
