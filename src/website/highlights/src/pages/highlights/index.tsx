import PageLayout from "@/components/PageLayout";
import { Title, Card, Text, SimpleGrid, UnstyledButton, Anchor, Group, useMantineTheme } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./ActionsGrid.module.css";



function ActionsGrid() {
  const theme = useMantineTheme();

  
  return (
    <Card withBorder radius="10px"  className={classes.card}>
      <Group >
      <img
          src="/add-plus-svgrepo-com (1).svg"
          alt="Add Task Icon"
          className={classes.icon}
        />
        <Text className={classes.title}>Add Highlights</Text> 
        
       
        
        </Group>
      
    </Card>
  );
}

export default function Highlights() {
  return (
    <>
      {/* <Title order={1}>Highlights</Title> */}
      <ActionsGrid />
    </>
  );
}

Highlights.getLayout = function getLayout(page: ReactNode) {
  return (
    <PageLayout>
      {page}
    </PageLayout>
  );
}
