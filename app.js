const cityEndpoint = "https://geocoding-api.open-meteo.com/v1/";
const waetherEndpoint = "https://api.open-meteo.com/v1/";


searchButton = document.querySelector(".search").addEventListener("click", (event) => {
    event.preventDefault();
    const cityName = document.querySelector("#cityName").value;
    
    async function fetchData() {
        console.log(cityName);
        const cityData = await fetch(`${cityEndpoint}search?name=${cityName}&count=1&language=en&format=json`)
        const cityDataJson = await cityData.json();
        const latitude = cityDataJson.results[0].latitude;
        const longitude = cityDataJson.results[0].longitude;

        const weatherData = await fetch(`${waetherEndpoint}forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,rain,showers&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`);
        const weatherDataJson = await weatherData.json();
        console.log(weatherDataJson.current.temperature_2m);

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
        const image = document.createElement("img");
        
        const cityP = document.createElement("p");
        cityP.textContent = cityName;
        cityP.classList.add("cityName")
        const tempP = document.createElement("p");
        tempP.textContent = `${weatherDataJson.current.temperature_2m}°C`
        tempP.classList.add("temperature")

        image.classList.add("bg-image");
        if (weatherDataJson.current.is_day === 0){
            image.src = "./images/night.jpg"
            document.querySelector("body").classList.add("dark");
        } else {
            image.src = "./images/day.jpg";
            document.querySelector("body").classList.add("light");
        }


        imageContainer.appendChild(image);
        imageContainer.appendChild(cityP);
        imageContainer.appendChild(tempP);

        const tableContainer = document.createElement("table");
        tableContainer.classList.add("tableContainer");

        if (weatherDataJson.current.is_day === 0){
            tableContainer.classList.add("dark-table");
        } else {
            tableContainer.classList.add("light-table");
        }

        const countryTr = document.createElement("tr");
        const timezoneTr = document.createElement("tr");
        const populationTr = document.createElement("tr");
        const forecastTr = document.createElement("tr");

        const countryTh = document.createElement("th");
        countryTh.textContent = "Country";
        const countryTd = document.createElement("td");
        countryTd.textContent = cityDataJson.results[0].country
        countryTr.appendChild(countryTh);
        countryTr.appendChild(countryTd);

        const populationTh = document.createElement("th");
        populationTh.textContent = "Population";
        const populationTd = document.createElement("td");
        populationTd.textContent = cityDataJson.results[0].population;
        populationTr.appendChild(populationTh);
        populationTr.appendChild(populationTd);

        const timezoneTh = document.createElement("th");
        timezoneTh.textContent = "Timezone";
        const timezoneTd = document.createElement("td");
        timezoneTd.textContent = cityDataJson.results[0].timezone;
        timezoneTr.appendChild(timezoneTh);
        timezoneTr.appendChild(timezoneTd);

        const forecastTh = document.createElement("th");
        forecastTh.textContent = "Tomorrow's forecast";
        const forecastTd = document.createElement("td");
        forecastTd.textContent = `Low: ${weatherDataJson.daily.temperature_2m_max}°C ${ weatherDataJson.daily.temperature_2m_min}°C`;
        forecastTr.appendChild(forecastTh); 
        forecastTr.appendChild(forecastTd);


        tableContainer.appendChild(countryTr);
        tableContainer.appendChild(timezoneTr);
        tableContainer.appendChild(populationTr);
        tableContainer.appendChild(forecastTr);

        document.body.appendChild(imageContainer);
        document.body.appendChild(tableContainer);
        
    };
    fetchData();
})

