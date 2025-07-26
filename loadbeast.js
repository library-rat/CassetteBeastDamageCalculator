let beastArray;

fetch('Beast.json')
     .then((response) => response.json())
     .then((json) => beastArray = json);

const resultsBox= document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");

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
    resultsBox.innerHTML = '';
}