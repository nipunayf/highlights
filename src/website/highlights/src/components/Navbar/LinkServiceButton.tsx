import { Box, Group, UnstyledButton, Image, Text } from "@mantine/core";
import classes from "./Navbar.module.css";

let MicrosoftToDoButton = () => {
    return (
        <Box className={classes.section}>
            <Group className={classes.collectionsHeader} justify="space-between">
                <Text size="sm" fw={500} c="dimmed">
                    Microsoft To Do
                </Text>
            </Group>
            <Box className={classes.collections}>
                <UnstyledButton w={'100%'} className={classes.collectionLink}>
                    <Box className={classes.mainLinkInner}>
                        <Image
                            className={classes.mainLinkIcon}
                            radius="md"
                            h={18}
                            src="/microsoft-to-do-logo.png"
                        />
                        <span>Link Microsoft To Do</span>
                    </Box>
                </UnstyledButton>
            </Box>
        </Box>
    );
}

let GoogleTasksButton = () => {
    return (
        <Box className={classes.section}>
            <Group className={classes.collectionsHeader} justify="space-between">
                <Text size="sm" fw={500} c="dimmed">
                    Google Tasks
                </Text>
            </Group>
            <Box className={classes.collections}>
                <UnstyledButton w={'100%'} className={classes.collectionLink}>
                    <Box className={classes.mainLinkInner}>
                        <Image
                            className={classes.mainLinkIcon}
                            radius="md"
                            h={24}
                            src="/google-tasks-logo.png"
                        />
                        <span>Link Google Tasks</span>
                    </Box>
                </UnstyledButton>
            </Box>
        </Box>
    );
}

export interface LinkServiceButtonProps {
    service: 'Microsoft' | 'Google';
}

export default function LinkServiceButton({ service }: LinkServiceButtonProps) {
    if (service === 'Microsoft') {
        return <MicrosoftToDoButton />;
    } else {
        return <GoogleTasksButton />;
    }
}