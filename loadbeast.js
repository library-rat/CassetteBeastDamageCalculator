let beastArray;
let beast1;
fetch('Beast.json')
     .then((response) => response.json())
     .then((json) => beastArray = json);

const resultsBoxBeast1= document.querySelector(".result-box-beast1");
const inputBoxBeast1 = document.getElementById("input-box-beast1");
const beastStat1 = document.getElementById("beast1-stat")
const resultsBoxBeast2= document.querySelector(".result-box-beast2");
const inputBoxBeast2 = document.getElementById("input-box-beast2");
const beastStat2 = document.getElementById("beast2-stat")


inputBoxBeast1.onkeyup = function(){
    let result = [];
    let input = inputBoxBeast1.value;
    console.log(input.length);
    if(input.length){
        console.log(beastArray);
        result = beastArray.filter(function(element){
            console.log(element.name);
            console.log(element.name.toLowerCase().includes(input));
            return element.name.toLowerCase().includes(input);
        })
        //console.log(result); 
    }
    display(result,resultsBoxBeast1);
}

inputBoxBeast2.onkeyup = function(){
    let result = [];
    let input = inputBoxBeast2.value;
    if(input.length){
        console.log(beastArray);

        result = beastArray.filter(function(element){
            return element.name.toLowerCase().includes(input);
        })
    }
    display(result,resultsBoxBeast2);
}

function display(result, resultsBoxUI){
    let beastnum = (resultsBoxUI == resultsBoxBeast1) ? 1 : (resultsBoxUI == resultsBoxBeast2) ? 2:  -1 ;
    resultsBoxUI.innerHTML = '';
    result.forEach((element) => {
        const li = document.createElement("li");
        li.textContent = element.name;
        li.addEventListener("click", () => selectInput(element, beastnum));
        resultsBoxUI.appendChild(li)
    })

}

function selectInput(beast, beastnum){
    
    if(beastnum == 1){
        beast1 = beast;
        inputBoxBeast1.value = beast.name;
        resultsBoxBeast1.innerHTML = '';
        updateMonsterStat(beast1, beastStat1);

    }else if(beastnum == 2){
        beast2 = beast;
        inputBoxBeast2.value = beast.name;
        resultsBoxBeast2.innerHTML = '';
        updateMonsterStat(beast2, beastStat2);

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