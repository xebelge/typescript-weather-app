import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';

const WeatherService = {
    getWeather: async (city: string) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getForecast: async (latitude: number, longitude: number) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default WeatherService;