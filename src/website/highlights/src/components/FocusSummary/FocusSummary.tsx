import React, { useEffect, useState } from "react";
import styles from "./FocusSummary.module.css";
import { getFocusRecord } from "@/services/api";
import { mTimeRecord } from "@/models/Timer";

const FocusSummary = () => {
  const [focusRecords, setFocusRecords] = useState<mTimeRecord[]>([]);
  const userId = 11; // Replace with the actual user ID as needed

  useEffect(() => {
    const fetchFocusRecords = async () => {
      try {
        const records = await getFocusRecord(userId);
        console.log("Fetched focus records:", records); // Log the fetched data
        setFocusRecords(records);
      } catch (error) {
        console.error("Error fetching focus records:", error);
      }
    };

    fetchFocusRecords();
  }, [userId]);

  // const calculateDuration = (start, end) => {
  //   const startTime = new Date(start);
  //   const endTime = new Date(end);
  //   const diffMs = endTime - startTime;
  //   const diffMins = Math.floor(diffMs / 60000);
  //   return `${Math.floor(diffMins / 60)}h ${diffMins % 60}m`;
  // };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Overview</h2>
      <div className={styles.overview}>
        <div className={styles.card}>
          <div className={styles.label}>Today's Pomo</div>
          <div className={styles.value}>0</div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>Today's Focus</div>
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
      <div className={styles.focusRecord}>
        {focusRecords.map((record) => (
          <div key={record.highlight_id} className={styles.record}>
            <div className={styles.date}>
              {new Date(record.start_time).toLocaleDateString()}
            </div>
            <div className={styles.timeRecord}>
            Highlight ID: {record.highlight_id}
              <span>
                {record.start_time.split(" ")[1]} - {record.end_time.split(" ")[1]}
              </span>
              {/* <span>{calculateDuration(record.start_time, record.end_time)}</span> */}
            </div>
            <div className={styles.highlightId}>Highlight ID: {record.highlight_id}</div>
            {record.pause_and_continue_times.map((time, index) => (
              <div key={index} className={styles.timeRecord}>
                <span>{time[0]} - {time[1]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FocusSummary;
