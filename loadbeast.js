let characterArray; //contains all playable characters
let beastArray; //contains all playable beasts
let character1; //reference to the playable character of j1
let stat1 = {}; //reference to total stat on slot 1
let beast1; //reference to the beast used by j1
let character2; // reference to the playable character of j2
let beast2; //reference to the beast used by j2
let stat2 = {};//reference to total stat on slot 2



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

const statInputType = {
    character1: 0,
    character2: 1,
    beast1: 2,
    beast2: 3,
    total1: 4,
    total2: 5
}

const statblocks = [characterStat1, characterStat2, beastStat1, beastStat2, totalStat1, totalStat2]; //elements inside should be UI matching the statInputType
const statObjects = [character1, character2, beast1, beast2, stat1, stat2]; //elements inside should be the objects containing the stats


inputBoxCharacter1.addEventListener("input", () => onInputText(inputBoxCharacter1, resultsBoxCharacter1, true));

inputBoxBeast1.addEventListener("input", () => onInputText(inputBoxBeast1, resultsBoxBeast1, false));

inputBoxCharacter2.addEventListener("input", () => onInputText(inputBoxCharacter2, resultsBoxCharacter2, true));

inputBoxBeast2.addEventListener("input", () => onInputText(inputBoxBeast2, resultsBoxBeast2, false));

initializeListeners();

function initializeListeners() {
    const stats = ["maxHP", "mAtk", "mDef", "rAtk", "rDef", "speed"];
    for (let index = 0; index < Object.keys(statInputType).length; index++) {
        for (const key of stats) {
        
            let inputElt = statblocks[index].querySelector(`input[data-stat="${key}"]`);
            if (inputElt) {
                inputElt.addEventListener("input", () => onInputStat(key, inputElt, index));
            }
        }
        levelElt = statblocks[index].querySelector(`input[data-stat = level]`);
        if (levelElt){
            levelElt.addEventListener("input", () => calculatePlayerStats());

        } 
        signatureElt = statblocks[index].querySelector(`input[data-stat = signature]`);
        if (signatureElt){
            signatureElt.addEventListener("input", () => calculatePlayerStats());
        }
    }
}



function onInputText(inputBox, resultsBox, isCharacter) {//when a character is type on the input call the display funtion with the list suggestion
    let result = [];
    let input = inputBox.value;
    if (input.length) {
        if (isCharacter) {
            result = characterArray.filter(function (element) {
                return element.name.toLowerCase().includes(input);
            })
        } else {
            result = beastArray.filter(function (element) {
                return element.name.toLowerCase().includes(input);
            })
        }
    }
    display(result, resultsBox, isCharacter);
    console.log("character1 :" + JSON.stringify(character1));
    console.log("beast1 :" + JSON.stringify(beast1));
    console.log("character2 :" + JSON.stringify(character2));
    console.log("beast2 :" + JSON.stringify(beast2));
}

function onInputStat(stat, uiElt, step) {
    console.log(stat);
    console.log(uiElt);
    console.log(step);
    console.log(statObjects[step]);
    if(!statObjects[step]){
        return;
    }
    statObjects[step][stat] = uiElt.value;
    if (step < 4) { //if the modification is on a character or beast recalculate both stat
        calculatePlayerStats();
    }
    calculateDamage();
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
            statObjects[statInputType.character1] = monster;
            updateMonsterStat(character1, characterStat1);
        } else if (num == 2) {
            character2 = monster;
            inputBoxCharacter2.value = monster.name;
            resultsBoxCharacter2.innerHTML = '';
            statObjects[statInputType.character2] = monster;
            updateMonsterStat(character2, characterStat2);
        }
    } else {
        if (num == 1) {
            beast1 = monster;
            inputBoxBeast1.value = monster.name;
            resultsBoxBeast1.innerHTML = '';
            statObjects[statInputType.beast1] = monster;
            updateMonsterStat(beast1, beastStat1);
        } else if (num == 2) {
            beast2 = monster;
            inputBoxBeast2.value = monster.name;
            resultsBoxBeast2.innerHTML = '';
            statObjects[statInputType.beast2] = monster;
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

        let level;
        let signature;
        let temp = characterStat1.querySelector(`input[data-stat=level]`);
        if (temp) {
            level = temp.value;
        }
        temp = characterStat1.querySelector(`input[data-stat=signature]`);
        if (temp) {
            signature = temp.checked;
        }

        for (const key of stats) {
            let input = totalStat1.querySelector(`input[data-stat="${key}"]`);

            const calculatedValue = Math.floor(((character1[key] * (1 + 0.1 * signature) * beast1[key] * (level + 33)) / 5000) + 5);
            input.value = calculatedValue;
            stat1[key] = calculatedValue;
        }
    }

    if (character2 && beast2) {

        let level;
        let signature;
        let temp = characterStat2.querySelector(`input[data-stat=level]`);
        if (temp) {
            level = temp.value;
        }
        temp = characterStat2.querySelector(`input[data-stat=signature]`);
        if (temp) {
            signature = temp.checked;
        }

        for (const key of stats) {
            let input = totalStat2.querySelector(`input[data-stat="${key}"]`);

            const calculatedValue = Math.floor(((character2[key] * (1 + 0.1 * signature) * beast2[key] * (level + 33)) / 5000) + 5);
            input.value = calculatedValue;
            stat2[key] = calculatedValue;
        }
    }
}

function calculateDamage() {

}