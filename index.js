function GetInfo() {
  var newName = document.getElementById("cityInput");
  var cityName = document.getElementById("cityName");
  cityName.innerHTML = newName.value;

  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      newName.value +
      "&units=metric&appid=652400eb6610960eab93c867e918ce0d"
  )
    .then((response) => response.json())
    .then((data) => {
      //Getting the min and max values for each day
      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Min").innerHTML =
          "Temp_min: " + Number(data.list[i].main.temp_min).toFixed(1) + "°C";
        //Number(1.3450001).toFixed(2); // 1.35
      }

      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Max").innerHTML =
          "Temp_max: " + Number(data.list[i].main.temp_max).toFixed(2) + "°C";
      }

      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Hum").innerHTML =
          "Humidity:  " + Number(data.list[i].main.humidity);
      }
      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Wind").innerHTML =
          "Wind Speed:  " + Number(data.list[i].wind.speed);
      }
      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Date").innerHTML =
          "Description:  " + data.list[i].weather[0].description;
      }

      //Getting Weather Icons
      for (i = 0; i < 5; i++) {
        document.getElementById("img" + (i + 1)).src =
          "http://openweathermap.org/img/wn/" +
          data.list[i].weather[0].icon +
          ".png";
      }
      console.log(data);
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?'" + newName.value + ")";
    })

    .catch((err) =>
      alert("Something Went Wrong: Try Checking Your Internet Coneciton")
    );
}

function DefaultScreen() {
  document.getElementById("cityInput").defaultValue = "Delhi";
  GetInfo();
}

//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//Function to get the correct integer for the index of the days array
function CheckDay(day) {
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}

for (i = 0; i < 5; i++) {
  document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}
