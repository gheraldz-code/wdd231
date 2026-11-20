// to use the common javascript
import { displayFooter, setupNavigation } 
    from "./modules/common.mjs";

displayFooter();
setupNavigation();

const API_KEY = '73e34085e2b6c8afa2c11e9d6ad78775';
const city = 'Santa Cruz';
const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

async function getWeather() {
    try {
        const response = await fetch(URL);

        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw new Error('Weather data not available');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

function displayWeather(data) {
    const currentWeather = document.querySelector("#current-weather");

    currentWeather.innerHTML = `
        <h3>${data.name}</h3>
        <p>Temperature: ${data.main.temp}&deg;C</p>
        <p>${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
}


// for the 3 days
async function getForecast() {
    try {
        const response = await fetch(FORECAST_URL);

        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw new Error('Forecast data not available');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

function displayForecast(data) {
    const forecastContainer = document.querySelector("#weather-forecast");

    const dailyForecast = data.list.filter(item => {
        return item.dt_txt.includes("12:00:00");
    }).slice(0, 3);

    forecastContainer.innerHTML = dailyForecast.map(day => `
        <article class="forecast-card">
            <h3>${new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "long"
            })}</h3>
            <p>${day.main.temp}&deg;C</p>
            <p>${day.weather[0].description}</p>
        </article>
    `).join("");
}


// the Spotlights
async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (response.ok) {
            const data = await response.json();
            displaySpotlights(data);
        } else {
            throw new Error("Members data not available");
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

function displaySpotlights(members) {
    const container = document.querySelector("#spotlights-container");

    const qualifiedMembers = members.filter(member =>
        member.membershipLevel === 2 || member.membershipLevel === 3
    );

    const shuffledMembers = qualifiedMembers.sort(() => Math.random() - 0.5);

    const selectedMembers = shuffledMembers.slice(0, 3);

    container.innerHTML = selectedMembers.map(member => `
        <article class="spotlight-card">
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">
                Visit Website
            </a>
            <p>Membership: ${member.membershipLevel === 3 ? "Gold" : "Silver"}</p>
        </article>
    `).join("");
}


// calling the 3 functions
getWeather();
getForecast();
getSpotlights();