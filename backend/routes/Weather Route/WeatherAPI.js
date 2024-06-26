// Import necessary libraries
import express from 'express';
import axios from 'axios';

const router = express.Router();

// Your Tomorrow.io API key - ensure this is kept secure and not exposed to the client
const apiKey = '76a2b7c90e2e2304d1ff1ac5c00c4cef';

router.get('/', async (req, res) => {
    const lat = '7.851732';
    const lon = '80.098774'; // Assuming latitude and longitude are provided by the client
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Error fetching weather data');
    }
});

export default router;
