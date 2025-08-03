let characterArray;
let beastArray;
let character1;
let beast1;
let character2;
let beast2;



fetch('Beast.json')
     .then((response) => response.json())
     .then((json) => beastArray = json);

fetch('Character.json')
     .then((response) => response.json())
     .then((json) => characterArray = json)

const resultsBoxCharacter1 = document.querySelector(".result-box-character1");
const inputBoxCharacter1 = document.getElementById("input-box-character1");
const characterStat1 = document.getElementById("character1-stat");
const resultsBoxBeast1= document.querySelector(".result-box-beast1");
const inputBoxBeast1 = document.getElementById("input-box-beast1");
const beastStat1 = document.getElementById("beast1-stat");
const resultsBoxCharacter2 = document.querySelector(".result-box-character2");
const inputBoxCharacter2 = document.getElementById("input-box-character2");
const characterStat2 = document.getElementById("character2-stat");
const resultsBoxBeast2= document.querySelector(".result-box-beast2");
const inputBoxBeast2 = document.getElementById("input-box-beast2");
const beastStat2 = document.getElementById("beast2-stat")

inputBoxCharacter1.addEventListener("keyup", () => onInputText(inputBoxCharacter1,resultsBoxCharacter1, true));

inputBoxBeast1.addEventListener("keyup", () => onInputText(inputBoxBeast1,resultsBoxBeast1,false));

inputBoxCharacter2.addEventListener("keyup", ()=> onInputText(inputBoxCharacter2,resultsBoxCharacter2,true));

inputBoxBeast2.addEventListener("keyup", () => onInputText(inputBoxBeast2,resultsBoxBeast2,false));

function onInputText(inputBox, resultsBox, isCharacter){
    let result = [];
    let input = inputBox.value;
    console.log(input.length);
    if(input.length){
        console.log(beastArray);
        if(isCharacter){
            result = characterArray.filter(function(element){
            return element.name.toLowerCase().includes(input);
            })
        }else{
            result = beastArray.filter(function(element){
            console.log(element.name);
            console.log(element.name.toLowerCase().includes(input));
            return element.name.toLowerCase().includes(input);
        })
        }
        //console.log(result); 
    }
    display(result,resultsBox,isCharacter);
}


function display(result, resultsBoxUI, isCharacter){
    let num;
    if(!isCharacter){
        num = (resultsBoxUI == resultsBoxBeast1) ? 1 : (resultsBoxUI == resultsBoxBeast2) ? 2:  -1 ;
    }else{
        num = (resultsBoxUI == resultsBoxCharacter1) ? 1: (resultsBoxUI == resultsBoxCharacter2) ? 2: -1;
    }
    resultsBoxUI.innerHTML = '';
    result.forEach((element) => {
        const li = document.createElement("li");
        li.textContent = element.name;
        li.addEventListener("click", () => selectInput(element, num, isCharacter));
        resultsBoxUI.appendChild(li)
    })
}

function selectInput(monster, num, isCharacter){
    
    if (isCharacter){
        if(num == 1){
            character1 = monster;
            inputBoxCharacter1.value = monster.name;
            resultsBoxCharacter1.innerHTML = '';
            updateMonsterStat(character1,characterStat1);
        }else if(num == 2){
            character2 = monster;
            inputBoxCharacter2.value = monster.name;
            resultsBoxCharacter2.innerHTML='';
            updateMonsterStat(character2, characterStat2);
        }
    }else{
        if(num == 1){
            beast1 = monster;
            inputBoxBeast1.value = monster.name;
            resultsBoxBeast1.innerHTML = '';
            updateMonsterStat(beast1, beastStat1);
        }else if(num == 2){
            beast2 = monster;
            inputBoxBeast2.value = monster.name;
            resultsBoxBeast2.innerHTML = '';
            updateMonsterStat(beast2, beastStat2);

    }
}
}

function fetchMonster(name){
    return beastArray.find((monster) => monster.name== name);
}

function updateMonsterStat(monster, displayUI){
    let maxHP = monster.maxHP;
    let mAtk =monster.mAtk;
    let mDef = monster.mDef;
    let rAtk = monster.rAtk;
    let rDef = monster.rDef;
    let speed = monster.speed;
    
    content = "<input type=\"number\" value=\"" + maxHP+ "\">" +
    "<input type=\"number\" value=\"" + mAtk+ "\">" +
    "<input type=\"number\" value=\"" + mDef+ "\">" +
    "<input type=\"number\" value=\"" + rAtk+ "\">" +
    "<input type=\"number\" value=\"" + rDef+ "\">" +
    "<input type=\"number\" value=\"" + speed+ "\">";
    displayUI.innerHTML = content;   
}