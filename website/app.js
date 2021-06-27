/* url form
*  api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
*
*  units=metric ==> To get data in API for both current weather and forecast in Celsius
*  if country code is not specified then the search works for USA as a default.
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

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();
