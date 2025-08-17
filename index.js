function initializeUIHandlers() {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const searchButton = document.querySelector("#user-input-button");
    const userInput = document.querySelector("#user-input");
    const cards = document.querySelectorAll(".weather-card");
    const locationNameContainer = document.querySelector(".country-container");
    const location1 = (document.createElement("h3"));
    location1.textContent = "Search";
    const location2 = (document.createElement("h3"));
    location2.textContent = "For a Location";
    locationNameContainer.append(location1, location2);



    async function weatherFetch() {
        const userInputValue = userInput.value;
        userInput.value = "";
        const location = encodeURIComponent(userInputValue);

        const today = new Date();
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(today.getDate() - 3);
        const formatDate = d => d.toISOString().split("T")[0];
        const myUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${formatDate(threeDaysAgo)}/${formatDate(today)}?unitGroup=metric&key=2E5VE3U3ZRWRSTSU4WCGFATEC`;
        const jsonResponse = await (await fetch(myUrl)).json();
        location2.textContent = "";
        const currentAddress = jsonResponse.address;
        location1.textContent = currentAddress.toUpperCase();


        cards.forEach(function (node, key) {
            node.innerHTML = "";
            createCard(jsonResponse.days[3 - key], node);
        })
    }

    function createCard(weatherObj, cardContainer) {
        // Date
        const date = document.createElement("h3");
        date.classList.add("weather-date");
        date.textContent = (weatherObj.datetime === todayStr) ? "Today" : weatherObj.datetime;

        // Icon container
        const iconDiv = document.createElement("div");
        iconDiv.classList.add("icon");

        // Weather condition
        const weatherCondition = document.createElement("h4");
        weatherCondition.classList.add("weather-condition");
        weatherCondition.textContent = weatherObj.conditions;

        // Weather description
        const weatherDescription = document.createElement("p");
        weatherDescription.classList.add("weather-description");
        weatherDescription.textContent = weatherObj.description;

        // Temperature container
        const tempContainer = document.createElement("div");
        tempContainer.classList.add("temp-container");

        const minTemp = document.createElement("h4");
        minTemp.classList.add("min-temp");
        minTemp.textContent = `Min: ${weatherObj.tempmin}`;

        const currentTemp = document.createElement("h4");
        currentTemp.classList.add("current-temp");
        currentTemp.textContent = `Current: ${weatherObj.temp}`;

        const maxTemp = document.createElement("h4");
        maxTemp.classList.add("max-temp");
        maxTemp.textContent = `Max: ${weatherObj.tempmax}`;

        tempContainer.append(minTemp, currentTemp, maxTemp);

        // Append all to card
        cardContainer.append(date, iconDiv, weatherCondition, weatherDescription, tempContainer);
    }


    searchButton.addEventListener("click", function () {
        weatherFetch();
    })
}

initializeUIHandlers();
