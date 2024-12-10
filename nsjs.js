/*  function myFunction() {
    document.getElementById("korisnik").innerHTML = User.firstName.toString() + " " + User.lastName.toString();
  }
  var User = {
    firstName: "Nikola",
    lastName: "Vlacic",

  };
*/

//var elapsedTime = document.querySelector("#elapsed");
//var homeTeamImage = document.querySelector("#homeLogo");
//var homeTeamName = document.querySelector("#homeName");
//var awayTeamImage = document.querySelector("#awayLogo");
//var awayTeamName = document.querySelector("#awayName");
//var lastMatchGoal = document.querySelector("#goals");
var matchTable = document.querySelector("#matchTable");


//the functions to create an element
function addMatchTile(data){
    //createing the tile div
    var matchtile = document.createElement('div');
    matchtile.classList.add("match-tile");
    
    var minutaza = document.createElement('div');
    minutaza.classList.add("minutaza");
    minutaza.innerHTML=data['fixture']['status']['elapsed'] + "'";
    

    //creating the home match box
    var homeTeam = document.createElement('div');
    homeTeam.classList.add("team");
    //creating the image and the text
    var homeTileTeamName = document.createElement('p');
    homeTileTeamName.innerHTML = data['teams']['home']['name'];
    var homeTileTeamLogo = document.createElement('img');
    homeTileTeamLogo.src=data['teams']['home']['logo'];
    homeTeam.appendChild(homeTileTeamLogo);
    homeTeam.appendChild(homeTileTeamName);

    var awayTeam = document.createElement('div');
    awayTeam.classList.add("team");
    //creating the image and the text
    var awayTileTeamName = document.createElement('p');
    awayTileTeamName.innerHTML = data['teams']['away']['name'];
    var awayTileTeamLogo = document.createElement('img');
    awayTileTeamLogo.src=data['teams']['away']['logo'];
    awayTeam.appendChild(awayTileTeamLogo);
    awayTeam.appendChild(awayTileTeamName);

    //createing the score
    var score = document.createElement('p');
    score.innerHTML = data['goals']['home'] + " - " + data['goals']['away']

    //append all the element to the parent
    matchtile.appendChild(homeTeam);
    matchtile.appendChild(score);
    matchtile.appendChild(minutaza);
    matchtile.appendChild(awayTeam);
    matchTable.appendChild(matchtile);
} 

//fetching the data
fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all", {
    "method": "GET",
    "headers": {
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
		'X-RapidAPI-Key': 'b5cfed2b13msh0231bd1bfb0d257p1e9a3cjsn92e0ed862e5f'
    }
})
.then(response => response.json().then(data => {
    console.log('API Response:', data);
    var matchesList = data['response'];
    console.log('Matches List:', matchesList);
    if(matchesList.length > 0 && matchesList[0]['fixture'] !== undefined){
        for(var i = 0; i < matchesList.length; i++){
            addMatchTile(matchesList[i]);
        }
    } else {
        document.getElementById("matchTable").innerHTML = "Trenutno nema utakmica";
    }
}))
.catch(err => {
    console.log(err);
});
