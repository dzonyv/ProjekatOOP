// set vars
var popularLeagues = [61, 39, 88, 78, 135, 140, 286];
var leagueshtml = document.getElementById("leagues");
var refresh_time = 60 * 60 * 24; // 24 sata
var current_timestamp = Math.floor( Date.now() / 1000 );

// get leagues last update time
var leagues_timestamp = window.localStorage.getItem('leagues_timestamp');

// get leagues from localstorage
var leagues = window.localStorage.getItem('leagues');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        'X-RapidAPI-Key': 'b5cfed2b13msh0231bd1bfb0d257p1e9a3cjsn92e0ed862e5f'
    }
};

console.log('Current timestamp:', current_timestamp);
console.log('Leagues timestamp:', leagues_timestamp);

// Clear localStorage for leagues to ensure fresh data is fetched
console.log('Clearing localStorage for leagues');
window.localStorage.removeItem('leagues');
window.localStorage.removeItem('leagues_timestamp');

console.log('Fetching leagues data from API...');
fetch('https://api-football-v1.p.rapidapi.com/v3/leagues?season=2024', options)
    .then(response => {
        console.log('Response Status:', response.status);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('API Response:', data);
        var leagues = data['response'];

        if (leagues && leagues.length > 0) {
            console.log('Storing leagues data in localStorage');
            window.localStorage.setItem('leagues', JSON.stringify(leagues));
            window.localStorage.setItem('leagues_timestamp', current_timestamp);

            for (var i = 0; i < leagues.length; i++) {
                AddLeagueTile(leagues[i]);
            }
        } else {
            console.error('No leagues data received from API');
        }
    })
    .catch(err => console.error('Fetch error:', err));

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
