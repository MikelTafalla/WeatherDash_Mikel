//Create global function so JS runs after html is loaded
$(document).ready(function(){
    // localStorage.clear();

    
    //Create empty array to fill with user input
    var Cities = [];
    
    
    //Create function to get the user input (name of city)
    function GetInput(event) {
        event.preventDefault();
        //store user's input in variable
        var userCity = $(".SearchCity").val(); 
        //Create the array of cities
        Cities.push(userCity);
        //Make a string from the cities in the Cities Array
        localStorage.setItem("CitiesNames", JSON.stringify(Cities));
        //Call the next function to store searched cities as a list
        var para = $("<p>").text(userCity);
        $("#CityList").append(para);
        //userCity, local variable. Feed parameter userCity to function WeatherApi so it can use it
        WeatherApi(userCity);
    }
    //Create function to list the cities already searched and stored in the localStorage
    function CitiesList() {
        //Convert the String into a JSON object
        Cities = JSON.parse(localStorage.getItem("CitiesNames"));
        //If CitiesNames doesn't exist in localstorage Cities will be null. If Cities is null, Cities.length will throw an error. If Cities = null, initialize Cities anyway.
        if (Cities == null) {
        Cities = [];
        }
        console.log(Cities);
        //Loop through the array of Cities
        for (var i = 0; i < Cities.length; i++) {
            var CitiesToDisplay = Cities[i];
            // I want to call them individually and then display in the list
            // print the information in a list, print every name we have in local storage
            var List = $("<p>").text(CitiesToDisplay)
            $("#CityList").append(List);
        }
    }
    // This is my API key Globalscope to use it with all API functions
    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    //Generates current weather and 5 days weather
    function WeatherApi (userCity) {

        //Build the URL we need to get the current weather information
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&appid=" + APIKey;

        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // We store all of the retrieved data inside of an object called "response"
            .then(function(response) {
                console.log(response);
                //Data to populate CurrentWeather in DOM
                $("#TitleCity").text(response.city.name);
                $("#Temp").text("Temperature: " + ((response.list[0].main.temp- 273.15) * 1.80 + 32).toFixed(2) + " F");
                $("#Humidity").text("Humidity: " + response.list[0].main.humidity + " %");
                $("#Wind").text("Wind Speed: " + response.list[0].wind.speed + " mph");
                //For UVI index, create a variable that store the coordinates. Use them with the UVindexAPI to retrieve on currentWeather class HTML.
                var latitude = response.city.coord.lat;
                var longitude = response.city.coord.lon;
                //Transfer the loca variables to weatherUVI()
                WeatherUVI(latitude, longitude)
                
            });
    } // }closes WeatherAPI ()

    //Using latitude and longitude with get UVindex and display on Currentweather DOM
    function WeatherUVI(latitude,longitude) {  
                 
        //Build the URL we need to get the UVI information
        var accessURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly,daily&appid=" + APIKey;

        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
            url: accessURL,
            method: "GET"
        })
            .then(function(response1) {
                //Print UVIndex
                $("#UVIndex").text("UV Index: " + response1.current.uvi);
            });

     
    
    } // Closes WeatherUVI()
    


    //Call|Execute the function
    $(".fas").on("click", GetInput);

    //Call Function on page load
    CitiesList();


}); // End of ready(function())
