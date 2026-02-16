// helper to get environment variables with validation
const getEnvVar = (key, defaultValue = "") => {
    const value = import.meta.env[key];

    if (!value && !defaultValue) {
        console.warn(`Environment variable ${key} is not set.`);
    }
    return value || defaultValue;
}

export const ENV = {
    // MODE
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
    mode: import.meta.env.MODE,

    // general API Keys
    

    // Project Specific Keys
    projects: {
        weather: {
            apiKey: getEnvVar('VITE_WEATHER_API_KEY')
        }
    }
}