import PageLayout from "@/components/PageLayout";
import { Box, Flex, ScrollArea, Title } from "@mantine/core";
import { ReactNode } from "react";
import TaskForm from "@/features/tasks/TaskForm";
import TaskList from "@/features/tasks/TaskList";
import classes from './Tasks.module.css';

export default function Tasks() {
    return (
        <Flex className={classes.tasks} direction={"column"}>
            <Title order={1}>Tasks</Title>
            <ScrollArea>
                <TaskList />
            </ScrollArea>
            <Box mt={'auto'} mb={0}>
                <TaskForm />
            </Box>
        </Flex>
    )
}

Tasks.getLayout = function getLayout(page: ReactNode) {
    return (
        <PageLayout>
            {page}
        </PageLayout>
    );
}