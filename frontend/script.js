const rootElement = document.querySelector("#root");
const weatherApiKey = "f50f14781afc48d0959123718221510";
const imageApiKey = "563492ad6f917000010000019fe6895bc4de4b2f816d02c64408d69f";

window.addEventListener("load", function () {
  rootElement.insertAdjacentHTML(
    `afterbegin`,
    `
    <div class="container">
        <header>
          <div class="titleApp">
            <div class="logo"></div>
            <h1>Weather App</h1>
          </div>
          <div class="inputField">
            <form>
              <!-- <label for="input-name">Name: </label> for="" ide csak inputnak id-ja mehet -->
              <input
                id="input-name"
                placeholder="Write a city here..."
                type="text"
                onkeyup="getSearchData()"
                list="filtered-city-names"
              />
              <datalist id="filtered-city-names"> </datalist>
            </form>
            <button></button>
          </div>
        </header>
        <div class="block-container">
          
        </div>
    </div>
  `
  );

  const button = document.querySelector("button");
  button.addEventListener("click", function () {
    let inputField = document.querySelector("#input-name").value;

    const dataBlock = rootElement.querySelector(".block-container");
    dataBlock.innerHTML = `
    <div class="block">
      <div class="city-country">
                <h2 class="city-name"></h2>
                <p class="country-name"></p>
              </div>

              <div class="weather">
                <div class="widget">
                  <img class="city-img" src="" />
                  <div class="widget-info">
                    <div class="temp">
                      <p class="temp-data"></p>
                      <p class="temp-unit">°C</p>
                    </div>
                    <div class="icon"></div>
                  </div>
                </div>
                <div class="info">
                  <p class="info-title">Wind:</p>
                  <p class="wind"></p>
                  <hr />
                  <p class="info-title">Humidity:</p>
                  <p class="humidity"></p>
                  <hr />
                  <p class="info-title">Air pressure</p>
                  <p class="pressure"></p>
                  <hr />
                  <p class="info-title">UV:</p>
                  <p class="uv"></p>
                </div>
              </div>
        </div>
      `;

    async function getWeatherData(inputField) {
      let data = await fetchData(
        `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${inputField}&aqi=no`
      );
      console.log("weather : ", data);
      const dataWind = rootElement.querySelector(".wind");
      const dataHumidity = rootElement.querySelector(".humidity");
      const dataPressure = rootElement.querySelector(".pressure");
      const dataUV = rootElement.querySelector(".uv");
      const dataTemp = rootElement.querySelector(".temp-data");
      const dataCityName = rootElement.querySelector(".city-name");
      const dataCountryName = rootElement.querySelector(".country-name");
      const weatherIcon = rootElement.querySelector(".icon");

      dataWind.innerText = `${data.current.wind_kph} km/h`;
      dataHumidity.innerText = `${data.current.humidity} %`;
      dataPressure.innerText = `${data.current.pressure_in} in`;
      dataUV.innerText = `${data.current.uv}`;
      dataTemp.innerText = `${data.current.temp_c}`;
      dataCityName.innerText = `${data.location.name}`;
      dataCountryName.innerText = `${data.location.country}`;
      weatherIcon.innerHTML = `<img src="https:${data.current.condition.icon}" />`;
    }

    async function getCityImage(input) {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${input}&per_page=1`,
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

      const dataCityImg = rootElement.querySelector(".city-img");
      dataCityImg.src = imageUrl;
    }
    getCityImage(inputField);
    getWeatherData(inputField);
  });
});

async function fetchData(url) {
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
}

async function getSearchData(input) {
  let inputField = document.querySelector("#input-name").value;
  input = inputField.toUpperCase();
  filteredCity = [];

  let data = await fetchData(
    `https://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${inputField}&aqi=no`
  );
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    if (data[i].name.toUpperCase().indexOf(input) > -1) {
      filteredCity.push(data[i].name);
    }
  }
  console.log(input);
  console.log(filteredCity);
  let dataListValue = "";

  for (let i = 0; i < filteredCity.length; i++) {
    console.log(filteredCity[i]);

    dataListValue += `<option value="` + filteredCity[i] + `" />`;
    const dataList = rootElement.querySelector("#filtered-city-names");
    dataList.innerHTML = dataListValue;
  }
}
