import PageLayout from "@/components/PageLayout";
import { Space, Title } from "@mantine/core";
import { ReactNode } from "react";
import TaskForm from "@/features/tasks/TaskForm";
import TaskList from "@/features/tasks/TaskList";

export default function Tasks() {
    return (
        <>
            <Title order={1}>Tasks</Title>
            <Space h="lg" />
            <TaskForm />
            <Space h="lg" />
            <TaskList />
        </>
    )
}

Tasks.getLayout = function getLayout(page: ReactNode) {
    return (
        <PageLayout>
            {page}
        </PageLayout>
    );
}