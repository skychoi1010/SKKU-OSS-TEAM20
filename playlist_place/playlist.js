
var accessToken = 'BQD7mIYuM_BiqwLuB-a9pwqnkjwNZeRXpppSpSTN02xj_IgTrFExfvq7IK2wU_SRrEJkNBlYqjM8Cbrohj6vNWothJAQR142uVIgDbTL1Y9gYrYfHXM34jmPeHpiEWo7M_NM6-aTS5zS6mMXZ2IyiBSU';


let params ={
    "min_energy": 0.4,    
    "seed_artists": ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'],
    "seed_genres": ['classical'],
    "seed_tracks": ['11dFghVXANMlKmJXsNCbNl'],
    "min_popularity": 50
}

let query = Object.keys(params).map(k => encodeURIComponent(k)+ '='+encodeURIComponent(params[k])).join('&');

fetch('https://api.spotify.com/v1/recommendations?'+query,{
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+accessToken
    },

    
}

).then((response) =>
    response.json()
).then((data)=>
    console.log(data)
);