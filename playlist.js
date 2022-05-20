
var accessToken = 'BQCz9Kcpb7PQ3VJYtyI30D9uYIYYTalRe8kGtM96qnxRWcnIuIPHCw9qCHJRwSoj_PuihTti2gK3qzInGsDzj14EtzAz9nRrrUA2FQxR9aKygjCcdHeaLiPJP4sbME79mjKv3c97jRcdlAYuRggeKu287wcWpnqxORglaBHW1ny7';



function getPlaylist() {

    let duration = parseInt(localStorage.getItem("duration"));
    console.log(duration);
    let numtracks = parseInt(duration / 210);

    if (numtracks === 0)
        numtracks++;
    if (numtracks >= 100)
        numtracks = 100;



    let weather = localStorage.getItem("weather");
    console.log(weather);
    let genre = [];
    let artist = [];
    let tracks = [];

    switch (weather) {
        // 혁오 폴킴
        case "Cloud":
            genre = ['k-pop'];
            artist = ['57okaLdCtv3nVBSn5otJkp','4qRXrzUmdy3p33lgvJEzdv'];
            tracks = ['6DA7kCWYMggJjqPM84V2Ng','3Ml2s37uS9jqRM2R3bfDiB']
            break;
        // 헤이즈 비도 오고 그래서, 교통정리
        case "Drizzle":
        case "Rain":
            genre = ['acoustic', 'k-pop',]
            artist = ['5dCvSnVduaFleCnyy98JMo','06eQjGj6Hn76LEB1oATKtm']
            tracks = ['6FZAc2XaVYc8G8jaDnBshv']
            break;
        // badboy that that
        case "Clear":
        default:
            genre = ['k-pop']
            artist = ['2AfmfGFbe0A0WsTYm0SDTx','2dd5mrQZvg6SmahdgVKDzh']
            tracks = ['6WYsZJDfUOftGVji74yYSU','5oH4DQAuu1J1800RzUsBWa']
            break;
    }

    let user_id = 'hegria';

    let params = {
        "min_energy" : 0.4,
        "seed_artists": artist,
        "seed_genres": genre,
        "seed_tracks" : tracks,
        "min_popularity": 50,
        "market": "KR",
        "limit": numtracks
    }
    console.log(artist);
    console.log(tracks);
    console.log(genre);
    // let params = {
    //     "min_energy" : 0.4,
    //     "seed_artists": ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'],
    //     "seed_genres": ['classical'],
    //     "seed_tracks": ['11dFghVXANMlKmJXsNCbNl'],
    //     "min_popularity": 50,
    //     "market": "KR",
    //     "limit": numtracks
    // }

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

        let dest = localStorage.getItem("dest");
        // playlist 만들기
        let params = {
            "name": 'playlistgoto'+dest,
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