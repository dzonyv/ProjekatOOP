// set vars
var popularLeagues = [61, 39, 88, 78, 135, 140, 286];
var leagueshtml = document.getElementById("leagues");
var refresh_time = 60 * 60 * 24; // 24 sata
var current_timestamp = Math.floor( Date.now() / 1000 );

// get leagues last update time
var leagues_timestamp = window.localStorage.getItem('leagues_timestamp');

// get leagues from localstorage
var leagues = window.localStorage.getItem('leagues');

// get leagues from API if no data OR data is old
if (leagues === null || leagues_timestamp < current_timestamp - refresh_time) {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'edc7e4668dmshced10aa2f349c12p13ed28jsn9025483f8d38'
        }
    };

    fetch('https://api-football-v1.p.rapidapi.com/v3/leagues?season=2021', options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var leagues = data['response'];

            window.localStorage.setItem('leagues', JSON.stringify(leagues));
            window.localStorage.setItem('leagues_timestamp', current_timestamp);

            for(var i = 0; i < leagues.length; i++){
                AddLeagueTile(leagues[i]);
            }
        
        })
        .catch(err => console.error(err));

} else {

    leagues = JSON.parse(leagues);

    for(var i = 0; i < leagues.length; i++){
        AddLeagueTile(leagues[i]);
    }

}


function AddLeagueTile(data){
    if (data['league']['type'] != "League" ) {
        return;
    }
    if ( popularLeagues.includes(data['league']['id']) === false ){
        return;
    }

    

    var leaguetile = document.createElement('div');
    leaguetile.classList.add("league-tile");


    var logo = document.createElement('img');
    logo.src = data['league']['logo'];

    var link = document.createElement('a');
    link.setAttribute('href', 'leaguestd.html'+"?lid="+data['league']['id']);
    link.setAttribute('class', 'linklige');
    link.textContent = data['league']['name'];



    leaguetile.appendChild(logo);
    leaguetile.appendChild(link);
    leagueshtml.appendChild(leaguetile);
}

