import PageLayout from "@/components/PageLayout";
import { Title } from "@mantine/core";
import { ReactNode } from "react";
import DaySchedule from "@/components/DaySchedule/DaySchedule";
import MyCalendar from "@/components/Calendar/Calendar";
import styles from "./index.module.css"; // Import CSS module styles

export default function Calendar() {
    return (
        <div className={styles.calendarContainer}>
            <div className={styles.leftPlane}>
                {/* <Title order={1}>Calendar</Title> */}
                <DaySchedule />
            </div>
            <div className={styles.middleBorder}></div> {/* Middle border element */}
            <div className={styles.rightPlane}>
                <MyCalendar />
            </div>
        </div>
    )
}

Calendar.getLayout = function getLayout(page: ReactNode) {
    return (
        <PageLayout>
            {page}
        </PageLayout>
    );
}
