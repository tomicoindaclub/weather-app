const rootElement = document.querySelector("#root");
const weatherApiKey = "f50f14781afc48d0959123718221510";
const imageApiKey = "563492ad6f917000010000019fe6895bc4de4b2f816d02c64408d69f";

async function fetchData(url) {
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
}

async function getWeatherData() {
  let data = await fetchData(
    `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${cityName}&aqi=no`
  );
  console.log("weather : ", data);
}

async function getCityImage() {
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=nature&per_page=1`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${imageApiKey}`,
      },
    }
  );
  let imageData = await response.json();
  let imageUrl = imageData.photos[0].src.original;
  console.log(imageUrl);
}

async function getSearchData() {
  let input = document.getElementById("input-name");
  let cityName = input.value.toUpperCase();
  filteredCity = [];
  let data = await fetchData(
    `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${cityName}&aqi=no`
  );
  for (let i = 0; i < data.length; i++) {
    if (data[i].name.toUpperCase().indexOf(cityName) > -1) {
      data[i].name.push(filteredCity);
    }
  }
  console.log(cityName);
  console.log(filteredCity);
}

window.addEventListener("load", getWeatherData);
window.addEventListener("load", getCityImage);
