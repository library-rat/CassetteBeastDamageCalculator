let availableBeast = [
    'Khepri',
    'Miasmodeus',
    'Folklord'
]

const resultsBox= document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");

inputBox.onkeyup = function(){
    let result = [];
    let input = inputBox.value;
    if(input.length){
        result = availableBeast.filter((keyword)=>{
            return keyword.toLowerCase().includes(input);
        })
        //console.log(result); 
    }
    display(result);
}

function display(result){
    const content = result.map((list)=>{
        return "<li onclick=selectInput(this)>" + list + "</li>";
    });

    resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(list){
    inputBox.value = list.innerHTML;
    resultsBox.innerHTML = '';
}