import PageLayout from "@/components/PageLayout";
import { Card, Text, Group, useMantineTheme } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./ActionsGrid.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

function ActionsGrid() {
  const theme = useMantineTheme();
  const tasks = [
    { id: 1, title: "Task 1", description: "Description for task 1" },
    { id: 2, title: "Task 2", description: "Description for task 2" },
    { id: 3, title: "Task 3", description: "Description for task 3" },
  ];

  return (
    <>
      <div className={classes.highlight_card}>
        <Card withBorder radius="10px" className={classes.card}>
          <Group>
            <img
              src="/add-plus-svgrepo-com (1).svg"
              alt="Add Task Icon"
              className={classes.icon}
            />
            <Text className={classes.title}>Add Highlights</Text>
          </Group>
        </Card>
        <div className={classes.separator}></div>

        <div className={classes.list_task}>
          {tasks.map((task) => (
            <div key={task.id}>
                <div className={classes.d}>
              <div className={classes.task}>
                <div className={classes.flag_icon}>
                  <FontAwesomeIcon icon={faFlag} />
                </div>
                <div className={classes.task_name}>
                  <h2>{task.title}</h2>
                </div>
                
              </div>
              <div className={classes.bars_icon}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
                </div>
              <br></br>
            </div>
          ))}
        </div>
      </div>
    </>
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
  return <PageLayout>{page}</PageLayout>;
};
