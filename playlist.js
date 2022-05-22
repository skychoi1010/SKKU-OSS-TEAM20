
function getPlaylist() {
    var isPopupBlockerActivated = function(popupWindow) {
        if (popupWindow) {
            if (/chrome/.test(navigator.userAgent.toLowerCase())) {
                try {
                    popupWindow.focus();
                } catch (e) {
                    return true;
                }
            } else {
                popupWindow.onload = function() {
                    return (popupWindow.innerHeight > 0) === false;
                };
            }
        } else {
            return true;
        }
        return false;
    };

    var accessToken;
    let url = 'https://accounts.spotify.com/authorize?client_id=70becd8a2c0744a8b7bd5ff888f92ad2&response_type=token&redirect_uri=https://skychoi1010.github.io/SKKU-OSS-TEAM20/callback&scope=playlist-modify-public%20playlist-read-collaborative';
    popup = window.open(url,'Login with Spotify','width=800,height=600');
    if (isPopupBlockerActivated(popup)) {
        alert("팝업 차단을 해제해주세요!!");
    }
    
    popup.onbeforeunload = function() {
        accessToken = localStorage.getItem('accessToken');

        let duration = parseInt(localStorage.getItem("duration"));
        let numtracks = parseInt(duration / 210);

        if (numtracks === 0)
            numtracks++;
        if (numtracks >= 100)
            numtracks = 100;



        let weather = localStorage.getItem("weather");
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

        let songs = [];

        let query = Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');

        fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        }).then((response) =>
            response.json()
        ).then((data)=>{
            user_id = data['id'];
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
        

            data['tracks'].forEach(element => {
                songs.push({ id: element['id'], name: element['name'], artist: element['artists'][0]['name'] }
                )
            });
            let songstourl = [];
            songs.forEach((song) => {
                songstourl.push(`spotify:track:${song['id']}`);
            });

            let dest = localStorage.getItem("dest");
            let uri;
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
                uri = data['external_urls']['spotify']
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
                }).then((response) =>
                    window.open(uri)
                )
            })
        }
        );
    })
}
}
