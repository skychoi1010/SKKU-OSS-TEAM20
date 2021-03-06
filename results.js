const place_type = {
    restaurent: 0,
    cafe: 1
};

function showResults() {
  onDisplay();

  showTravelTime();
  showOutfit();
  //showPlace();

  // smooth scroll
  $(document).ready(function(){
  	$(".nav-link").on('click', function(event) {

      	if (this.hash !== "") {

  			event.preventDefault();

  			var hash = this.hash;

  			$('html, body').animate({
  				scrollTop: $(hash).offset().top
  			}, 700, function(){
  				window.location.hash = hash;
  			});
        	}
      });
  });
}

function reset() {
  offDisplay();
  $('#starting-point').reset();
  $('#destination').reset();

}

function reset() {
    offDisplay();
    $('#starting-point').reset;
    $('#destination').reset;
}

function onDisplay() {
  $('#tabs').show();
}

function offDisplay() {
  $('#tabs').hide();
}

let geocoder;
let lat, long;
let duration, weather;
let start_format, dest_format;

function showTravelTime() {
  var geocoder = new google.maps.Geocoder();
  start = document.getElementById('starting-point').value;
  dest = document.getElementById('destination').value;
  localStorage.setItem('dest', dest);
  // console.log(start + dest);
  geocoder.geocode( {'address': start}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      start_format = results[0].formatted_address;
    } else {
      console.log("Geocode was not successful for the following reason: " + status);
    }
  });
  geocoder.geocode( {'address': dest}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      dest_format = results[0].formatted_address;

      s = results[0].geometry.location.toString();
      lat = s.replace('(','').replace(')','').split(', ')[0];
      long = s.replace('(','').replace(')','').split(', ')[1];

      showWeather();
    } else {
      console.log("Geocode was not successful for the following reason: " + status);
    }
  });

  var origin1 = start;
  // var origin2 = new google.maps.LatLng(55.930385, -3.118425);
  var destinationA = dest;
  // var destinationB = new google.maps.LatLng(50.087692, 14.421150);

  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin1],
      destinations: [destinationA],
      travelMode: google.maps.TravelMode.TRANSIT,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    }, callback);
    function callback(response, status) {
      // console.log(JSON.stringify(response));
      let duration_text = response['rows'][0]['elements'][0].duration.text;
      duration = response['rows'][0]['elements'][0].duration.value;
      localStorage.setItem("duration", duration.toString());
      // console.log(duration);
      printTraveltime(start_format, dest_format, duration_text);
    }
}

function showWeather(event) {
  var latitude = lat;
  var longitude = long;

  let apiKey = "de545a26c4e8bfd9d6fd0dd858a53a3d"
  let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude
  + "&lon=" + longitude
  + "&appid=" + apiKey;

  let options = { method: 'GET' }
  $.ajax(weatherUrl, options).then((response) => {
    // console.log(response)
    let icon = response.weather[0].icon;
    let iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector("#weathericon").src = iconUrl;
    $("#weathericon").css('height', '100px');
    let temp_cur = (response.main.temp - 273.15).toFixed(1);
    localStorage.setItem("temp-cur", temp_cur);
    let temp_max = (response.main.temp_max - 273.15).toFixed(1);
    let temp_min = (response.main.temp_min - 273.15).toFixed(1);
    let feels_like = (response.main.feels_like - 273.15).toFixed(1);
    let description = response.weather[0].description;
    weather = JSON.stringify(response.main);
    localStorage.setItem("weather", response.weather[0].main);
    // console.log(description);
    printWeather(dest_format, temp_cur, temp_max, temp_min, feels_like, description);
  }).catch((error) => {
    console.log(error)
  });
}

function printTraveltime(start_format, dest_format, duration_text) {
    $('#start-point-content').html('The starting point is<br><I>' + start_format + '</I>');
    $('#dest-point-content').html('The destination is<br><I>' + dest_format + '</I>');
    $('#travel-time-content').html('It takes about <I>' + duration_text + '</I><br><p>by using public transportation<p>');
}

function printWeather(dest_format, temp_cur, temp_max, temp_min, feels_like, description) {
  $('#weather-info-content').html('<strong>We expect ' + description + ' at  ' + dest_format + '.<br><br>The temperature will be max ' + temp_max + ' &#8451; and min ' + temp_min + ' &#8451;.<br>It is now ' + temp_cur + ' &#8451; and it feels like ' + feels_like + ' &#8451;.</strong>');
}


/*
 *
 * ??? ?????? ?????????
 *
*/

