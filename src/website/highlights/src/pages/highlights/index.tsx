import React, { ReactNode, useState } from "react";
import { Card, Group, Text, Button } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare as faRegularSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare as faSolidSquare } from "@fortawesome/free-solid-svg-icons";
import Confetti from "react-confetti";
import PageLayout from "@/components/PageLayout";
import AddtaskPopup from "@/components/AddTask/AddtaskPopup";
import OptionsMenu from "@/components/Optionmenu/OptionPopup";
import AlertDialogSlide from "@/components/Feedback/AlertDialogSlide";
import UpdateTaskPopup from "@/components/UpdateTask/UpdateTaskPopup";
import classes from "./ActionsGrid.module.css";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/models/Task";
import { deleteTask } from "@/services/api";
import { IconPlayerPlay, IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

function ActionsGrid() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [updatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<{ id: number; title: string } | null>(null);
  const [completedTask, setCompletedTask] = useState<{ id: number; title: string } | null>(null);
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);

  const handleCardClick = () => setPopupOpen(true);
  const handleClosePopup = () => setPopupOpen(false);
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

  const { tasks, isLoading, isError } = useTasks();
  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading tasks.</div>;

  // Group tasks by status and label
  const groupByStatusAndLabel = (status: string) => {
    const tasksByLabel: { [label: string]: Task[] } = {};
    tasks?.forEach(task => {
      if (task.status === status) {
        if (!tasksByLabel[task.label]) {
          tasksByLabel[task.label] = [];
        }
        tasksByLabel[task.label].push(task);
      }
    });
    return tasksByLabel;
  };

  const overdueTasksByLabel = groupByStatusAndLabel("overdue");
  const pendingTasksByLabel = groupByStatusAndLabel("pending");
  const completedTasksByLabel = groupByStatusAndLabel("completed");

  console.log(pendingTasksByLabel)

  return (
    <>
      <div className={classes.highlight_card}>
        <div className={classes.list_taskm}>
          <Card withBorder radius="10px" className={classes.card} onClick={handleCardClick}>
            <Group>
              <img src="/add.svg" alt="Add Task Icon" className={classes.icon} />
              <Text className={classes.title}>Add Highlights</Text>
            </Group>
          </Card>
          <br />

          {/* Overdue Tasks Section */}
          <div className={classes.overduetitle}>
            <b>Over Due</b>
          </div>
          <div className={classes.overdue}>
  {Object.entries(overdueTasksByLabel).map(([label, tasks]) => (
    <div key={label} className={classes.labelSection}>
      <div className={classes.labelname}>
        <b>{label}</b>
      </div>
      <div className={classes.button}>
        <Button style={{ marginRight: "20px" }} rightSection={<IconPlayerPlay size={16} />}>
          Start Focus
        </Button>
        <Button variant="outline" rightSection={<IconPlus size={16} />}>
          Add Highlight
        </Button>
      </div>
      {tasks.map(task => (
        <div key={task.id} className={classes.overduetask}>
          <div className={classes.taskContainer}>
            <div className={classes.sqare}>
              <div
                className={`flagIcon ${completedTask && completedTask.id === task.id ? "completed" : ""}`}
                onClick={() => handleDialogOpen(task)}
              >
                <FontAwesomeIcon
                  icon={completedTask && completedTask.id === task.id ? faSolidSquare : faRegularSquare}
                />
              </div>
            </div>
            <div className={classes.taskname}>
              <b>{task.title}</b>
            </div>
            <div className={classes.menu}>
              <OptionsMenu
                onUpdateClick={() => handleUpdateClick(task)}
                onDelete={() => handleDelete(task.id)}
              />
            </div>
          </div>
        </div>
      ))}
      <br />
    </div>
  ))}
</div>

        </div>

        <div className={classes.separator}></div>

        {/* Pending Tasks Section */}
        <div className={classes.list_task}>
          <div className={classes.Pendingtitle}>
            <b>Pending</b>
          </div>
          <div className={classes.pendingBox}>
  {Object.entries(pendingTasksByLabel).map(([label, tasks]) => (
    <div key={label} className={classes.labelSection}>
      <div className={classes.labelname}>
        <b>{label}</b>
      </div>
      <div className={classes.button}>
        <Button style={{ marginRight: "20px" }} rightSection={<IconPlayerPlay size={16} />}>
          Start Focus
        </Button>
        <Button variant="outline" rightSection={<IconPlus size={16} />}>
          Add Highlight
        </Button>
      </div>
      {tasks.map(task => (
        <div key={task.id} className={classes.task}>
          <div className={classes.taskContainer}>
            <div className={classes.sqare}>
              <div
                className={`flagIcon ${completedTask && completedTask.id === task.id ? "completed" : ""}`}
                onClick={() => handleDialogOpen(task)}
              >
                <FontAwesomeIcon
                  icon={completedTask && completedTask.id === task.id ? faSolidSquare : faRegularSquare}
                />
              </div>
            </div>
            <div className={classes.taskname}>
              <b>{task.title}</b>
            </div>
            <div className={classes.menu}>
              <OptionsMenu
                onUpdateClick={() => handleUpdateClick(task)}
                onDelete={() => handleDelete(task.id)}
              />
            </div>
          </div>
        </div>
      ))}
      <br />
    </div>
  ))}
</div>


          {/* Completed Tasks Section */}
          <div className={classes.completetitle}>
            <b>Completed</b>
          </div>
          <div className={classes.completed}>
  {Object.entries(completedTasksByLabel).map(([label, tasks]) => (
    <div key={label} className={classes.labelSection}>
      <div className={classes.labelname}>
        <b>{label}</b>
      </div>
      <div className={classes.button}>
        <Button style={{ marginRight: "20px" }} rightSection={<IconPlayerPlay size={16} />}>
          Start Focus
        </Button>
        <Button variant="outline" rightSection={<IconPlus size={16} />}>
          Add Highlight
        </Button>
      </div>
      {tasks.map(task => (
        <div key={task.id} className={classes.completedtask}>
          <div className={classes.taskContainer}>
            <div className={classes.sqare}>
              <div
                className={`flagIcon ${completedTask && completedTask.id === task.id ? "completed" : ""}`}
                onClick={() => handleDialogOpen(task)}
              >
                <FontAwesomeIcon
                  icon={completedTask && completedTask.id === task.id ? faSolidSquare : faRegularSquare}
                />
              </div>
            </div>
            <div className={classes.taskname}>
              <b>{task.title}</b>
            </div>
            <div className={classes.menu}>
              <OptionsMenu
                onUpdateClick={() => handleUpdateClick(task)}
                onDelete={() => handleDelete(task.id)}
              />
            </div>
          </div>
        </div>
      ))}
      <br />
    </div>
  ))}
</div>

        </div>
      </div>

      <AddtaskPopup open={popupOpen} onClose={handleClosePopup} />
      {confettiActive && (
        <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />
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
            console.log("Updated Task:", updatedTask);
          }}
        />
      )}
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
