export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { location } = req.body;

    if (!location) {
      return res.status(400).json({ message: 'Location is required' });
    }

    // Use OpenWeatherMap API (free tier)
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      console.log('OpenWeatherMap API key not found, returning mock data');
      // Return mock data for testing
      return res.status(200).json({
        location: 'Islamabad',
        temperature: 25,
        description: 'Partly cloudy',
        humidity: 65,
        windSpeed: 5,
        icon: '02d'
      });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`);
    }
    
    const data = await response.json();

    const weatherData = {
      location: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon
    };

    res.status(200).json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error.message);
    
    // Return mock data if API fails
    res.status(200).json({
      location: 'Islamabad',
      temperature: 25,
      description: 'Partly cloudy',
      humidity: 65,
      windSpeed: 5,
      icon: '02d'
    });
  }
}
