window.onload=function(){

	//Header
	var Months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
	var date=new Date();
	var day=date.getDate();
	var mon=Months[date.getMonth()];
	var year=date.getFullYear();

	var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var week=days[date.getDay()];

	var hr=date.getHours();
	var min=date.getMinutes();

	/*var ran=Math.random()%3+1;
	var images=["bg1.JPG","bg2.JPG","bg3.JPG"];
	var imag=images[Math. floor(Math. random() * images. length)];
	console.log(imag);
	var webImage=document.createElement("img");
	webImage.src=imag;
	//document.querySelector('.header ').insertAdjacentHTML("afterbegin",webImage);
	//document.querySelector('.header div').innerHTML=webImage;
	console.log(webImage)
	*/
    //Date Div

    $('#date').css({"list-style-type":"none"});
    var list1=document.createElement('li');
    var list2=document.createElement('li');
    list1.innerHTML=week+"-"+day+"/"+mon+"/"+year;
    const time=(hr>=12)?" PM":" AM";
    list2.innerHTML=hr+":"+min+time;

    document.querySelector('#date').appendChild(list1);
    document.querySelector('#date').appendChild(list2);
    $('#date li').css({"font-size":"20px","color":"MediumBlue"});

    
    //Todo Add Content
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

// clear the local storage

           
           //Trash return part remaining
   function add(str,id,done,trash){


   if(trash){ return; }
   	const Done=done?"fa fa-check-square":"fa fa-square-o";
   	const Line=done?"Line-Through":"";
    const list=`<li class="item"> 
    	         <i class="${Done}" job="complete" id=${id}></i> 
    	         <p class="${Line}"> ${str} </p> 
    	         <i class="fa fa-trash-o" job="delete" id="${id}"></i> 
    	         </li>`;
	    //console.log(document.querySelector('ul'));
	    document.querySelector('.content').insertAdjacentHTML("beforeend",list);
	    //console.log(document.querySelector('ul'));
    }

    $('.footer #input').keyup(function(e){
    	if(e.keyCode==13&&e.target.value!=""){
           add(e.target.value,id,false,false);
           //Store Todo
           LIST.push({ 
           	            name:e.target.value,
           	            id:id,
           	            done:false,
           	            trash:false
           	        });
          
          
    	      localStorage.setItem("TODO", JSON.stringify(LIST)); 
    	      id++;  
           e.target.value="";
    	}
    })

    //Update Todo
    function Complete(element){
         element.classList.toggle("fa-square-o");
     	 element.classList.toggle("fa-check-square-o");
     	 element.parentNode.querySelector('p').classList.toggle("Line-Through");
     	 LIST[element.id].done = LIST[element.id].done ? false : true;
     	// LIST[element.id].done = LIST[element.id].done ? false : true;     	 
    }
   
    function RemoveTodo(element){
    	//element.parentNode.parentNode.removeChild(element.parentNode);
    	element.parentNode.remove();

    LIST[element.id].trash = true;
       // LIST[element.id].trash = true;

    }

    //console.log($('ul'));

     $('.content').click(function(event){
     	var item=event.target;
     	 if(event.target.attributes.job.value=="complete"){
     	 Complete(event.target);
     	//console.log("if");
         }
     	else if(event.target.attributes.job.value=="delete"){
             $(item).parent().fadeOut("slow",RemoveTodo(item));

     	}
     	localStorage.setItem("TODO", JSON.stringify(LIST));
     });
       
     //Clear Button

     $('#clear i').click(function(event){
     	//document.querySelector(".content").innerHTML="";
     	localStorage.clear();
        location.reload();
     })


}