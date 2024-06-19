import PageLayout from "@/components/PageLayout";
import { Title } from "@mantine/core";
import { ReactNode } from "react";

export default function Calendar() {
    return (
        <>
            <Title order={1}>Calendar</Title>
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