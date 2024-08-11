import React, { useEffect, useState } from "react";
import styles from "./FocusSummary.module.css";
import { getFocusRecord, getPauseDetails } from "@/services/api";
import { mTimeRecord, mPauseContinueDetails } from "@/models/Timer";

interface FocusSummaryProps {
  activeTab: 'Pomo' | 'Stopwatch';
}

const FocusSummary: React.FC<FocusSummaryProps> = ({ activeTab }) => {
  const [focusRecords, setFocusRecords] = useState<mTimeRecord[]>([]);
  const [pauseDetails, setPauseDetails] = useState<mPauseContinueDetails[]>([]);
  const userId = 11; // Replace with the actual user ID as needed

  useEffect(() => {
    const fetchFocusData = async () => {
      try {
        const [records, pauses] = await Promise.all([
          getFocusRecord(userId, activeTab),
          getPauseDetails(userId, activeTab)
        ]);

        setFocusRecords(records);
        setPauseDetails(pauses);
      } catch (error) {
        console.error("Error fetching focus records or pause details:", error);
      }
    };

    if (activeTab === 'Pomo') {
      fetchFocusData();
    }
  }, [userId, activeTab]);

  const groupByDate = (records: mTimeRecord[]) => {
    return records.reduce((acc, record) => {
      const date = new Date(record.start_time).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(record);
      return acc;
    }, {} as Record<string, mTimeRecord[]>);
  };

  const formatTime = (datetime: string) => {
    return new Date(datetime).toLocaleTimeString();
  };

  const getPauseAndContinueTimes = (pomoId: number) => {
    return pauseDetails
      .filter((detail) => detail.pomo_id === pomoId)
      .map((detail) => [
        formatTime(detail.pause_time ?? ''), 
        formatTime(detail.continue_time ?? '')
      ]);
  };

  const groupedRecords = groupByDate(focusRecords);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Overview</h2>
      <div className={styles.overview}>
        <div className={styles.card}>
          <div className={styles.label}>Today&apos;s Pomo</div>
          <div className={styles.value}>0</div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>Today&apos;s Focus</div>
          <div className={styles.value}>0m</div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>Total Pomo</div>
          <div className={styles.value}>11</div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>Total Focus Duration</div>
          <div className={styles.value}>10h 13m</div>
        </div>
      </div>

      <h2 className={styles.title}>Focus Record</h2>
       {activeTab === 'Pomo' && ( 
        <div className={styles.focusRecord}>
          {Object.keys(groupedRecords).map((date) => (
            <div key={date} className={styles.dateGroup}>
              <div className={styles.date}>{date}</div>
              <div className={styles.timeline}>
                {groupedRecords[date]
                  .sort((a, b) => new Date(b.end_time).getTime() - new Date(a.end_time).getTime())
                  .map((record) => (
                    <div key={record.pomo_id} className={styles.timeRecord}>
                      <span className={styles.mainRecord}>
                        {record.highlight_name} : {formatTime(record.start_time)} - {formatTime(record.end_time)}
                      </span>
                      {getPauseAndContinueTimes(record.pomo_id).map((time, index) => (
                        <div key={index} className={styles.pauseRecord}>
                          <span>{time[0]} - {time[1]}</span>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )} 
    </div>
  );
};

export default FocusSummary;
