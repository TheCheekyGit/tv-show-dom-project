//You can edit ALL of the code here
const rootElem = document.getElementById("root");
const shows = getAllShows();


function setup() { 
  //const allEpisodes = getAllEpisodes(); 
  //makePageForEpisodes(allEpisodes); 
  
  
  fetch("https://api.tvmaze.com/shows/1632/episodes")
   .then((response) => response.json())
   .then((episodeList) => {
     makePageForEpisodes(episodeList);
     createDropDownList(episodeList);
     //keyUpEventListner(searchEpisodes);
   });

  let searchEpisodesBox = document.querySelector("#searchEpisodes");
  searchEpisodesBox.addEventListener("keyup", searchEpisodes);

}
//function keyUpEventListner(episodes){
//inputSearch.addEventListener("keyup", searchEpisodes)
//}

function showSelector(show){
 let select = document.getElementById("shows");
 let option = document.createElement("option");
 option.value = show.name;
 option.innerText = show.name;
 select.appendChild(option);
}

function showDropDownList (allShows){
  allShows.forEach(showSelector);
  eventListnerShowDropDown(allShows);
}

showDropDownList(shows);

function  eventListnerShowDropDown(allShows){
  let selected = document.getElementById("shows");
  selected.addEventListener("change", function(){
   let optionElement = document.querySelectorAll("option");
    let names= [];
    optionElement.forEach((option) => names.push(option.value));
    let selectedName = names.filter((name) =>selected.value === name);
    let getOneShow = shows.filter((show) => show.name == selectedName); 
    let showId = getOneShow[0].id;
    console.log(showId);
    
    async function catchBunnyEars(id){
      fetch(`https://api.tvmaze.com/shows/${id}/episodes`).then(response => response.json()).then((episodesList)=> {
      makePageForEpisodes(episodesList);
      createDropDownList(episodesList);
      console.log("episodesList");
  })
    }
    catchBunnyEars(showId);
    });
}

function createOptionForEpisodes (episode){
  let select = document.getElementById("dropDownMenu");
  let option = document.createElement("option");
  option.value = episode.name;
  option.innerText = episode.name;
  select.appendChild(option);
}

function createDropDownList (allEpisodes){
   let refresh = document.getElementById("dropDownMenu");
   refresh.replaceChildren([]);
   let createOption = document.createElement("option");
   createOption.value = "non-option"
   createOption.innerText = "Filter episodes"
   refresh.appendChild(createOption)
   allEpisodes.forEach(createOptionForEpisodes);
   eventListnerForDropDown(allEpisodes);
  
}

function eventListnerForDropDown(episodes){
  let selectId = document.getElementById("dropDownMenu");
  selectId.addEventListener("change", function(){
    let optionElement = document.querySelectorAll("option");
    let names= [];
    optionElement.forEach((option) => names.push(option.value));
    let selectedName = names.filter((name) =>selectId.value === name);
    let getOneEpisode = episodes.filter((episode) => episode.name == selectedName);

      if (getOneEpisode.length === 1){
        makePageForEpisodes(getOneEpisode);
      }else{
        makePageForEpisodes(episodes);
      }
  });
}
  
function searchEpisodes(){
   let searchEpisodesBox = document.querySelector("#searchEpisodes");
   console.log(searchEpisodesBox.value);
   const allEpisodes = getAllEpisodes();
   
   /*let count = document.querySelector(".searchbtn");
   let newPara = document.createElement("p");
    newPara.innerText = `Got ${episodeList.length} episode(s)`;
    count.appendChild(newPara);*/
  
let filteredEpisodes = allEpisodes.filter(filterEpisodes);
    makePageForEpisodes(filteredEpisodes);

  }

function filterEpisodes(episode){
    let searchEpisodesBox = document.querySelector("#searchEpisodes");
   console.log(searchEpisodesBox.value); 
   rootElem.innerHTML = "";

   if(episode.name.toLowerCase().includes(searchEpisodesBox.value.toLowerCase())){
     return true;
   }else{
     return false;
   } 
}

function makePageForEpisodes(episodeList) {
  rootElem.textContent = `Number of episodes ${episodeList.length} `;
  /*rootElem.replaceChildren([]);*/
  episodeList.forEach(createCard);

}
function displayEpisodes(numberOfEpisodes){
   rootElem.textContent = `Displaying ${episodeList.length} episode(s)`;
   
}

function createCard(episode){
  console.log(episode.image.medium);
 let card = document.createElement("span");

let cardTitle = document.createElement("h3");
cardTitle.innerText = episode.name;
cardTitle.className = "episodeAlign";
card.appendChild(cardTitle);

let cardImage = document.createElement("img");
cardImage.src = episode.image.medium;
cardImage.alt = `${episode.name}main cover`;
card.appendChild(cardImage);
rootElem.appendChild(card);

let cardEpisodeNumber = document.createElement("h5");
let seasonPadding = "";
if(episode.season < 10){
  seasonPadding = "0";

let codeText = "S" + seasonPadding + episode.season;//*line does not do anything? to check out?
cardEpisodeNumber.textContent = ` S-${episode.season} E0${episode.number}`;
card.appendChild(cardEpisodeNumber);

let cardEpisodeSummary = document.createElement("span");
cardEpisodeSummary.innerHTML = episode.summary;
card.appendChild(cardEpisodeSummary);

card.className = "episodeList";
rootElem.appendChild(card);
}
 }

window.onload = setup;
    