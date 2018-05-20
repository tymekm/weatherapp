var lat = 0;
var lon = 0;

//initializing JSON
var weatherJson=0;

//Hide boxes untill execution 
var hidden = document.getElementsByClassName("hidden");
	for(var i=0; i < hidden.length; i++){
	hidden[i].style.display = "none";
	}

function convertTemp(){
	var checkbox = document.getElementById("checkbox").checked;
	if(weatherJson.main != undefined){
		if (checkbox==true){
		document.getElementById("temp").innerHTML = Math.floor(weatherJson.main.temp) + " ℃";
		}else if(checkbox==false){
		document.getElementById("temp").innerHTML = Math.floor(weatherJson.main.temp *9/5+32) + " ℉" ;
		}
	}
}

function getLocation (){
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			lat = position.coords.latitude;
			lon = position.coords.langtitude;
			removeButton();
		});
		
	}else{
		alert("Geolocation is not supported by your browser");
	}
}

function removeButton(){
	document.getElementById("geo-allow").remove();
}

function degreeToCompass(deg){
	num = Math.floor(deg / 22.5 + 0.5);
  arr=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
	var wind = arr[(num % 16)] + " " + Math.floor(deg) + "°" + " " + weatherJson.wind.speed + " Knots";
	document.getElementById("wind").innerHTML = wind;
}

// Get weather Json
function getWeather(){
//var requestURL = "https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139";
var requestURL = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon; 
var request = new XMLHttpRequest();
	request.open('get', requestURL);
	request.responseType = 'json';
	request.send();
request.onload = function(){
	weatherJson = request.response;

	//execute various functions
	printWeather();
	changeBg();
	insertIcon();
	showHidden();
};
}

//Show hidden elements
function showHidden(){
	for(var i=0; i < hidden.length; i++){
	hidden[i].style.display = "flex";
	}
}

//Feed weather data to html
function printWeather(){
	console.log(weatherJson.weather[0].icon);
	console.log(weatherJson.weather[0].id);
	console.log(weatherJson.main.temp + " Celcius");
	document.getElementById("weather").innerHTML = weatherJson.weather[0].description;
	convertTemp();
	degreeToCompass(weatherJson.wind.deg);
	document.getElementById("location").innerHTML = weatherJson.name + "  " + weatherJson.sys.country;
//	try2.innerHTML = weatherJson;
}

//Insert icon icon
	var x=0;
function insertIcon(){
	var img = new Image();
	img.src = weatherJson.weather[0].icon;
	var icon = document.getElementById("icon");

	if(x==0){
		icon.appendChild(img);
		x++;
	}else if(x!=0){
		icon.removeChild(icon.childNodes[0]);
		icon.appendChild(img);
	} 
}

function changeBg(){
	var id = weatherJson.weather[0].id;
	//var id = 600;
	var codition = 0;
	if(id>=200 && id<=232){
		condition = "thunder";
	}else if (id>=300 && id<=531){
		condition = "rain";
	}else if(id>=600 && id<=622) {
		condition = "snow";
	}else if(id==800){
		condition = "clear";
	}else if(id>800 && id<805){
		condition = "clouds";
	}else {
		condition = "value out of bounds";
	}
	console.log(condition);
	document.body.style.backgroundImage = "url(images/" + condition + ".jpg)";
}
