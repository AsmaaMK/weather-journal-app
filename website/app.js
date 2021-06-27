/** url form
 * api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
 *
 * units=metric ==> To get data in API for both current weather and forecast in Celsius
 * if country code is not specified then the search works for USA as a default.
*/
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = ',&appid=a9dca43148b1ae4af344fcb96297abe9';
const tempUnit = '&units=metric';

/* Global Variables */
const zipCodeInput = document.getElementById('zip');
const feelingsInput = document.getElementById('feelings');
const generateBtn = document.getElementById('generate');
let zipCode;
let feelings;

const server = 'http://localhost:3000';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();

/** 
 * Event listener onclick the generate button to get the zipcode and feelings
 * entered by the user and get the data from api then show it on the screen
*/
generateBtn.addEventListener('click', () => {
    zipCode = zipCodeInput.value;
    feelings = feelingsInput.value;
    zipCodeInput.value = '';
    feelingsInput.value = '';

    getDataFromAPI().then((res) => {
        // destructing the data object
        const {
            name,
            main: { temp },
            weather: [{ description, icon: iconId }]
        } = res;

        const data = {
            city: name,
            temp: temp,
            desc: description,
            icon: 'https://openweathermap.org/img/wn/' + iconId + '@2x.png',
            feeling: feelings
        };

        postData(server + '/add', data);

    });
});

/**
 * @description Async function to GET Web API Data
 * @returns {Promise} result
*/
const getDataFromAPI = async () => {
    const url = baseURL + zipCode + apiKey + tempUnit;
    const res = await fetch(url);
    try {
        const result = await res.json();
        if (result.cod != 200) {
            alert(result.message);
            throw result.message;
        }
        return result;
    } catch (error) {
        console.error('Error: ' + error);
    }
};

/**
 * @description Async fuction to POST data to the server
 * @param {string} url
 * @param {object} data
 */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
};