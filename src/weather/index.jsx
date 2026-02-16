import React, { useEffect, useState } from "react";
import Weather from "./weather";
import { ENV } from '../config/env';
import '../assets/weather.css';

const WeatherApp = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [zipcode, setZipcode] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const validateZipcode = (zip) => {
        // use zipcodes 
        const zipRegex = /^\d{5}(-\d{4})?$/;
        return zipRegex.test(zip);
    }

    const fetchWeather = async (zip) => {
        if (!validateZipcode(zip)) {
            setError('Please enter a valid US zipcode');
            return;
        }
        setError('');

        try {        
            const baseUrl = 'https://api.weatherapi.com/v1/forecast.json';
            const params = new URLSearchParams({
                key: ENV.projects.weather.apiKey,
                q: zip,
                days: 5,
                api: 'no',
                alerts: 'no'
            });

            const resp = await fetch(`${baseUrl}?${params.toString()}`);
            const result = await resp.json();
            if (result.error) {
                setError(result.error.message || 'Unable to find weather data for this Zipcode');
                setData(null);
            } else {
                setData(result);
                setZipcode(zip);
            }
        } catch (err) {
            console.error('Error fetching API Data: ', err);
            setError('Failed to fetch weather data. Please try again.');
            setData(null);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeather(inputValue);
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^[\d-]*$/.test(value)) {
            setInputValue(value);
            setError('');
        }
    }

    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                if (data.postal) {
                    // console.log('ipapi: ', data.postal);
                    setZipcode(data.postal);
                    fetchWeather(data.postal);                    
                }
            })
            .catch(() => {
                console.warn('IP lookup failed')
            })
            .finally(() => {
                setZipcode(null);
            })
    },[]);

    useEffect(() => {
        fetchWeather(zipcode);
    },[zipcode]);

    return (<>
        <form onSubmit={handleSearch} className="weather-search">
            <div className="search-container">
                <input 
                    type="text" 
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter Zipcode"
                    className="zipcode-input" 
                />
                <button 
                    type='submit'
                    className="search-button"
                >
                    Search
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
        </form>
        <Weather data={data} isLoading={isLoading} />
    </>
    )

}

export default WeatherApp;