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

    showOutfit();
    
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


/*
 *
 * 옷 추천 서비스
 *
*/
function setTempType(temp) {
    var temp_type = 0;
    if (temp >= 28) temp_type++;
    if (temp >= 23) temp_type++;
    if (temp >= 20) temp_type++;
    if (temp >= 17) temp_type++;
    if (temp >= 12) temp_type++;
    if (temp >= 9) temp_type++;
    if (temp >= 5) temp_type++;

    return temp_type;
}

//temp_curr : 현재 기온
function overcoat(temp_curr) {
    var overcoats = [];
    const temp_type = setTempType(temp_curr);

    switch(temp_type) { // temparature range
        case 0: // ( , 5)
            overcoats.push('padded jacket');
            overcoats.push('heavy coat');
            overcoats.push('heavy quilted coat');
            break;
        case 1: // [5, 9)
            overcoats.push('wool coat');
            overcoats.push('thin quilted coat');
            overcoats.push('leather jacket');
            break;
        case 2: // [9, 12)
            overcoats.push('jumper');
            overcoats.push('heavy cardigan');
            overcoats.push('trench coat');
            overcoats.push('windbreaker');
            break;
        case 3: // [12, 17)
            overcoats.push('blazer');
            overcoats.push('blue jean jacket');
            overcoats.push('cardigan');
            overcoats.push('zip-up hoodie');
            break;
        case 4: // [17, 20)
            overcoats.push('thin cardigan');
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

function topOutfit(temp_curr) {
    var tops = [];
    const temp_type = setTempType(temp_curr);

    switch(temp_type) { // temparature range
        case 0: // ( , 5)
            tops.push('fleece-lined sweater');
            tops.push('wool sweater');
            break;
        case 1: // [5, 9)
            tops.push('fleece-lined sweater');
            tops.push('wool sweater');
            break;
        case 2: // [9, 12)
            tops.push('sweater');
            tops.push('long sleeve shirts');
            break;
        case 3: // [12, 17)
            tops.push('sweater');
            tops.push('long sleeve shirts');
            tops.push('sweatshirt');
            tops.push('long sleeve polo shirts');
            break;
        case 4: // [17, 20)
            tops.push('sweatshirt');
            tops.push('long sleeve shirts');
            tops.push('polo shirt');
            break;
        case 5: // [20, 23)
            tops.push('blouse');
            tops.push('long sleeve shirts');
            break;
        case 6: // [23, 28)
            tops.push('short sleeve shirt');
            tops.push('thin polo shirt');
            break;
        case 7: // [28, )
            tops.push('short sleeve shirt');
            tops.push('sleeveless shirt');
            break;
    }

    return tops;
}

function bottomOutfit(temp_curr) {
    var bottoms = [];
    const temp_type = setTempType(temp_curr);

    switch(temp_type) { // temparature range
        case 0: // ( , 5)
            bottoms.push('fleece-lined pants');
            break;
        case 1: // [5, 9)
            bottoms.push('long trousers');
            break;
        case 2: // [9, 12)
            bottoms.push('long trousers');
            bottoms.push('slacks');
            break;
        case 3: // [12, 17)
            bottoms.push('slacks');
            bottoms.push('jeans');
            break;
        case 4: // [17, 20)
            bottoms.push('slacks');
            bottoms.push('jeans');
            bottoms.push('long skirt');
            break;
        case 5: // [20, 23)
            bottoms.push('cotton pants');
            bottoms.push('long skirt');
            break;
        case 6: // [23, 28)
            bottoms.push('short skirt');
            bottoms.push('short pants');
            break;
        case 7: // [28, )
            bottoms.push('linen pants');
            bottoms.push('short pants');
            break;
    }

    return bottoms;
}

const temp_curr_ = 25.0; // this is a temporary code

function showOutfit() {
    const coat = overcoat(temp_curr_);
    const top = topOutfit(temp_curr_);
    const bottom = bottomOutfit(temp_curr_);

    var recommend = "";
    if (coat.length === 0) {
        recommend += "You don't need to take outer clothing.";
    }
    else {
        recommend += "Recommended Outer Clothing : ";
        for (let item of coat) {
            recommend += item + ", ";
        }
        recommend.slice(0, -2);
    }

    recommend += "<br><br>Recommend Top : ";
    for (let item of top) {
        recommend += item + ", ";
    }
    recommend.slice(0, -2);
    
    recommend += "<br><br>Recommend Bottoms : ";
    for (let item of bottom) {
        recommend += item + ", ";
    }
    recommend.slice(0, -2);

    document.getElementById("outfit-recommend-content").innerHTML = recommend;
}