import React from 'react';
import { Calendar } from '@mantine/dates';
import '@mantine/dates/styles.css';
import styles from './Calendar.module.css';

const MyCalendar = () => {
  const getDayProps = (date: Date) => {
    const day = date.getDate();
    if (day === 30) {
      return {
        className: styles.customDay,
        children: (
          <div className={styles.customDayContent}>
            <span className={styles.event}>Meeting</span>
            <span className={styles.event}>Workout</span>
            <span className={styles.event}>Play Cricket</span>
          </div>
        ),
      };
    }
    return {};
  };

  return (
    <div className={styles.calendarContainer}>
      <Calendar getDayProps={getDayProps} />
    </div>
  );
};

export default MyCalendar;
