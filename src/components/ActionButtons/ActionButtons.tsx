import Button from 'components/UI/Button/Button';
import styles from './ActionButtons.module.css';

export const ActionButtons = ({
  toggleWeeklyForecast,
}: {
  toggleWeeklyForecast: () => void;
}) => {
  return (
    <div className={styles.actionButtons}>
      <Button variant="primary" onClick={toggleWeeklyForecast}>Show the 7-day forecast</Button>
      <Button variant="secondary" onClick={() => { window.location.reload() }}>Refresh the weather</Button>
    </div>
  );
};
