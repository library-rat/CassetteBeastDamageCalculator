function toJSON(){
    
    var data = [];

    const table = document.getElementById("mw-content-text").querySelector(".wikitable");
    const tableBody = table.children[1];
    for(elt of tableBody.children){
        let beast = {};
        beast["#"] = parseInt( elt.children[2].innerHTML.slice(1));
        beast["name"] = elt.children[1].children[0].innerHTML;
        beast["type"] = elt.children[3].children[0].children[0].innerHTML
        beast["maxHP"] = parseInt(elt.children[4].innerHTML);
        beast["mAtk"] = parseInt(elt.children[5].innerHTML);
        beast["mDef"] = parseInt(elt.children[6].innerHTML);
        beast["rAtk"] = parseInt(elt.children[7].innerHTML);
        beast["rDef"] = parseInt(elt.children[8].innerHTML);
        beast["speed"] = parseInt(elt.children[9].innerHTML);

        data.push(beast);
    }
    console.log(JSON.stringify(data));
}

toJSON();