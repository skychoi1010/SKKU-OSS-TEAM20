function showResults() {
    onDisplay();
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
