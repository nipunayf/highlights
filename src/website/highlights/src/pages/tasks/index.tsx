import PageLayout from "@/components/PageLayout/PageLayout";
import { Box, Flex, ScrollArea, Title, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { ReactNode } from "react";
import classes from './Tasks.module.css';
import { useAppSelector } from "@/hooks";
import { selectDefaultTaskList } from "@/features/taskLists/taskListsSlice";
import Head from "next/head";
import { TaskForm, TaskList, } from "@/features/tasks";

export default function Tasks() {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const backgroundColor = colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.indigo[2];

    const list = useAppSelector(selectDefaultTaskList);

    return (
        <>
            <Head>
                <title>Tasks</title>
            </Head>
            <Box p={'xl'} style={{ backgroundColor: backgroundColor }}>
                <Flex className={classes.tasks} direction={"column"}>
                    <Title mt={'sm'} mb={"sm"} px={"xl"} order={1}>Tasks</Title>
                    <ScrollArea my={'md'}>
                        <Box mx={'auto'} maw={'80%'}>
                            <TaskList taskListId={list.id} />
                        </Box>
                    </ScrollArea>
                    <Box px={"xl"} mt={'auto'} mb={0}>
                        <TaskForm taskList={list} />
                    </Box>
                </Flex>
            </Box>
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