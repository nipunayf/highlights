import React, { useState } from 'react';
import styles from './Calendar.module.css';

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [view, setView] = useState('month');

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null); // Reset selected date when changing months
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null); // Reset selected date when changing months
  };

  const renderDays = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);
    const emptyCells = Array.from({ length: firstDay }, (_, i) => <div key={`empty-${i}`} className={styles.empty}></div>);

    return [
      ...emptyCells,
      ...days.map(day => (
        <div
          key={day}
          className={`${styles.day} ${selectedDate === day ? styles.selectedDay : ''}`}
          onClick={() => handleDateClick(day)}
        >
          <span>{day}</span>
          {day === 30 && (
            <div className={styles.event}>
              <div className={styles.eventBar}></div>
              <div className={styles.eventBar}></div>
              <div className={styles.eventLabel}>Play Cricket</div>
            </div>
          )}
        </div>
      )),
    ];
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className={styles.calendarContainer}>
      <h2 className={styles.title}>Calendar view</h2>
      <div className={styles.header}>
        <div className={styles.viewToggle}>
          <button onClick={handlePreviousMonth}>&lt;</button>
          <span>{`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`}</span>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>Month</button>
          <div className={styles.dropdownContent}>
            <a onClick={() => handleViewChange('month')}>Month</a>
            <a onClick={() => handleViewChange('year')}>Year</a>
          </div>
        </div>
      </div>
      <div className={styles.calendar}>
        <div className={styles.month}>
          <div className={styles.daysOfWeek}>
            <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
          </div>
          <div className={styles.days}>
            {renderDays()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
