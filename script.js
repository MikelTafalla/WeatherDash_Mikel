//Create global function so JS runs after html is loaded
$(document).ready(function(){
    // localStorage.clear();

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
                //Current weather
                //Data to populate CurrentWeather in DOM
                $("#TitleCity").text(response.city.name + "  (" + response.list[0].dt_txt.substr(0, 10) + ")"); // Use substr(0, 10 to only retrieve date and not time from the WeatherAPI)
                $("#Temp").text("Temperature: " + ((response.list[0].main.temp- 273.15) * 1.80 + 32).toFixed(2) + " F");
                $("#Humidity").text("Humidity: " + response.list[0].main.humidity + " %");
                $("#Wind").text("Wind Speed: " + response.list[0].wind.speed + " mph");
                //For UVI index, create a variable that store the coordinates. Use them with the UVindexAPI to retrieve on currentWeather class HTML.
                var latitude = response.city.coord.lat;
                var longitude = response.city.coord.lon;
                //Transfer the loca variables to weatherUVI()
                WeatherUVI(latitude, longitude)

                //1st day after current weather. Info display from mid-day information
                $("#Date1").text(response.list[6].dt_txt.substr(0, 10));
                $("#Temp1").text("Temp: " + ((response.list[6].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
                $("#Humidity1").text("Hum.: " + response.list[6].main.humidity + " %");
                //2nd day after current weather. Info display from mid-day information
                $("#Date2").text(response.list[14].dt_txt.substr(0, 10));
                $("#Temp2").text("Temp: " + ((response.list[14].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
                $("#Humidity2").text("Hum: " + response.list[14].main.humidity + " %");
                //3nd day after current weather. Info display from mid-day information
                $("#Date3").text(response.list[22].dt_txt.substr(0, 10));
                $("#Temp3").text("Temp: " + ((response.list[22].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
                $("#Humidity3").text("Hum: " + response.list[22].main.humidity + " %");
                //4nd day after current weather. Info display from mid-day information
                $("#Date4").text(response.list[30].dt_txt.substr(0, 10));
                $("#Temp4").text("Temp: " + ((response.list[30].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
                $("#Humidity4").text("Hum: " + response.list[30].main.humidity + " %");
                //5nd day after current weather. Info display from mid-day information
                $("#Date5").text(response.list[38].dt_txt.substr(0, 10));
                $("#Temp5").text("Temp: " + ((response.list[38].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
                $("#Humidity5").text("Hum: " + response.list[38].main.humidity + " %");
                
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
