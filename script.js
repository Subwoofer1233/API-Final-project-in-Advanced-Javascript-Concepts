//get random 5 tips from a array i made with them
//and displayes them in the tip section
for (let i = 0; i < 10; i++) {
  let randomIndex = Math.floor(Math.random() * tipsArr.length);
  let Tips = tipsArr[randomIndex];
  let fiveTips = document.createElement("li");
  fiveTips.textContent = `${i + 1} {${Tips}}`;
  let tipDiv = document.getElementsByClassName("Tips")[0];
  tipDiv.appendChild(fiveTips);
  c(fiveTips);
}

//gets date and tells you what day it is in app
Today = Today.getDay();
c(Today);
currentDay.textContent = "Today!!";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // adds CSS class to the current day of the week and lets you know
    // what day it is by saying (Today!!)
    switch (Today) {
      case 0:
        Sunday.classList.add("CurrentDay");
        Sunday.appendChild(currentDay);
        i = 7;
        break;
      case 1:
        Monday.classList.add("CurrentDay");
        Monday.appendChild(currentDay);
        i = 1;
        break;
      case 2:
        Tuesday.classList.add("CurrentDay");
        Tuesday.appendChild(currentDay);
        i = 2;
        break;
      case 3:
        Wednesday.classList.add("CurrentDay");
        Wednesday.appendChild(currentDay);
        i = 3;
        break;
      case 4:
        Thursday.classList.add("CurrentDay");
        Thursday.appendChild(currentDay);
        i = 4;
        break;
      case 5:
        Friday.classList.add("CurrentDay");
        Friday.appendChild(currentDay);
        i = 5;
        break;
      case 6:
        Saturday.classList.add("CurrentDay");
        Saturday.appendChild(currentDay);
        i = 6;
        break;
      default:
        console.warn("Error: Invalid day of the week");
    }

    //gets data from pulled weather API
    const forecastList = data.list;
    //slices a 7 day chunk for my weather app and puts it into the mainArr array
    let mainArr = forecastList.slice(0, 7);

    //main loop that loops over adding all needed data to be displayed
    mainArr.forEach((item) => {
      //declaring all needed variables for the weather and news app
      const Day = document.querySelector(`.Day${i}`);
      const day = document.querySelector(`.Day${i}`);
      const iconCode = item.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
      const iconImg = document.createElement("img");
      const temperature = item.main.temp;
      const temperatureMin = item.main.temp_min;
      const temperatureMax = item.main.temp_max;
      const windSpeedGust = item.wind.gust;
      const windSpeed = item.wind.speed;
      const weatherDes = item.weather[0].description;
      const humidity = item.main.humidity;
      let weatherOut = document.createElement("li");
      let temp = document.createElement("li");
      let wind = document.createElement("li");
      let windGust = document.createElement("li");
      let all = document.createElement("li");

      //getting weather icons and setting the base info for the weather app to be displayed
      //using the variables
      iconImg.src = iconUrl;
      weatherOut.textContent = `The Weather is looking like {${weatherDes}}`;
      temp.textContent = `The temperature is {${temperature}}`;
      Day.appendChild(iconImg);
      Day.appendChild(temp);
      Day.appendChild(weatherOut);

      //making it so the 7 day forcast allways starts at your current day
      //it sets i to the current day value in the switch statment and the switch
      //statment deturmens what day it is using let Today = New Date()
      i++;
      if (i > 7) {
        i = 1;
      }

      //add CSS class to each day making them bigger and when it is in that state
      //it displays way more advanced info about the weather
      day.addEventListener("mousedown", () => {
        day.classList.add("moreInfo");
        Day.removeChild(iconImg);
        Day.removeChild(temp);
        Day.removeChild(weatherOut);
        all.textContent = `The weather is looking like {${weatherDes}} with a humidity of {${humidity}} and a temperature of {${temperature}} currently with a maximum temperature of {${temperatureMax}} and temperature lows of {${temperatureMin}} the winds are blowing with a speed of {${windSpeed}mph} and gust of {${windSpeedGust}mps}`;
        Day.appendChild(all);
      });

      //undos everything just mentioned putting everything back into its basic state
      day.addEventListener("mouseup", () => {
        day.classList.remove("moreInfo");
        Day.removeChild(all);
        Day.appendChild(iconImg);
        temp.textContent = `The temperature is {${temperature}}`;
        Day.appendChild(temp);
        weatherOut.textContent = `The Weather is looking like {${weatherDes}}`;
        Day.appendChild(weatherOut);
      });
    });
    c(forecastList.slice(0, 7));
  });
