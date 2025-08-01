const express = require('express');
const axios = require('axios');
const router = express.Router();

// ✅ Weather by city name
router.post('/', async (req, res) => {
  const location = req.body.location;
  console.log("Received weather request for:", location);

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY; // Put in .env
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    const response = await axios.get(url);

    const data = response.data;
    const weatherInfo = {
      location: data.name,
      temperature: `${data.main.temp}°C`,
      description: data.weather[0].description,
      humidity: `${data.main.humidity}%`,
      windSpeed: `${data.wind.speed} m/s`
    };

    res.json(weatherInfo);

  } catch (error) {
    console.error("Weather API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// ✅ Weather by coordinates
router.post('/coords', async (req, res) => {
  const { latitude, longitude } = req.body;
  console.log("Received weather request for coordinates:", latitude, longitude);

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    
    // First, get the city name using reverse geocoding
    const reverseGeocodeUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
    const reverseResponse = await axios.get(reverseGeocodeUrl);
    
    let cityName = "Unknown Location";
    if (reverseResponse.data && reverseResponse.data.length > 0) {
      const locationData = reverseResponse.data[0];
      cityName = locationData.name || locationData.local_names?.en || locationData.local_names?.ur || "Unknown Location";
      console.log("Reverse geocoded city:", cityName);
    }

    // Then get weather data using coordinates for more accuracy
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    const weatherResponse = await axios.get(weatherUrl);

    const data = weatherResponse.data;
    const weatherInfo = {
      location: cityName,
      temperature: `${data.main.temp}°C`,
      description: data.weather[0].description,
      humidity: `${data.main.humidity}%`,
      windSpeed: `${data.wind.speed} m/s`
    };

    console.log("Weather info for", cityName, ":", weatherInfo);
    res.json(weatherInfo);

  } catch (error) {
    console.error("Weather API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

module.exports = router;
