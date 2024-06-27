import { Anchor, Box, Burger, Group, Text } from "@mantine/core";
import ColorSchemeToggle from "../ColorSchemeToggle/ColorSchemeToggle";
import UserMenu from "../UserMenu/UserMenu";
import classes from './Header.module.css';

export default function Header({ opened, toggle }: { opened: boolean; toggle: () => void; }) {
    return (
        <Group h="100%" px="xl">
            <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
            />
            <Anchor href="/" style={{ textDecoration: "none" }}>
                <Text fw={600} c={'dark'}>Highlights</Text>
            </Anchor>
            <Box ml="auto"></Box>
            <ColorSchemeToggle className={classes.item} />
            <UserMenu className={classes.item} />
        </Group>
    );
}