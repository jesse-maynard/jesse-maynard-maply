
var city;
var state;
var latitude;
var longitude;
var map;
var newMap;

function initMap() {
        map = new google.maps.Map(document.getElementById('fake'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }
function initMap2(result) {
    var myLatLng = {lat: latitude, lng: longitude} 
   newMap = new google.maps.Map(document.getElementById('mapBack'), {
          center: {lat: latitude, lng: longitude},
          zoom: 10
        });

    var marker = new google.maps.Marker({
    position: myLatLng,
    map: newMap,
    title: 'I am here!'
  });
    console.log(city);
    console.log(latitude);
    console.log(longitude);
    
    weather_Complete(result);
    }


function geocode_Complete(result) {

    latitude = result.results[0].geometry.location.lat;
    longitude = result.results[0].geometry.location.lng;
    city = result.results[0].formatted_address;

initMap2();
}


//////////////////////////////////////////////////////

function lookupLatLong(city, state, zipBox) {

    var address = "";
    if (zipBox.length != 0) {
        address = zipBox.trim();
    } else if (city.length != 0 && state != 0) {
        address = city.trim() + ", " + state;
    } else {
        return;
    }

    //Call Google API//////////////////////////////////////

    var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="
        + address + "&key=AIzaSyAT3G-O0uGv63aJ02mtb3GKRMrDAGX_970";

    var request = {
        url: googleUrl,
        success: geocode_Complete
    };

    $.ajax(request);

}

// Trying something////////////////////////////////////

// Event Handler///////////////////////////////////////

function lookUpWeatherForZipCode_Click() {
    var zcode = $("#zipBox").val();
    lookupLatLong("", "", zcode);
}

function clearCards_Click(){
    $("#cards").empty();
}
//Document Ready///////////////////////////////////////

$(function () {
    $("#lookUpZipCode").on("click", lookUpWeatherForZipCode_Click)
    $("#clearCards").on("click", clearCards_Click)
    $("#zipBox").focus();
});

// Generate New Divs/////////////////////////////////



function locationTemplate() {
    var locationData = $("#tempDiv").html();

    locationData = locationData.replace("@@City@@", city);
    
    return locationData;

}

function generateCard(result) {
    var html = locationTemplate;
    $("#cards").append(html);
}

function weather_Complete(result) {
    generateCard(result);


}