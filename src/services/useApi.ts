import { PROTOCOL, HOSTNAME, VERSION, API_KEY } from './global';
import { Location } from 'types';

const URL = `${PROTOCOL}://${HOSTNAME}/${VERSION}`;
const SEVEN_DAYS = 7;

export const fetchCurrentWeatherData = async (location: Location | null) => {
  if (!location) {
    return { currentWeatherData: null, isLoading: false, isError: 'No location provided' };
  }

  try {
    const response = await fetch(
      `${URL}/current?lat=${location.coords.latitude}&lon=${location.coords.longitude}&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return { currentWeatherData: data, isLoading: false, isError: null };
  } catch (error) {
    return { currentWeatherData: null, isLoading: false, isError: error.message };
  }
};

export const fetchSevenDaysForecastData = async (location: Location | null) => {
  if (!location) {
    return { data: null, isLoading: false, error: 'No location provided' };
  }

  try {
    const response = await fetch(
      `${URL}/forecast/daily?lat=${location.coords.latitude}&lon=${location.coords.longitude}&key=${API_KEY}&days=${SEVEN_DAYS}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return { data, isLoading: false, error: null };
  } catch (error) {
    return { data: null, isLoading: false, error: error.message };
  }
};
