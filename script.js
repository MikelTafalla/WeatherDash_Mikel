//Create global function so JS runs after html is loaded
$(document).ready(function(){
    // localStorage.clear();

    function WeatherApi (userCity) {

        // This is my API key
        var APIKey = "166a433c57516f51dfab1f7edaed8413";

        // Here we are building the URL we need to query the database. 5DAYS API
        // var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&appid=" + APIKey;

        //Build the URL we need to get the current weather information
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + APIKey;

        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
        url: queryURL,
        method: "GET"
        })
            // We store all of the retrieved data inside of an object called "response"
            .then(function(response) {
                console.log(response);
                $("#TitleCity").text(response.name);
                $("#Temp").text("Temperature: " + ((response.main.temp- 273.15) * 1.80 + 32).toFixed(2) + " F");
                $("#Humidity").text("Humidity: " + response.main.humidity + " %");
                $("#Wind").text("Wind Speed: " + response.wind.speed + " mph");
                $("#UVIndex").text(response.city.name);
            });        
    }
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
    //Call|Execute the function
    $(".fas").on("click", GetInput);

    CitiesList();
}); // End of ready(function())
