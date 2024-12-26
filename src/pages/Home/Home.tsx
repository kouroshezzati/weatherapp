import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Location } from 'types';
import { WeeklyForecast } from 'components/WeeklyForecast/WeeklyForecast';
import { WeatherOverview } from '../../components/WeatherOverview/WeatherOverview';
import { ActionButtons } from '../../components/ActionButtons/ActionButtons';
import Button from 'components/UI/Button/Button';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  const [displayWeeklyForecast, setDisplayWeeklyForecast] = useState(false);
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  const handleShowSevenDaysForecastButtonClick = () => {
    setDisplayWeeklyForecast(!displayWeeklyForecast);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Current Weather Conditions</h1>
      </div>
      {userLocation ? (
        <>
          <ActionButtons toggleWeeklyForecast={handleShowSevenDaysForecastButtonClick} />
          <WeatherOverview userLocation={userLocation} />
          {displayWeeklyForecast ? <WeeklyForecast userLocation={userLocation} /> : null}
        </>
      ) : null}
      {!userLocation ? (
        <Button
          onClick={() => {
            navigator.geolocation.getCurrentPosition(
              ({ coords }) => {
                setUserLocation({ coords });
              },
              (error) => {
                console.error(error);
              }
            );
          }}
        >
          Get my geolocation
        </Button>
      ) : null}
    </div>
  );
};
