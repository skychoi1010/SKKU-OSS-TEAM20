function showResults() {
  onDisplay();
  showTravelTime();
}

function reset() {
  offDisplay();
  $('#starting-point').reset();
  $('#destination').reset();
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
  localStorage.setItem("dest", dest);
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
    let temp_cur = (response.main.temp - 273.15).toFixed(1);
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
  $('#travel-time-content').html('The starting point is<br>' + start_format + '<br><br>It takes about ' + duration_text + '<br>by using public transportation<br><br>The destination is<br>' + dest_format);
}

function printWeather(dest_format, temp_cur, temp_max, temp_min, feels_like, description) {
  $('#weather-info-content').html('We expect ' + description + ' at ' + dest_format + '.<br><br>The temperature will be max ' + temp_max + '&#8451; and min ' + temp_min + '&#8451;.<br>It is now ' + temp_cur + '&#8451; and it feels like ' + feels_like + '&#8451;.<br>');
}
