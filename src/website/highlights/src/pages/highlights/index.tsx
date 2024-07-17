import React, { ReactNode, useState } from 'react';
import { Card, Group, Text, useMantineTheme } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare as faRegularSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare as faSolidSquare } from '@fortawesome/free-solid-svg-icons';
import Confetti from 'react-confetti';
import PageLayout from "@/components/PageLayout";
import AddtaskPopup from "@/components/AddTask/AddtaskPopup";
import OptionsMenu from "@/components/Optionmenu/OptionPopup";
import AlertDialogSlide from "@/components/Feedback/AlertDialogSlide";
import classes from "./ActionsGrid.module.css";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/models/Task";

function ActionsGrid() {
  const theme = useMantineTheme();
  const [popupOpen, setPopupOpen] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<{ id: number, title: string } | null>(null);
  const [completedTask, setCompletedTask] = useState<{ id: number, title: string } | null>(null);
  const handleCardClick = () => {
    setPopupOpen(true);
  };
  const handleClosePopup = () => {
    setPopupOpen(false);
  };
  const handleComplete = (task: { id: number, title: string }) => {
    console.log(task)
    setCompletedTask(task);
    setConfettiActive(true);
    setTimeout(() => {
      setCompletedTask(null);
      setConfettiActive(false);
    }, 3000);
  };
  const handleDialogOpen = (task: { id: number, title: string }) => {
    setCurrentTask(task);
    setDialogOpen(true);
  };

  const handleDialogClose = (agree: boolean) => {
    setDialogOpen(false);
    if (agree && currentTask) {
      handleComplete(currentTask);
    }
    setCurrentTask(null);
  };

  const { tasks, isLoading, isError } = useTasks();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading tasks.</div>;


  

  return (
    <>
     
      <div className={classes.highlight_card}>
        <Card withBorder radius="10px" className={classes.card} onClick={handleCardClick}>
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
        {tasks?.map((task: Task) => (
            <div key={task.id}>
              <div className={classes.d}>
                <div className={classes.task}>
                  <div
                 
                    className={`${classes.flag_icon} ${completedTask && completedTask.id === task.id  ? classes.completed : ''}`}
                    onClick={() => handleDialogOpen(task)
                      
                    }
                  >
                    <FontAwesomeIcon icon={completedTask && completedTask.id === task.id ? faSolidSquare : faRegularSquare} />
                  </div>
                  <div className={classes.task_name}>
                    <h3>{task.title}</h3>
                    <div className={classes.task_date}>
                      <p>{task.Date}</p>
                    </div>
                  </div>
                  
                </div>
                <div className={classes.bars_icon}>
                  <OptionsMenu onOpenPopup={handleCardClick} />
                </div>
              </div>
              {/* {task.subTasks.map((subTask) => (
                <div key={subTask.id} className={`${classes.d} ${classes.subTask}`}>
                  <div className={classes.task}>
                    <div
                      className={`${classes.flag_icon} ${completedTask && completedTask.id === subTask.id ? classes.completed : ''}`}
                      onClick={() => handleDialogOpen(subTask)}
                    >
                      <FontAwesomeIcon icon={completedTask && completedTask.id === subTask.id ? faSolidSquare : faRegularSquare} />
                    </div>
                    <div className={classes.task_name}>
                      <h3>{subTask.title}</h3>
                      <div className={classes.task_date}>
                        <p>{subTask.date}</p>
                      </div>
                    </div>
                  </div>
                  <div className={classes.bars_icon}>
                    <OptionsMenu onOpenPopup={handleCardClick} />
                  </div>
                </div>
              ))} */}
              <br />
            </div>
          ))}
        </div>
      </div>

      <AddtaskPopup open={popupOpen} onClose={handleClosePopup}/>

      {confettiActive && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}  
          recycle={false}
        />
      )}

      {completedTask && (
        <div className={classes.completedMessage}>
          <p>{`Completed: ${completedTask.title}`}</p>
        </div>
      )}

      <AlertDialogSlide open={dialogOpen} handleClose={handleDialogClose} />
    </>
  );
 
}

export default function Highlights() {
  return (
    <>
      <ActionsGrid />
    </>
  );
}

Highlights.getLayout = function getLayout(page: ReactNode) {
  return <PageLayout>{page}</PageLayout>;
};
