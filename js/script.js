var celsius, farenheit;
const API_KEY = '867c3d0cf0d7f4b5891451bd22482f53';
var API_URL = 'https://api.openweathermap.org/data/2.5/weather';
console.log(getLatLong());
console.log(celcius);


function getLatLong() {
  $.ajax({
  		url: "https://geoip-db.com/jsonp",
  		jsonpCallback: "callback",
  		dataType: "jsonp",
  		success: function( location ) {
        let lat = location.latitude;
        let long = location.longitude;
  			$('.country').html(location.country_name);
  			$('#state').html(location.state);
  			$('.city').html(location.city);
  			$('#latitude').html(location.latitude);
  			$('#longitude').html(location.longitude);
  			$('#ip').html(location.IPv4);
        API_URL += "?lat=" + lat + "&lon=" + long + "&APPID=" + API_KEY + "&units=imperial";
        getWeather();
        tempConverter();
  		}
  	});
}

function getWeather() {
  $.ajax({
    url: API_URL,
    type: 'GET',
    dataType: "json",
    success: function(data) {
      farenheit = data.main.temp;
      celsius = (farenheit - 32) * .5556;
      let icon = data.weather[0].icon;
      let details = data.weather[0].main + ", "+ data.weather[0].description;
      console.log(icon);
      $('.temp').html(farenheit + "&#8457;");
      $('.weather-details').html(details);
      $('.iconpic > img').attr('src','http://openweathermap.org/img/w/' + icon + '.png');
    }
  });
}

function tempConverter() {

  $('.toggle .btn').click(function(){
    // if the div has attribute id as c then convert temperature to fahrenheit
    if($('.toggle').attr('id')=='c'){
      $('.temp').html(farenheit+"&#8457;");
      $('.toggle').attr('id','f');
    } else {
     if($('.toggle').attr('id')=='f'){
      //else if div has attribute id as f than convert temperature to celsius
      $('.temp').html( celsius +"&#8451;");
      $('.toggle').attr('id','c');
    }
  }
  });
}
