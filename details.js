const publicKey = '035529c68f933eef602a6c92ce8a48b7';
const privateKey = '54ea3f89a2a78dbf90a8d79bd6db25d160e026fb';
const apiUrl = 'https://gateway.marvel.com/v1/public/characters';

const ts = Date.now();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString(); // Calculate MD5 hash
    SUPERHERO_KEY='superhero';

const mainContainer=document.getElementById('main-container');
document.addEventListener('DOMContentLoaded', function () {
   
var resp=getParams(window.location.href);

superheroWithId(resp.id);
});
function getParams(url){
    var queryParameter=url.split("?")[1];
    queryParameter=queryParameter.split("&");
    var resp={};
    for(let i=0;i<queryParameter.length;i++){
        let temp=queryParameter[i].split("=");
        resp[temp[0]]=temp[1];

    }
    return resp;
}
function getItemFromLS(){
    let favSuperHeroArray=JSON.parse(localStorage.getItem(SUPERHERO_KEY))
if(!favSuperHeroArray){
    favSuperHeroArray=[];

}
return favSuperHeroArray;

}
function addItemToLS(item){
    console.log(item);
	var favSuperHeroArray = getItemFromLS();
	//validation if item is present or not
	var isPresent = false;
	favSuperHeroArray.map((tempItem)=>{
		if(item == tempItem ){
			isPresent = true;
		}
	});
	if(isPresent){
		return;
	}
	favSuperHeroArray = [item,...favSuperHeroArray];
	localStorage.setItem(SUPERHERO_KEY,JSON.stringify(favSuperHeroArray));
}
async function superheroWithId(id){
    var resp = await fetch(apiUrl+"/"+id+'?ts='+ts+'&apikey='+publicKey+'&hash='+hash);
    var data = await resp.json();
    var results = data.data.results;
    console.log(results);

    addToList(results);
}

async function superheroWithIdItem(id){
    var resp = await fetch(apiUrl+"/"+id+'?ts='+ts+'&apikey='+publicKey+'&hash='+hash);
    var data = await resp.json();
    var results = data.data.results;
    return results;
}

function addToList(results){
    if(!results || results.length<1){
        return;
    }
    const item=results[0];
    console.log(item);
    mainContainer.innerHTML=`<div id="more-details">
    <a  href=" https://www.marvel.com/characters" target="_blank"><button> more details are here</button></a>

    </div>
    <div id="details-image-container" >
    
                            <p><h4><u>${item.name}</u></h4></p>
                            <img height="450" width="450" src=${item.thumbnail.path}.${item.thumbnail.extension}>
                            
                            <div id="details-series">
                            <h2> description : ${item.description}</h2>
    <h2>No. of Comics : ${item.comics.available}</h2>
    
                               <h2>No. of Series : ${item.series.available}</h2>
                               <h2>No. of Events : ${item.events.available}</h2>
                               <h2>No. of Stories : ${item.stories.available}</h2> </div>
                               </div>
                              `;
           
    
}



(function() {
    const heart = document.getElementById('heart');
    heart.addEventListener('click', function(event) {
    heart.classList.toggle('red');
	const target = event.target;
    let arr = [];
    //If the clicked Element is the Heart Icon
    if (target.classList.contains("fav-btn")) {
        var resp=getParams(window.location.href);
        addItemToLS(resp.id);  
    }
});
})();
const addToFav=document.getElementById('heart');
addToFav.addEventListener('click', increase);
function increase(){
const cartNum=document.getElementById("cartAmount" )
cartNum.innerText= parseInt(cartNum.innerText)+1;

    
}