let LIST, id;
    let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        add(item.name, item.id, item.done, item.trash);
    });
}

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

localStorage.setItem("TODO", JSON.stringify(LIST)); //Add item or Update Item

 LIST[element.id].done = LIST[element.id].done ? false : true;// Toggle:True to aflse ,false to true

 LIST[element.id].trash = true;//Remove elemnet, add todo trash is true return , function will not do the proceedings

  localStorage.setItem("TODO", JSON.stringify(LIST));//Add item or Update Item 
