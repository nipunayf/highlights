import React from 'react';
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Dailytipscard/Card"; // Assuming this is where your Card component is defined
import { Title } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./daily_tips.module.css"; // Update import to use CSS modules

export default function Calendar() {
    return (
        <PageLayout>
 <Title order={1} className={classes.title}>Daily Tips</Title> <div className={classes.cardContainer}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </PageLayout>
    );
}

// Define getLayout function to wrap Calendar component with PageLayout
Calendar.getLayout = function getLayout(page: ReactNode) {
    return (
        <PageLayout>
            {page}
        </PageLayout>
    );
}
