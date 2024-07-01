import { Anchor, AppShell, Burger, Group, NavLink, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function PageLayout({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure();

    return (<AppShell
        header={{ height: 60 }}
        navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: { mobile: !opened },
        }}
        padding="md"
    >
        <AppShell.Header>
            <Group h="100%" px="md">
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
                <Anchor href="/" style={{ textDecoration: "none" }}>
                    <Text fw={600} c={'dark'}>Highlights</Text>
                </Anchor>
            </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
            <AppShell.Section>Navbar header
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
                    href="/profile"
                    label="My Profile"
                />
                 <NavLink
                    href="/dailytips"
                    label="Daily Tips"
                />
            </AppShell.Section>
        </AppShell.Navbar>

        <AppShell.Main>
            {children}
        </AppShell.Main>
    </AppShell>
    );
}