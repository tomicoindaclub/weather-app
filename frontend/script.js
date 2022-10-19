const rootElement = document.querySelector("#root");
const weatherApiKey = "f50f14781afc48d0959123718221510";
const imageApiKey = "563492ad6f917000010000019fe6895bc4de4b2f816d02c64408d69f";
const button = document.querySelector('button');


async function fetchData(url) {
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
}

async function getSearchData(input) {
let inputField = document.querySelector("#input-name").value;
/*   let input = inputField.value.toUpperCase();
  cityName = input; */
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
}

button.addEventListener("click", function () {
  let inputField = document.querySelector("#input-name").value;

  async function getWeatherData(inputField) {
      let data = await fetchData(
        `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${inputField}&aqi=no`
      );
      console.log("weather : ", data);
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
  } 
  getCityImage(inputField);
  getWeatherData(inputField);
})

/* window.addEventListener("load", getSearchData); */
/* getSearchData(inputField); */


// async function getWeatherData() {
//   let data = await fetchData(
//     `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${cityName}&aqi=no`
//   );
//   console.log("weather : ", data);
// }

// async function getCityImage() {
//   const response = await fetch(
//     `https://api.pexels.com/v1/search?query=${cityName}&per_page=1`,
//     {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `${imageApiKey}`,
//       },
//     }
//   );
//   let imageData = await response.json();
//   let imageUrl = imageData.photos[0].src.original;
//   console.log(imageUrl);
// }

// window.addEventListener("load", getWeatherData);
// window.addEventListener("load", getCityImage);
