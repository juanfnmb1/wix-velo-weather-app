$w.onReady(function () {
   
    $w("#spinner").hide(); // Hide the spinner initially
    $w("#day1").hide();
    $w("#day2").hide();
    $w("#day3").hide();
   $w("#scaleEmpty").hide();
    $w("#day1Icon").hide();
    $w("#day2Icon").hide();
    $w("#day3Icon").hide();
 
    $w("#description1").hide();
    $w("#description2").hide();
    $w("#description3").hide();
   
    $w("#weather1").hide();
    $w("#weather2").hide();
    $w("#weather3").hide();
   
	$w("#locationHeading").hide();
	$w("#errorMessage").hide();
    $w("#section5").hide();
     $w("#minMax1").hide();
     $w("#minMax2").hide();
     $w("#minMax3").hide();
  

    $w("#button1").onClick(() => {
        $w("#spinner").show(); // Show the spinner while fetching data
        $w("#scaleEmpty").hide(); // Hide the scale empty error initially
        const userInput = $w("#input1").value; // Get user input for city
        const apiKey = "4H6U5FH9RG752KRK4JMWRRUKE"; // Your Visual Crossing API key
        const location = encodeURIComponent(userInput); // Encode the location for the URL
        const date1 = new Date().toISOString().split('T')[0]; // Current date
        const date2 = new Date();
        date2.setDate(date2.getDate() + 2); // Two days from now
        const date2String = date2.toISOString().split('T')[0]; // Format date
 const isCelsius = $w("#radio1").value === "Celsius";
        const isFahrenheit = $w("#radio1").value === "Farenheit";
 if (!isCelsius && !isFahrenheit) {
            // If no temperature scale is selected, show error and stop
            $w("#spinner").hide();
            $w("#scaleEmpty").text = "Please select a temperature scale.";
            $w("#scaleEmpty").show();
            return; // Stop execution here if no scale is selected
        }
       const weatherUrl = https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date1}/${date2String}?key=${apiKey}&iconSet=icons1;

const iconMapping = {
    "snow": "https://i.imgur.com/EPhiuY0.png",
    "rain": "https://i.imgur.com/o0zXyHv.png",
    "fog": "https://i.imgur.com/ohJYMAp.png",
    "wind": "https://i.imgur.com/dHqjmsJ.png",
    "cloudy": "https://i.imgur.com/VGI9XcY.png",
    "partly-cloudy-day": "https://i.imgur.com/dOejBfd.png",
    "partly-cloudy-night": "https://i.imgur.com/wuimM1c.png",
    "clear-day": "https://i.imgur.com/dlI6bSR.png",
    "clear-night": "https://i.imgur.com/qiwVWVG.png",
};

// Fetch the weather data
fetch(weatherUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Weather API error: ' + response.statusText);
        }
        return response.json();
    })
    .then(weatherData => {
        // Access the daily forecast data
        $w("#errorMessage").hide();

        const days = weatherData.days;

        // Get the temperature unit from the radio buttons
        const isCelsius = $w("#radio1").value === "Celsius"; // Assuming "Celsius" is one of the values

        // Function to convert Fahrenheit to Celsius
        const convertToCelsius = (tempF) => (tempF - 32) * 5 / 9;

        $w("#locationHeading").text = Weather in: ${userInput};
        $w("#locationHeading").show();
        $w("#section5").show();

        // Helper function to format date as MM/DD/YYYY
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(); // Adjusting month since it's 0-indexed
        };

        // Function to update day weather
        const updateDayWeather = (dayIndex) => {
            const day = days[dayIndex]; // Get the specific day object
            
            const dayTemp = isCelsius ? convertToCelsius(day.temp).toFixed(1) + "°C" : day.temp + "°F";
            const dayMaxTemp = isCelsius ? convertToCelsius(day.tempmax).toFixed(1) + "°C" : day.tempmax + "°F";
            const dayMinTemp = isCelsius ? convertToCelsius(day.tempmin).toFixed(1) + "°C" : day.tempmin + "°F";

            $w(#day${dayIndex + 1}).text = ${formatDate(day.datetime)}; // Include formatted date
            $w(#weather${dayIndex + 1}).text = ${dayTemp}°;
            $w(#minMax${dayIndex + 1}).text = Max: ${dayMaxTemp} / Min: ${dayMinTemp}; // Show current, max, and min temperatures
            $w(#description${dayIndex + 1}).text = ${day.description}; // Include description
            $w(#day${dayIndex + 1}Icon).src = iconMapping[day.icon] || ""; // Use your icon mapping

            $w(#day${dayIndex + 1}).show();
            $w(#description${dayIndex + 1}).show();
            $w(#weather${dayIndex + 1}).show();
            $w(#minMax${dayIndex + 1}).show();
            $w(#day${dayIndex + 1}Icon).show();
        };

        // Update weather for each day
        for (let i = 0; i < Math.min(days.length, 3); i++) {
            updateDayWeather(i);
        }
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        $w("#errorMessage").show();
    })
    .finally(() => {
        $w("#spinner").hide(); // Hide the spinner after processing
    });

    });
});
