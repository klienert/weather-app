import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";

const Weather = ({ data, isLoading }) => {

    const getDate = (input) => {
        if (typeof input !== 'string') {
            throw new Error('Invalid input type');
        }

        const [year, month, day] = input.split('-').map(Number);
        const date = new Date(year, month - 1, day);

        const options = {
            weekday: 'long',
            month: 'short', 
            day: 'numeric', 
            year: 'numeric',
            timeZone: 'America/Chicago'
        };
        let result = new Intl.DateTimeFormat('en-US', options).format(date);
        return result;
    }

    return (<>
        {isLoading ? <div>Weather Data loading...</div>
        :
        <div className="weather-row">
            <div className="weather-current">
                <div className="weather-current-loc">
                    <p className="curr-location-name">{data?.location.name}</p>
                    <p>{data?.location.region}</p>
                </div>
                <div className="weather-current-temp">
                    <img src={data?.current.condition.icon} alt={data?.current.condition.text}  />
                    <span className="curr-location-tempf">{data?.current.temp_f}</span>
                    <span className="curr-location-tempUnit">&#8457;</span>
                </div>
                <div className="weather-current-feel">
                    <p className="curr-feel">RealFeel {data?.current.feelslike_f} &#8457;</p>
                </div>
            </div>
            <div className="weather-forecast">
                {data?.forecast?.forecastday?.map((f, idx) => (
                    <div key={idx} className={`weather-forecast day-${idx+1}`}>
                        <div className="weather-forecast-date">
                            <p className="weather-forecast-date">{getDate(f.date)}</p>
                        </div>
                        <div className="weather-forecast-temp">
                            <img src={f.day.condition.icon} alt={f.day.condition.text} />
                            <p>Precipiation: <span className="weather-forecast-precip">{f.day.daily_chance_of_rain}</span>&#37;</p>
                        </div>
                        <div className="weather-forecast-feel">
                            <p className="weather-forecast-hi-tempf">
                                <FaLongArrowAltUp />{f.day.maxtemp_f}<span className="weather-forecase-temp-unit">&#8457;</span>
                            </p>
                            <p className="weather-forecast-lo-tempf">
                                <FaLongArrowAltDown />{f.day.mintemp_f}<span className="weather-forecase-temp-unit">&#8457;</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        }
    </>)
}

export default Weather;