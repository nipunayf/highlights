import { Anchor, AppShell, Box, Burger, Divider, Group, NavLink, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ColorSchemeToggle from './ColorSchemeToggle/ColorSchemeToggle';

export default function PageLayout({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
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
                    <ColorSchemeToggle />
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <NavLink
                    href="/highlights"
                    label="Highlights"
                />
                <NavLink
                    href="/calendar"
                    label="Calendar"
                />
                <NavLink
                    href="/tasks"
                    label="Tasks"
                />
                <NavLink
                    href="/projects"
                    label="Projects"
                />
                <NavLink
                    href="/analytics"
                    label="Analytics"
                />
                <NavLink
                    href="/profile"
                    label="My Profile"
                />
                <AppShell.Section>
                    <Divider my="md" />
                    <Text pb="xs">Task lists</Text>
                    <NavLink
                        href="/tasks"
                        label="Important"
                    />
                    <NavLink
                        href="/tasks"
                        label="Work"
                    />
                </AppShell.Section>
            </AppShell.Navbar>

            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
}