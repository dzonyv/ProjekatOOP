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
    score.innerHTML = data['goals']['home'] + " - " + data['goals']['away'];

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
		'X-RapidAPI-Key': 'edc7e4668dmshced10aa2f349c12p13ed28jsn9025483f8d38'
    }
})
.then(response => response.json().then(data => {
    var matchesList = data['response'];
    var fixture = matchesList[0]['fixture'];
    var goals = matchesList[0]['goals'];
    var teams = matchesList[0]['teams'];
    console.log(matchesList.length);
   //Now let's set our first match
   //elapsedTime.innerHTML = fixture['status']['elapsed'] + "'";
   //homeTeamImage.src = teams['home']['logo'];
   //homeTeamName.innerHTML = teams['home']['name'];
   //awayTeamImage.src = teams['away']['logo'];
   //awayTeamName.innerHTML = teams['away']['name'];
   //lastMatchGoal.innerHTML = goals['home']+ " - " + goals['away'];
   if(matchesList['fixture']==="undefined"){

       document.getElementById("matchTable").innerHTML = "Trenutno nema utakmica";
       document.write("kit");
   }
   else{
    for(var i = 0; i<matchesList.length;i++){
        addMatchTile(matchesList[i]);
   }
}}))
.catch(err => {
    console.log(err);
});
