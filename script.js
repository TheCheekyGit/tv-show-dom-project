//You can edit ALL of the code here
const rootElem = document.getElementById("root");


function setup() { 
  //const allEpisodes = getAllEpisodes(); 
  //makePageForEpisodes(allEpisodes); 
  
  fetch("https://api.tvmaze.com/shows/82/episodes")
   .then((response) => response.json())
   .then((episodeList) => {
     makePageForEpisodes(episodeList);
   });

  let searchEpisodesBox = document.querySelector("#searchEpisodes");
  searchEpisodesBox.addEventListener("keyup", searchEpisodes);

}

function searchEpisodes(){
   let searchEpisodesBox = document.querySelector("#searchEpisodes");
   console.log(searchEpisodesBox.value);

   const allEpisodes = getAllEpisodes();
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
 
  episodeList.forEach(createCard);
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
    