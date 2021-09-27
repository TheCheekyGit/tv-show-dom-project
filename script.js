//You can edit ALL of the code here
const rootElem = document.getElementById("root");


function setup() { 
  const allEpisodes = getAllEpisodes(); 
  makePageForEpisodes(allEpisodes); 
  let searchEpisodesBox = document.querySelector("#searchEpisodes");
  searchEpisodesBox.addEventListener("keyup", searchEpisodes);

}

function searchEpisodes(){
  console.log ("Yes");
}
function makePageForEpisodes(episodeList) {
  //rootElem.textContent = `${episodeList.length} episode(s)`;
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
    