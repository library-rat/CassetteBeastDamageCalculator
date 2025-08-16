function toJSON(){
    
    var data = [];

    const table = document.getElementById("mw-content-text").querySelector(".wikitable");
    const tableBody = table.children[1];
    for(elt of tableBody.children){
        let beast = {};
        beast["#"] = parseInt( elt.children[2].innerHTML.slice(1));
        beast["name"] = elt.children[1].children[0].innerHTML;
        beast["type"] = elt.children[3].children[0].children[0].innerHTML
        beast["maxHP"] = elt.children[4].innerHTML;
        beast["mATK"] = elt.children[5].innerHTML;
        beast["mDef"] = elt.children[6].innerHTML;
        beast["rAtk"] = elt.children[7].innerHTML;
        beast["rDef"] = elt.children[8].innerHTML;
        beast["speed"] = elt.children[9].innerHTML;

        data.push(beast);
    }
    console.log(JSON.stringify(data));
}

toJSON();