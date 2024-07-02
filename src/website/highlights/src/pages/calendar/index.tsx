import PageLayout from "@/components/PageLayout";
import { Title } from "@mantine/core";
import { ReactNode } from "react";
import DaySchedule from "@/components/DaySchedule/DaySchedule";


export default function Calendar() {
    return (
        <>
            <Title order={1}>Calendar</Title>
            <DaySchedule />
        </>
    )
}

Calendar.getLayout = function getLayout(page: ReactNode) {
    return (
        <PageLayout>
            {page}
        </PageLayout>
    );
}