//temp_curr : ?????? ??????
function overcoat(temp_type) {
    var overcoats = [];

    switch(temp_type) { // temparature range
        case 0: // ( , 5)
            overcoats.push('a padded jacket');
            overcoats.push(', a heavy coat');
            overcoats.push(', or a heavy quilted coat');
            break;
        case 1: // [5, 9)
            overcoats.push('a wool coat');
            overcoats.push(', a thin quilted coat');
            overcoats.push(', or a leather jacket');
            break;
        case 2: // [9, 12)
            overcoats.push('a jumper');
            overcoats.push(', a heavy cardigan');
            overcoats.push(', a trench coat');
            overcoats.push(', or a windbreaker');
            break;
        case 3: // [12, 17)
            overcoats.push('a blazer');
            overcoats.push(', a blue jean jacket');
            overcoats.push(', a cardigan');
            overcoats.push(', or a zip-up hoodie');
            break;
        case 4: // [17, 20)
            overcoats.push('a thin cardigan');
            break;
        case 5: // [20, 23)
            overcoats.push('thin sleeve shirts');
            break;

        // - no need to bring a coat -
        case 6: // [23, 28)
            break;
        case 7: // [28, )
            break;
    }

    return overcoats;
}

function topOutfit(temp_type) {
    var tops = [];

    switch(temp_type) { // temparature range
        case 0: // ( , 5)
            tops.push('a fleece-lined sweater');
            tops.push(' or a wool sweater');
            break;
        case 1: // [5, 9)
            tops.push('a fleece-lined sweater');
            tops.push(' or a wool sweater');
            break;
        case 2: // [9, 12)
            tops.push('a sweater');
            tops.push(' or long sleeve shirts');
            break;
        case 3: // [12, 17)
            tops.push('a sweater');
            tops.push(', long sleeve shirts');
            tops.push(', a sweatshirt');
            tops.push(', or long sleeve polo shirts');
            break;
        case 4: // [17, 20)
            tops.push('a sweatshirt');
            tops.push(', long sleeve shirts');
            tops.push(', or a polo shirt');
            break;
        case 5: // [20, 23)
            tops.push('a blouse');
            tops.push(' or long sleeve shirts');
            break;
        case 6: // [23, 28)
            tops.push('a short sleeve shirt');
            tops.push(' or a thin polo shirt');
            break;
        case 7: // [28, )
            tops.push('a short sleeve shirt');
            tops.push(' or a sleeveless shirt');
            break;
    }

    return tops;
}

function bottomOutfit(temp_type) {
    var bottoms = [];

    switch(temp_type) { // temparature range
        case 0: // ( , 5)
            bottoms.push('fleece-lined pants');
            break;
        case 1: // [5, 9)
            bottoms.push('long trousers');
            break;
        case 2: // [9, 12)
            bottoms.push('long trousers');
            bottoms.push(' or slacks');
            break;
        case 3: // [12, 17)
            bottoms.push('slacks');
            bottoms.push(' or jeans');
            break;
        case 4: // [17, 20)
            bottoms.push('slacks');
            bottoms.push(', jeans');
            bottoms.push(', or long skirt');
            break;
        case 5: // [20, 23)
            bottoms.push('cotton pants');
            bottoms.push(' or long skirt');
            break;
        case 6: // [23, 28)
            bottoms.push('short skirt');
            bottoms.push(' or short pants');
            break;
        case 7: // [28, )
            bottoms.push('linen pants');
            bottoms.push(' or short pants');
            break;
    }

    return bottoms;
}

function showOutfit() {
    var temp_type = 0;
    var temp = localStorage.getItem("temp-cur");
    if (temp >= 28) temp_type++;
    if (temp >= 23) temp_type++;
    if (temp >= 20) temp_type++;
    if (temp >= 17) temp_type++;
    if (temp >= 12) temp_type++;
    if (temp >= 9) temp_type++;
    if (temp >= 5) temp_type++;
    const coat = overcoat(temp_type);
    const top = topOutfit(temp_type);
    const bottom = bottomOutfit(temp_type);

    var recommend = "";
    if (coat.length === 0) {
        recommend += "You don't need to take outer clothing.";
    }
    else {
        recommend += "<strong>";
        for (let item of coat) {
            recommend += item;
        }
        recommend += "</strong> is recommended for outerwear today.";
    }

    recommend += "<br><br>Also, it is recommended to wear <strong>";
    for (let item of top) {
        recommend += item;
    }
    recommend += "</strong> for the top and <strong>";
    for (let item of bottom) {
        recommend += item;
    }
    recommend += "</strong> for the bottom.";

    document.getElementById("outfit-recommend-content").innerHTML = recommend;
}
