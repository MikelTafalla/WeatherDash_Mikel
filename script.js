//Create global function so JS runs after html is loaded
$(document).ready(function(){
    // localStorage.clear();

    // This is my API key
    var APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    // var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + UserInputCity + "&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    // $.ajax({
    //   url: queryURL,
    //   method: "GET"
    // })

    //Create empty array to fill with user input
    var Cities = [];

    //Create function to get the user input (name of city)
    function GetInput(event) {
        event.preventDefault();
        //store user's input in variable
        var userCity = $(".SearchCity").val(); 
        //Create the array of cities
        Cities.push(userCity);

    }
    //

    //Call|Execute the function
    $(".fas").on("click", GetInput);

}); // End of ready(function())