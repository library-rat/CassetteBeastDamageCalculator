let beastArray;
let beast1;
fetch('Beast.json')
     .then((response) => response.json())
     .then((json) => beastArray = json);

const resultsBox= document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");
const monsterStat = document.getElementById("monster-stat")

inputBox.onkeyup = function(){
    let result = [];
    let input = inputBox.value;
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
    display(result);
}

function display(result){
    const content = result.map((list)=>{
        return "<li onclick=selectInput(this)>" + list.name + "</li>";
    });

    resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(list){
    inputBox.value = list.innerHTML;
    beast1 = fetchMonster(list.innerHTML);
    resultsBox.innerHTML = '';
    updateMonsterStat(beast1);
}

function fetchMonster(name){
    return beastArray.find((monster) => monster.name== name);
}

function updateMonsterStat(monster){
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
    monsterStat.innerHTML = content;
    
    
}