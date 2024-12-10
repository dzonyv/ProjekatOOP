var popularCups = [2, 848, 3, 531, 143, 66, 732, 45, 81];
var leagueshtml = document.getElementById("cups");
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
		'X-RapidAPI-Key': 'b5cfed2b13msh0231bd1bfb0d257p1e9a3cjsn92e0ed862e5f'
	}
};

fetch('https://api-football-v1.p.rapidapi.com/v3/leagues?season=2024', options)
	.then(response => response.json())
	.then(data => {
        console.log(data);
        var leagues = data['response']

        for(var i = 0; i<leagues.length;i++){
            AddCupTile(leagues[i]);
        }
     
    })
	.catch(err => console.error(err));

function AddCupTile(data){
    if (data['league']['type'] != "Cup") {
        return;
    }
    if ( popularCups.includes(data['league']['id']) === false ){
        return;
    }

    var cuptile = document.createElement('div');
    cuptile.classList.add("cup-tile");


    

    var logo = document.createElement('img');
    logo.src = data['league']['logo']
    var link = document.createElement('a');
    link.setAttribute('href', 'cupstd.html'+"?lid="+data['league']['id']);
    link.setAttribute('class', 'linkkupa');
    link.textContent = data['league']['name'];



    cuptile.appendChild(logo);
    cuptile.appendChild(link);
    leagueshtml.appendChild(cuptile);
}