import React from 'react';
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card"; // Assuming this is where your Card component is defined
import { Title } from "@mantine/core";
import { ReactNode } from "react";

export default function Calendar() {
    return (
        <PageLayout>
            
            <Card />
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
