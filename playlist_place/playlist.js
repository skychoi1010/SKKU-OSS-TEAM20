
var accessToken = 'BQAXup0h-AyHC9BktgpuHVwxigPfkpH6f6pQDdxm_fqtaW5Y47KaFMxV2FtuJzeviAuUE6hZDUTiXJE2_kgUWMdGVmrZ0c5rBH7sjhvC-oHopl_9hvWvPHOhqV5lzYUPgXtYHcCTX_WF-dWBuvS4QZzuWy4ijZYZAvw4A3y_5Nt7';



function getPlaylist() {

    let duration = parseInt(localStorage.getItem("duration"));

    let numtracks = duration / 210;



    let weather = localStorage.getItem("weather");

    let genre = [];

    

    switch (weather) {
        case "Clouds":
            genre = ["indie", "r-n-b"]
            break;
        case "Clear":
            genre = ["k-pop", "dance"]
            break;
        case "Drizzle":
        case "Rain":
            genre = ["acoustic", "classical"]
            break;
        default:
            genre = ["k-pop"]
            break;
    }

    let user_id = 'hegria';

    let params = {
        "seed_artists": ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'],
        "seed_genres": ['classical'],
        "seed_tracks": ['11dFghVXANMlKmJXsNCbNl'],
        "min_popularity": 50,
        "market": "KR",
        "limit": numtracks
    }

    let songs = [];

    let query = Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');


    //노래 받아오기
    fetch('https://api.spotify.com/v1/recommendations?' + query, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
    }
    ).then((response) =>
        response.json()
    ).then((data) => {
    
        console.log(data);

        data['tracks'].forEach(element => {
            songs.push({ id: element['id'], name: element['name'], artist: element['artists'][0]['name'] }
            )
        });
        let songstourl = [];
        songs.forEach((song) => {
            songstourl.push(`spotify:track:${song['id']}`);
        });
        console.log(songstourl);
        console.log(songs);
        // playlist 만들기
        let params = {
            "name": 'newplaylistgoto',
            "public": true,
            "description": 'go a to b'
        };
        let query = Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');
        fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify(params)
        }).then((response) =>
            response.json()
        ).then((data) => {
            let playlistid = data['id'];
            let params = {
                "uris": songstourl
            }
            //곡추가하기
            fetch(`https://api.spotify.com/v1/playlists/${playlistid}/tracks`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                body: JSON.stringify(params)
            })
        })
    }
    );
}