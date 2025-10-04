
const apikey = "7a1b4f4eb5f56e4558abfa3850d4814e";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const weathershow = document.querySelector(".weathershow");
const searchinput = document.querySelector(".search input");
const searchBtn = document.querySelector(".searchbtn");
const weatherIcon = document.querySelector(".weather-icon");
const frontshow = document.querySelector(".frontshow");
const errorshow = document.querySelector(".errorshow");
const cityname = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

function transitionDisplay(sectionToShow) {
  const allSections = [weathershow, frontshow, errorshow];
  allSections.forEach((section) => {
    if (section.style.display === "initial") {
      section.classList.add("fade-out");

      setTimeout(() => {
        section.style.display = "none";
        section.classList.remove("fade-out");
      }, 500);
    }
  });

  setTimeout(() => {
    sectionToShow.style.display = "initial";
  }, 500);
}

async function checkweather(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);
  let weatherdata = await response.json();
  console.log(weatherdata);

  if (weatherdata.cod == "404") {
    transitionDisplay(errorshow);
    return;
  }
  cityname.innerHTML = weatherdata.name;
  temp.innerHTML = Math.round(weatherdata.main.temp) + "°C";
  humidity.innerHTML = weatherdata.main.humidity + "%";
  wind.innerHTML = Math.round(weatherdata.wind.speed * 3.6) + " km/h";

  const condition = weatherdata.weather[0].main;
  switch (condition) {
    case "Clouds":
      weatherIcon.src = "/Images/images/clouds.png";
      break;
    case "Clear":
      weatherIcon.src = "/Images/images/clear.png";
      break;
    case "Rain":
      weatherIcon.src = "/Images/images/rain.png";
      break;
    case "Drizzle":
      weatherIcon.src = "/Images/images/drizzle.png";
      break;
    case "Mist":
      weatherIcon.src = "/Images/images/mist.png";
      break;
    case "Snow":
      weatherIcon.src = "/Images/images/snow.png";
      break;
    default:
      weatherIcon.src = "/Images/images/clouds.png";
  }
  transitionDisplay(weathershow);
}
searchBtn.addEventListener("click", () => {
  if (searchinput.value.trim() !== "") {
    checkweather(searchinput.value);
    searchinput.value = "";
    searchinput.blur();
  }
});
weathershow.style.display = "none";
errorshow.style.display = "none";
frontshow.style.display = "none";

transitionDisplay(frontshow);
