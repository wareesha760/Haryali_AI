const express = require('express');
const axios = require('axios');
const router = express.Router();

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

module.exports = router;
