const place_type = {
    restaurent: 0,
    cafe: 1
};

function showResults() {
    onDisplay();
    var start = document.getElementById('starting-point').value;
    var dest = document.getElementById('destination').value;
    var user_id = document.getElementById('spotify-id').value;

    var place_radio = document.getElementsByName('place');
    var place_name = place_radio[0].value;
    if (place_radio[1].checked == true) {
        place_name = place_radio[1].value;
    }
    
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
