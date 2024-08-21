import PageLayout from '@/components/PageLayout/PageLayout';
import { Box, Center, Flex, ScrollArea, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router'
import { ReactNode } from 'react';
import classes from './Tasks.module.css';
import { useAppSelector } from '@/hooks';
import { selectTaskListById } from '@/features/taskLists/taskListsSlice';
import { TaskForm, TaskList } from '@/features/tasks/components';

export default function Page() {
    const router = useRouter();
    const { slug } = router.query;

    const taskListId = slug as string;
    const taskList = useAppSelector((state) => selectTaskListById(state, taskListId));

    if (!taskList) {
        return (
            <Box p={'lg'}>
                <Flex className={classes.tasks} direction={"column"}>
                    <Center mt={'auto'} mb={'auto'}>
                        <Text>Collection Not Found</Text>
                    </Center>
                </Flex>
            </Box>
        )
    }

    return (
        <Box p={'xl'}>
            <Flex className={classes.tasks} direction={"column"}>
                <Title mt={'sm'} mb={"sm"} px={"xl"} order={1}>{taskList.title}</Title>
                <ScrollArea my={'md'}>
                    <Box mx={'auto'} maw={'70%'}>
                        <TaskList taskListId={taskListId} />
                    </Box>
                </ScrollArea>
                <Box px={"xl"} mt={'auto'} mb={0}>
                    <TaskForm taskListId={taskListId} />
                </Box>
            </Flex>
        </Box>
    )
}

Page.getLayout = function getLayout(page: ReactNode) {
    return (
        <PageLayout>
            {page}
        </PageLayout>
    );
}