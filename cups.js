var leagueshtml = document.getElementById("cups");
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
            AddCupTile(leagues[i]);
        }
     
    })
	.catch(err => console.error(err));

function AddCupTile(data){
    if (data['league']['type'] != "Cup") {
        return;
    }

    var cuptile = document.createElement('div');
    cuptile.classList.add("cup-tile");


    

    var logo = document.createElement('img');
    logo.src = data['league']['logo'];

    var link = document.createElement('a');
    link.setAttribute('href', 'cup.html'+"#"+data['league']['id']);
    link.setAttribute('class', 'linklige');
    link.textContent = data['league']['name'];



    cuptile.appendChild(logo);
    cuptile.appendChild(link);
    leagueshtml.appendChild(cuptile);
}