import React, { ReactNode, useState } from "react";
import {
  Card,
  Group,
  Text,
  useMantineTheme,
  Button,
  Switch,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare as faRegularSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare as faSolidSquare } from "@fortawesome/free-solid-svg-icons";
import Confetti from "react-confetti";
import PageLayout from "@/components/PageLayout";
import AddtaskPopup from "@/components/AddTask/AddtaskPopup";
import OptionsMenu from "@/components/Optionmenu/OptionPopup";
import AlertDialogSlide from "@/components/Feedback/AlertDialogSlide";
import UpdateTaskPopup from "@/components/UpdateTask/UpdateTaskPopup";
import AddSubtaskPopup from "@/components/AddTask/AddSubtaskPopup";
import classes from "./ActionsGrid.module.css";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/models/Task";
import { deleteTask } from "@/services/api";

import { IconPlayerPlay, IconPlus ,IconDotsVertical} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

function ActionsGrid() {
  const theme = useMantineTheme();
  const [popupOpen, setPopupOpen] = useState(false);
  const [updatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [subtaskPopupOpen, setSubtaskPopupOpen] = useState(false); // State for the AddSubtaskPopup
  const [confettiActive, setConfettiActive] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [completedTask, setCompletedTask] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);
  const [parentTaskId, setParentTaskId] = useState<number | null>(null); // State to store the parent task ID for the subtask

  const handleCardClick = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleComplete = (task: { id: number; title: string }) => {
    setCompletedTask(task);
    setConfettiActive(true);
    setTimeout(() => {
      setCompletedTask(null);
      setConfettiActive(false);
    }, 3000);
  };

  const handleDialogOpen = (task: { id: number; title: string }) => {
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

  const handleUpdateClick = (task: Task) => {
    setTaskToUpdate(task);
    setUpdatePopupOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdatePopupOpen(false);
    setTaskToUpdate(null);
  };

  const handleOpenSubtaskPopup = (taskId: number) => {
    setParentTaskId(taskId);
    setSubtaskPopupOpen(true);
  };

  const handleCloseSubtaskPopup = () => {
    setSubtaskPopupOpen(false);
    setParentTaskId(null);
  };

  const { tasks, isLoading, isError } = useTasks();

  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(taskId); // Use the deleteTask function from api.ts
      // Optionally, refresh tasks after deletion
      // mutate(); // Uncomment this line if you use SWR or other data-fetching libraries
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading tasks.</div>;

  return (
    <>
            

      <div className={classes.highlight_card}>
      <div className={classes.list_taskm}>
        <Card
          withBorder
          radius="10px"
          className={classes.card}
          onClick={handleCardClick}
        >
          <Group>
            <img src="/add.svg" alt="Add Task Icon" className={classes.icon} />
            <Text className={classes.title}>Add Highlights</Text>
          </Group>
          
        </Card>
        <br></br>

        <div className={classes.overduetitle}>
          <b>Over Due</b>
        </div>
        <div className={classes.overdue}>
        {tasks?.map((task: Task) => (
            <div key={task.id}>
             
                <div className={classes.overduetask}>
                 

                  <div className={classes.labelname}>
                    <b>{task.title}</b>
                  </div>
                  <div className={classes.button}>
                    <Button
                      style={{ marginRight: "20px" }}
                      rightSection={<IconPlayerPlay size={16} />}
                    >
                      Start Focus
                    </Button>
                    <Button
                      variant="outline"
                      rightSection={<IconPlus size={16} />}
                    >
                      Add Highlight
                    </Button>
                  </div>

                  <div className={classes.taskContainer}>
                   
                    <div className={classes.sqare}>
                    <div
                      className={`flagIcon ${
                        completedTask && completedTask.id === task.id
                          ? "completed"
                          : ""
                      }`}
                      onClick={() => handleDialogOpen(task)}
                    >
                      <FontAwesomeIcon
                        icon={
                          completedTask && completedTask.id === task.id
                            ? faSolidSquare
                            : faRegularSquare
                        }
                      />
                    </div>
                    </div>

                    <div className={classes.taskname}>
                      <b>{task.title}</b>
                      {/* <br></br> */}
                      
                    </div>
                    
                    

                    <div className={classes.menu}>
                      <OptionsMenu
                        onOpenPopup={() => handleOpenSubtaskPopup(task.id)}
                        onUpdateClick={() => handleUpdateClick(task)}
                        onDelete={() => handleDelete(task.id)}
                      />
                    </div>


                  </div>
                  
               
              </div>
              <br />
            </div>
          ))}
          
          
        </div>


        
</div>
        

        
        <div className={classes.separator}></div>
        
        
       

        <div className={classes.list_task}>

        <div className={classes.Pendingtitle}>
          <b>Pending</b>
        </div>
          {tasks?.map((task: Task) => (
            <div key={task.id}>
                 
                <div className={classes.task}>
                 

                  <div className={classes.labelname}>
                    <b>{task.title}</b>
                  </div>
                  <div className={classes.button}>
                    <Button
                      style={{ marginRight: "20px" }}
                      rightSection={<IconPlayerPlay size={16} />}
                    >
                      Start Focus
                    </Button>
                    <Button
                      variant="outline"
                      rightSection={<IconPlus size={16} />}
                    >
                      Add Highlight
                    </Button>
                  </div>

                  <div className={classes.taskContainer}>
                   
                    <div className={classes.sqare}>
                    <div
                      className={`flagIcon ${
                        completedTask && completedTask.id === task.id
                          ? "completed"
                          : ""
                      }`}
                      onClick={() => handleDialogOpen(task)}
                    >
                      <FontAwesomeIcon
                        icon={
                          completedTask && completedTask.id === task.id
                            ? faSolidSquare
                            : faRegularSquare
                        }
                      />
                    </div>
                    </div>

                    <div className={classes.taskname}>
                      <b>{task.title}</b>
                      {/* <br></br> */}
                      
                    </div>
                    
                    

                    <div className={classes.menu}>
                      <OptionsMenu
                        onOpenPopup={() => handleOpenSubtaskPopup(task.id)}
                        onUpdateClick={() => handleUpdateClick(task)}
                        onDelete={() => handleDelete(task.id)}
                      />
                    </div>


                  </div>
                  
               
              </div>
              <br />
            </div>
          ))}
            <div className={classes.completetitle}>
          <b>Completed</b>
        </div>
        <div className={classes.completed}>
        {tasks?.map((task: Task) => (
            <div key={task.id}>
             
                <div className={classes.completedtask}>
                 

                  <div className={classes.labelname}>
                    <b>{task.title}</b>
                  </div>
                  <div className={classes.button}>
                    <Button
                      style={{ marginRight: "20px" }}
                      rightSection={<IconPlayerPlay size={16} />}
                    >
                      Start Focus
                    </Button>
                    <Button
                      variant="outline"
                      rightSection={<IconPlus size={16} />}
                    >
                      Add Highlight
                    </Button>
                  </div>

                  <div className={classes.taskContainer}>
                   
                    <div className={classes.sqare}>
                    <div
                      className={`flagIcon ${
                        completedTask && completedTask.id === task.id
                          ? "completed"
                          : ""
                      }`}
                      onClick={() => handleDialogOpen(task)}
                    >
                      <FontAwesomeIcon
                        icon={
                          completedTask && completedTask.id === task.id
                            ? faSolidSquare
                            : faRegularSquare
                        }
                      />
                    </div>
                    </div>

                    <div className={classes.taskname}>
                      <b>{task.title}</b>
                      {/* <br></br> */}
                      
                    </div>
                    
                    

                    <div className={classes.menu}>
                      <OptionsMenu
                        onOpenPopup={() => handleOpenSubtaskPopup(task.id)}
                        onUpdateClick={() => handleUpdateClick(task)}
                        onDelete={() => handleDelete(task.id)}
                      />
                    </div>


                  </div>
                  
               
              </div>
              <br />
            </div>
          ))}
          
          
        </div>
        </div>

      
      </div>

      <AddtaskPopup open={popupOpen} onClose={handleClosePopup} />

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

      {taskToUpdate && (
        <UpdateTaskPopup
          open={updatePopupOpen}
          onClose={handleUpdateClose}
          task={taskToUpdate}
          onUpdate={(updatedTask) => {
            // Update task logic here
            console.log("Updated Task:", updatedTask);
          }}
        />
      )}

      <AddSubtaskPopup
        open={subtaskPopupOpen}
        onClose={handleCloseSubtaskPopup}
        parentTaskId={parentTaskId}
      />
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
