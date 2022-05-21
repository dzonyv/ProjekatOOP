var leagueshtml = document.getElementById("leagues");
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

        for(var i = 0; i<leagues.length;i++){
            AddLeagueTile(leagues[i]);
        }
     
    })
	.catch(err => console.error(err));

function AddLeagueTile(data){
    if (data['league']['type'] != "League") {
        return;
    }

    var leaguetile = document.createElement('div');
    leaguetile.classList.add("league-tile");


    var logo = document.createElement('img');
    logo.src = data['league']['logo'];

    var link = document.createElement('a');
    link.setAttribute('href', 'league.html'+"#"+data['league']['id']);
    link.setAttribute('class', 'linklige');
    link.textContent = data['league']['name'];



    leaguetile.appendChild(logo);
    leaguetile.appendChild(link);
    leagueshtml.appendChild(leaguetile);
}

