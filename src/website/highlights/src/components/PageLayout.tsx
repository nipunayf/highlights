import { Anchor, AppShell, Box, Burger, Divider, Group, NavLink, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from './Header/Header';

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
                <Header opened={opened} toggle={toggle} />
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