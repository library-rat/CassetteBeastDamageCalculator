let characterArray; //contains all playable characters
let beastArray; //contains all playable beasts
let character1; //reference to the playable character of j1
let stat1; //reference to total stat on slot 1
let beast1; //reference to the beast used by j1
let character2; // reference to the playable character of j2
let beast2; //reference to the beast used by j2
let stat2;//reference to total stat on slot 2


fetch('Beast.json') //load all the beasts
    .then((response) => response.json())
    .then((json) => beastArray = json);

fetch('Character.json')//load all the playable character
    .then((response) => response.json())
    .then((json) => characterArray = json)

const resultsBoxCharacter1 = document.querySelector(".result-box-character1"); //autocompletion suggestions box
const inputBoxCharacter1 = document.getElementById("input-box-character1"); //input for character
const characterStat1 = document.getElementById("character1-stat"); //Stats of the player
const resultsBoxBeast1 = document.querySelector(".result-box-beast1"); //autocompletion suggestions box
const inputBoxBeast1 = document.getElementById("input-box-beast1");//input for character
const beastStat1 = document.getElementById("beast1-stat");//Stats of the player
const totalStat1 = document.getElementById("total1-stat")//Total Stat of player1
const resultsBoxCharacter2 = document.querySelector(".result-box-character2"); //autocompletion suggestions box
const inputBoxCharacter2 = document.getElementById("input-box-character2");//input for character
const characterStat2 = document.getElementById("character2-stat");//Stats of the player
const resultsBoxBeast2 = document.querySelector(".result-box-beast2"); //autocompletion suggestions box
const inputBoxBeast2 = document.getElementById("input-box-beast2");//input for character
const beastStat2 = document.getElementById("beast2-stat")//Stats of the player
const totalStat2 = document.getElementById("total2-stat")//Total Stat of player1

inputBoxCharacter1.addEventListener("keyup", () => onInputText(inputBoxCharacter1, resultsBoxCharacter1, true));

inputBoxBeast1.addEventListener("keyup", () => onInputText(inputBoxBeast1, resultsBoxBeast1, false));

inputBoxCharacter2.addEventListener("keyup", () => onInputText(inputBoxCharacter2, resultsBoxCharacter2, true));

inputBoxBeast2.addEventListener("keyup", () => onInputText(inputBoxBeast2, resultsBoxBeast2, false));

function onInputText(inputBox, resultsBox, isCharacter) {//when a character is type on the input call the display funtion with the list suggestion
    let result = [];
    let input = inputBox.value;
    console.log(input.length);
    if (input.length) {
        console.log(beastArray);
        if (isCharacter) {
            result = characterArray.filter(function (element) {
                return element.name.toLowerCase().includes(input);
            })
        } else {
            result = beastArray.filter(function (element) {
                console.log(element.name);
                console.log(element.name.toLowerCase().includes(input));
                return element.name.toLowerCase().includes(input);
            })
        }
        //console.log(result); 
    }
    display(result, resultsBox, isCharacter);
}


function display(result, resultsBoxUI, isCharacter) {//display the list of suggestion for the input
    let num;
    if (!isCharacter) {
        num = (resultsBoxUI == resultsBoxBeast1) ? 1 : (resultsBoxUI == resultsBoxBeast2) ? 2 : -1;
    } else {
        num = (resultsBoxUI == resultsBoxCharacter1) ? 1 : (resultsBoxUI == resultsBoxCharacter2) ? 2 : -1;
    }
    resultsBoxUI.innerHTML = '';
    result.forEach((element) => {
        const li = document.createElement("li");
        li.textContent = element.name;
        li.addEventListener("click", () => selectInput(element, num, isCharacter));
        resultsBoxUI.appendChild(li)
    })
}

function selectInput(monster, num, isCharacter) {//Set input to the selected suggestion

    if (isCharacter) {
        if (num == 1) {
            character1 = monster;
            inputBoxCharacter1.value = monster.name;
            resultsBoxCharacter1.innerHTML = '';
            updateMonsterStat(character1, characterStat1);
        } else if (num == 2) {
            character2 = monster;
            inputBoxCharacter2.value = monster.name;
            resultsBoxCharacter2.innerHTML = '';
            updateMonsterStat(character2, characterStat2);
        }
    } else {
        if (num == 1) {
            beast1 = monster;
            inputBoxBeast1.value = monster.name;
            resultsBoxBeast1.innerHTML = '';
            updateMonsterStat(beast1, beastStat1);
        } else if (num == 2) {
            beast2 = monster;
            inputBoxBeast2.value = monster.name;
            resultsBoxBeast2.innerHTML = '';
            updateMonsterStat(beast2, beastStat2);

        }
    }
}

function fetchMonster(name) {
    return beastArray.find((monster) => monster.name == name);
}

function updateMonsterStat(monster, displayUI) {
    for (let stat in monster) {
        let input = displayUI.querySelector(`input[data-stat="${stat}"]`);
        if (input) {
            input.value = monster[stat];
        }
    }
    calculatePlayerStats();
    //displayUI.innerHTML = '';

    // for (let stat in monster){
    //     const input = document.createElement('input');
    //     input.type = 'number';
    //     input.value = monster[stat];
    //     input.dataset.stat = stat;

    //     input.addEventListener('input',(entry) => {
    //         monster[stat] = parseInt(entry.target.value, 10);
    //     })
    //     displayUI.appendChild(input);
    // }
}

function calculatePlayerStats() {
    const stats = ["maxHP", "mAtk", "mDef", "rAtk", "rDef", "speed"];
    if (character1 && beast1) {

        for (const key of stats) {
            let input = totalStat1.querySelector(`input[data-stat="${key}"]`);
            input.value = Math.floor(((character1[key] * (1 + character1["signature"]) * beast1[key] * (character1["level"] + 33)) / 5000) + 5);
        }
    }
}