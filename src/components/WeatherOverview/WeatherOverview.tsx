import { formatDate } from 'utils';
import styles from './WeatherOverview.module.css';
import { useEffect, useState } from 'react';
import { fetchCurrentWeatherData } from 'services/useApi';

export const WeatherOverview = ({ userLocation }: { userLocation: any }) => {
  const [data, setData] = useState<any>({});
  useEffect(() => {
    if (!userLocation) {
      return;
    }
    (async function() {
      const { currentWeatherData, isLoading, isError } = await fetchCurrentWeatherData(userLocation);
      if (currentWeatherData) {
        const weatherInfo = currentWeatherData?.data
        const { temp, weather, ob_time, app_temp, city_name, country_code } = weatherInfo !== undefined && currentWeatherData?.data[0]
        const weatherIconUrl = `https://www.weatherbit.io/static/img/icons/${weather?.icon}.png`;
        let localDate = ''
        if (ob_time !== undefined) {
          const [datePart] = ob_time !== undefined && ob_time?.split(' ')
          localDate = datePart
        }

        setData({
          temp,
          weather,
          ob_time,
          app_temp,
          city_name,
          country_code,
          iconUrl: weatherIconUrl,
          localDate,
          isLoading,
          isError,
        })
      }
    })();

  }, [])

  const {
    temp,
    weather,
    app_temp,
    city_name,
    country_code,
    iconUrl,
    localDate,
    isLoading,
    isError,
  } = data;

  if (!localDate) {
    return null
  }

  return (
    <div>
      {isLoading && <h1 className={styles.loadingMessage}>Loading...</h1>}
      {isError && <h1 className={styles.errorMessage}>Error occurred: {isError}</h1>}

      {!isLoading && !isError && (
        <div className={styles.weatherOverview}>
          <div className={styles.weatherDetails}>
            <div className={styles.weatherInfo}>
              <img
                src={iconUrl}
                alt="current weather icon"
                className={styles.weatherIcon}
              />
              <div className={styles.temperatureInfo}>
                <h2
                  className={`${styles.temperature} ${temp > 0 ? styles.hot : styles.cold
                    }`}
                >
                  {temp}
                </h2>
                <span
                  className={`${styles.temperatureUnit} ${temp > 0 ? styles.hot : styles.cold
                    }`}
                >
                  °C
                </span>
              </div>
              <p className={styles.location}>
                in {city_name}, {country_code}
              </p>
            </div>
          </div>
          <div className={styles.feelsLikeInfo}>
            <h2 className={styles.feelsLikeLabel}>Feels like</h2>
            <div className={styles.feelsLikeTemp}>
              <h2
                className={`${styles.feelsLikeValue} ${app_temp > 0 ? styles.hot : styles.cold
                  }`}
              >
                {app_temp}
              </h2>
              <span
                className={`${styles.feelsLikeUnit} ${app_temp > 0 ? styles.hot : styles.cold
                  }`}
              >
                °C
              </span>
            </div>
          </div>
          <p className={styles.weatherDescription}>{weather?.description}</p>
          <h2 className={styles.localDate}>{formatDate(localDate)}</h2>
        </div>
      )}
    </div>
  );
};
