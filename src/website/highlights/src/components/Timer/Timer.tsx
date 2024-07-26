// import React, { useState, useEffect, forwardRef } from 'react';
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import { showNotification } from '@mantine/notifications';
// import { IconInfoCircle, IconChevronRight, IconCalendarDue, IconHourglassHigh } from '@tabler/icons-react';
// import { Group, Avatar, Text, Menu, UnstyledButton, TextInput, Tabs, Modal, Button } from '@mantine/core';
// import styles from './Timer.module.css';
// import { useHighlights } from "@/hooks/useHighlights";
// import { useTimers } from '@/hooks/useTimer';
// import { HighlightTask } from "@/models/HighlightTask";
// import { mTimer } from '@/models/Timer';
// import { sendTimerEndData } from "@/services/api";

// interface UserButtonProps {
//   image?: string;
//   label: string;
//   icon?: React.ReactNode;
//   styles?: {
//     label?: {
//       fontSize?: string;
//     };
//   };
//   onClick?: () => void;
// }

// const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
//   ({ image, label, icon, styles: userStyles, onClick, ...others }: UserButtonProps, ref) => {
//     return (
//       <UnstyledButton
//         ref={ref}
//         style={{
//           padding: 'var(--mantine-spacing-md)',
//           color: 'var(--mantine-color-text)',
//           borderRadius: 'var(--mantine-radius-sm)',
//         }}
//         onClick={onClick}
//         {...others}
//       >
//         <Group>
//           {image && <Avatar src={image} radius="xl" />}

//           <div style={{ flex: 1 }}>
//             <Text size="sm" fw={500} style={userStyles?.label}>
//               {label}
//             </Text>
//           </div>

//           {icon || <IconChevronRight size="1rem" />}
//         </Group>
//       </UnstyledButton>
//     );
//   }
// );

// const HighlightMenu = ({ highlights, onHighlightSelect, closeMenu }: { highlights: HighlightTask[], onHighlightSelect: (index: number) => void, closeMenu: () => void }) => {
//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredHighlights = highlights.filter((highlight) =>
//     highlight.highlight_name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleSelect = (index: number) => {
//     onHighlightSelect(index);
//     closeMenu();
//   };

//   return (
//     <Tabs.Panel value="Task">
//       <div className={styles.taskContainer}>
//         <TextInput
//           placeholder="Search"
//           className={styles.searchInput}
//           value={searchQuery}
//           onChange={(event) => setSearchQuery(event.currentTarget.value)}
//         />
//         <div className={styles.taskHeader}>
//           <Text className={styles.today}><IconCalendarDue /> Today &gt;</Text>
//         </div>
//         <Menu>
//           {filteredHighlights.map((highlight, index) => (
//             <Menu.Item key={highlight.id} onClick={() => handleSelect(index)}>
//               {highlight.highlight_name}
//             </Menu.Item>
//           ))}
//         </Menu>
//       </div>
//     </Tabs.Panel>
//   );
// };

// const TimerMenu = ({ timer_details }: { timer_details: mTimer[] }) => {
//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredTimers = timer_details.filter((timer) =>
//     timer.timer_name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <Tabs.Panel value="Timer">
//       <div className={styles.taskContainer}>
//         <TextInput
//           placeholder="Search"
//           className={styles.searchInput}
//           value={searchQuery}
//           onChange={(event) => setSearchQuery(event.currentTarget.value)}
//         />
//         <div className={styles.taskHeader}>
//           <Text className={styles.today}><IconHourglassHigh /></Text>
//         </div>
//         <Menu>
//           {filteredTimers.map((timer) => (
//             <Menu.Item key={timer.timer_id}>{timer.timer_name}</Menu.Item>
//           ))}
//         </Menu>
//       </div>
//     </Tabs.Panel>
//   );
// };

// const Timer = () => {
//   const WORK_TIME = 25; 
//   const SHORT_BREAK = 5; 
//   const LONG_BREAK = 15; 
//   const CYCLES_BEFORE_LONG_BREAK = 4; 

//   const [active, setActive] = useState('focus'); // 'focus' for work session, 'break' for break session
//   const [minCount, setMinCount] = useState(WORK_TIME); // Initial time is set to WORK_TIME
//   const [count, setCount] = useState(0); // Seconds count within the current minute
//   const [paused, setPaused] = useState(true); // Timer paused state
//   const [started, setStarted] = useState(false); // Timer started state
//   const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null); // Timer ID for setInterval
//   const [cycles, setCycles] = useState(0); // Number of completed work cycles
//   const [selectedTask, setSelectedTask] = useState<number | null>(null); // State to track selected task
//   const { highlights, isHighlightsLoading, isHighlightsError } = useHighlights();
//   const { timer_details, istimer_detailsLoading, istimer_detailsError } = useTimers();
//   const [menuOpened, setMenuOpened] = useState(false);
//   const [modalOpened, setModalOpened] = useState(false);// State for modal visibility

//   const formatTime = (minutes: number, seconds: number) => {
//     return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
//   };

//   const resetTime = () => {
//     if (timerId) clearInterval(timerId);
//     setMinCount(active === 'focus' ? WORK_TIME : (cycles % CYCLES_BEFORE_LONG_BREAK === 0 ? LONG_BREAK : SHORT_BREAK));
//     setCount(0);
//     setPaused(true);
//     setStarted(false);
//   };

//   const pauseTimer = () => {
//     setPaused(true);
//     if (timerId) clearInterval(timerId);
//   };

//   const startTimer = () => {
    
//     setStarted(true);
//     if (paused) {
//       setPaused(false);
//       setTimerId(
//         setInterval(() => {
//           setCount(prevCount => {
//             if (prevCount === 0) {
//               if (minCount === 0) {
//                 handleTimerEnd();
//                 return 0;
//               }
//               setMinCount(prevMinCount => prevMinCount - 1);
//               return 59;
//             }
//             return prevCount - 1;
//           });
//         }, 1000)
//       );
//     }
//   };

//   const handleTimerEnd = () => {
//     if (timerId) clearInterval(timerId);
//     if (active === 'focus') {
//       setCycles(prevCycles => prevCycles + 1);
//       setActive('break');
//       setMinCount((cycles + 1) % CYCLES_BEFORE_LONG_BREAK === 0 ? LONG_BREAK : SHORT_BREAK);
//     } else {
//       setActive('focus');
//       setMinCount(WORK_TIME);
//     }
//     setCount(0);
//     setPaused(true);
//     setStarted(false);

//     showNotification({
//       title: 'Timer Ended',
//       message: 'Time to switch!',
//       icon: <IconInfoCircle />,
//       color: 'teal',
//     });
//   };

//   const endTimer = () => {
//     if (timerId) clearInterval(timerId); // Ensure the timer is stopped
//     setModalOpened(true); // Open modal instead of directly sending data
//   };

//   const handleEndTimerConfirm = async (isTaskComplete: boolean) => {
//     setModalOpened(false);

//     if (isTaskComplete) {
//       // Ensure timerId is a number
//       const currentTimerId = selectedTask !== null && timer_details
//         ? Number(timer_details[selectedTask]?.timer_id) // Convert to number
//         : -1; // Default value or handle as needed
    
//       // Handle cases where highlightId might be undefined
//       const highlightId = selectedTask !== null && highlights
//         ? highlights[selectedTask]?.id || '4' // Provide a default value or handle as needed
//         : '2'; // Default to empty string if no task is selected
    
//         const start_time = new Date();
//         const end_time = new Date();

//       const userId = 11; // Replace with actual user ID if available
      
//       const pomoDetails = {
//         timer_id: currentTimerId,
//         highlight_id: selectedTask !== null ? selectedTask : -1, // Ensure selectedTask is a number
//         user_id: userId,
//         start_time: start_time.toISOString(), // Format as ISO 8601 string
//         end_time: end_time.toISOString(), // Format as ISO 8601 string
//         status: "complete"
        
//       }; 
//       console.log(pomoDetails) ;  

//       try {
//         await sendTimerEndData(pomoDetails);
//         showNotification({
//           title: 'Timer Ended',
//           message: 'The timer has been reset to the beginning and details have been sent.',
//           icon: <IconInfoCircle />,
//           color: 'blue',
//           autoClose: 3000,
//           radius: 'md',
//           styles: (theme) => ({
//             root: {
//               backgroundColor: theme.colors.blue[6],
//               borderColor: theme.colors.blue[6],
//               '&::before': { backgroundColor: theme.white },
//             },
//             title: { color: theme.white },
//             description: { color: theme.white },
//             closeButton: {
//               color: theme.white,
//               '&:hover': { backgroundColor: theme.colors.blue[7] },
//             },
//           }),
//         });
//       } catch (error) {
//         showNotification({
//           title: 'Error',
//           message: 'Failed to send timer details.',
//           icon: <IconInfoCircle />,
//           color: 'red',
//           autoClose: 3000,
//           radius: 'md',
//           styles: (theme) => ({
//             root: {
//               backgroundColor: theme.colors.red[6],
//               borderColor: theme.colors.red[6],
//               '&::before': { backgroundColor: theme.white },
//             },
//             title: { color: theme.white },
//             description: { color: theme.white },
//             closeButton: {
//               color: theme.white,
//               '&:hover': { backgroundColor: theme.colors.red[7] },
//             },
//           }),
//         });
//       }
//     }

//     // Reset the timer state
//     setActive('focus');
//     setMinCount(WORK_TIME);
//     setCount(0);
//     setPaused(true);
//     setStarted(false);
//   };

//   const totalSeconds = minCount * 60 + count;
//   const initialTotalSeconds = active === 'focus'
//     ? WORK_TIME * 60
//     : cycles % CYCLES_BEFORE_LONG_BREAK === 0
//     ? LONG_BREAK * 60
//     : SHORT_BREAK * 60;
//   const percentage = totalSeconds > 0
//     ? 100 - (totalSeconds / initialTotalSeconds) * 100
//     : 0;

//   useEffect(() => {
//     if (totalSeconds === 0 && started) {
//       handleTimerEnd();
//     }
//   }, [totalSeconds, started]);

//   const handleHighlightSelect = (index: number) => {
//     setSelectedTask(index);
//     setMenuOpened(false);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.pomodoro}>
//         <div className={styles.focusLink}>
//           <Menu withArrow opened={menuOpened} onChange={setMenuOpened}>
//             <Menu.Target>
//               <UserButton
//                 label={selectedTask !== null && highlights ? highlights[selectedTask]?.highlight_name : "Focus"}
//                 styles={{
//                   label: {
//                     fontSize: '14px',
//                   },
//                 }}
//                 onClick={() => setMenuOpened((prev) => !prev)}
//               />
//             </Menu.Target>
//             <Menu.Dropdown>
//               <Tabs variant="outline" defaultValue="Task">
//                 <Tabs.List>
//                   <Tabs.Tab value="Task">Task</Tabs.Tab>
//                   <Tabs.Tab value="Timer">Timer</Tabs.Tab>
//                 </Tabs.List>
//                 {highlights ? <HighlightMenu highlights={highlights} onHighlightSelect={handleHighlightSelect} closeMenu={() => setMenuOpened(false)} /> : null}
//                 {timer_details ? <TimerMenu timer_details={timer_details} /> : null}
//               </Tabs>
//             </Menu.Dropdown>
//           </Menu>
//         </div>
//         <div className={styles.progressBarContainer}>
//           <CircularProgressbar
//             value={percentage}
//             text={formatTime(minCount, count)}
//             styles={buildStyles({
//               pathColor: active === 'focus' ? `#007bff` : `#ff6347`, // Blue for focus, Red for break
//               textColor: '#000',
//               trailColor: '#d6d6d6',
//               textSize: '16px',
//             })}
//             className={styles.customTimeFont}
//           />
//         </div>
//         <div className={styles.buttons}>
//           {!started ? (
//             <button className={`${styles.controlButton} ${styles.startButton}`} onClick={startTimer}>
//               Start
//             </button>
//           ) : (
//             <>
//               {paused ? (
//                 <button className={`${styles.controlButton} ${styles.startButton}`} onClick={startTimer}>
//                   Continue
//                 </button>
//               ) : (
//                 <button className={`${styles.controlButton} ${styles.pauseButton}`} onClick={pauseTimer}>
//                   Pause
//                 </button>
//               )}
//               <button className={`${styles.controlButton} ${styles.endButton}`} onClick={endTimer}>
//                 End
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       <Modal
//         opened={modalOpened}
//         onClose={() => setModalOpened(false)}
//         title="Task Completion"
//       >
//         <Text>Is the task complete?</Text>
//         <Group align="center" justify="center" mt="md">
//           <Button color="green" onClick={() => handleEndTimerConfirm(true)}>Yes</Button>
//           <Button color="red" onClick={() => handleEndTimerConfirm(false)}>No</Button>
//         </Group>

//       </Modal>
//     </div>
//   );
// };

// export default Timer;





import React, { useState, useEffect, forwardRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { showNotification } from '@mantine/notifications';
import { IconInfoCircle, IconChevronRight, IconCalendarDue, IconHourglassHigh } from '@tabler/icons-react';
import { Group, Avatar, Text, Menu, UnstyledButton, TextInput, Tabs, Modal, Button } from '@mantine/core';
import styles from './Timer.module.css';
import { useHighlights } from "@/hooks/useHighlights";
import { useTimers } from '@/hooks/useTimer';
import { HighlightTask } from "@/models/HighlightTask";
import { mTimer } from '@/models/Timer';
import { sendTimerEndData } from "@/services/api";

interface UserButtonProps {
  image?: string;
  label: string;
  icon?: React.ReactNode;
  styles?: {
    label?: {
      fontSize?: string;
    };
  };
  onClick?: () => void;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, label, icon, styles: userStyles, onClick, ...others }: UserButtonProps, ref) => {
    return (
      <UnstyledButton
        ref={ref}
        style={{
          padding: 'var(--mantine-spacing-md)',
          color: 'var(--mantine-color-text)',
          borderRadius: 'var(--mantine-radius-sm)',
        }}
        onClick={onClick}
        {...others}
      >
        <Group>
          {image && <Avatar src={image} radius="xl" />}

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500} style={userStyles?.label}>
              {label}
            </Text>
          </div>

          {icon || <IconChevronRight size="1rem" />}
        </Group>
      </UnstyledButton>
    );
  }
);

const HighlightMenu = ({ highlights, onHighlightSelect, closeMenu }: { highlights: HighlightTask[], onHighlightSelect: (index: number) => void, closeMenu: () => void }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHighlights = highlights.filter((highlight) =>
    highlight.highlight_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (index: number) => {
    onHighlightSelect(index);
    closeMenu();
  };

  return (
    <Tabs.Panel value="Task">
      <div className={styles.taskContainer}>
        <TextInput
          placeholder="Search"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
        />
        <div className={styles.taskHeader}>
          <Text className={styles.today}><IconCalendarDue /> Today &gt;</Text>
        </div>
        <Menu>
          {filteredHighlights.map((highlight, index) => (
            <Menu.Item key={highlight.id} onClick={() => handleSelect(index)}>
              {highlight.highlight_name}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </Tabs.Panel>
  );
};

const TimerMenu = ({ timer_details }: { timer_details: mTimer[] }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTimers = timer_details.filter((timer) =>
    timer.timer_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Tabs.Panel value="Timer">
      <div className={styles.taskContainer}>
        <TextInput
          placeholder="Search"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
        />
        <div className={styles.taskHeader}>
          <Text className={styles.today}><IconHourglassHigh /></Text>
        </div>
        <Menu>
          {filteredTimers.map((timer) => (
            <Menu.Item key={timer.timer_id}>{timer.timer_name}</Menu.Item>
          ))}
        </Menu>
      </div>
    </Tabs.Panel>
  );
};

const Timer = () => {
  const WORK_TIME = 25; 
  const SHORT_BREAK = 5; 
  const LONG_BREAK = 15; 
  const CYCLES_BEFORE_LONG_BREAK = 4; 

  const [active, setActive] = useState('focus'); // 'focus' for work session, 'break' for break session
  const [minCount, setMinCount] = useState(WORK_TIME); // Initial time is set to WORK_TIME
  const [count, setCount] = useState(0); // Seconds count within the current minute
  const [paused, setPaused] = useState(true); // Timer paused state
  const [started, setStarted] = useState(false); // Timer started state
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null); // Timer ID for setInterval
  const [cycles, setCycles] = useState(0); // Number of completed work cycles
  const [selectedTask, setSelectedTask] = useState<number | null>(null); // State to track selected task
  const { highlights, isHighlightsLoading, isHighlightsError } = useHighlights();
  const { timer_details, istimer_detailsLoading, istimer_detailsError } = useTimers();
  const [menuOpened, setMenuOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false); // State for modal visibility
  const [startTime, setStartTime] = useState<Date | null>(null); // State to track start time

  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const resetTime = () => {
    if (timerId) clearInterval(timerId);
    setMinCount(active === 'focus' ? WORK_TIME : (cycles % CYCLES_BEFORE_LONG_BREAK === 0 ? LONG_BREAK : SHORT_BREAK));
    setCount(0);
    setPaused(true);
    setStarted(false);
    setStartTime(null); // Reset start time
  };

  const pauseTimer = () => {
    setPaused(true);
    if (timerId) clearInterval(timerId);
  };

  const startTimer = () => {
    setStarted(true);
    if (paused) {
      setPaused(false);
      setStartTime(new Date()); // Set start time
      console.log(new Date());
      console.log(startTime?.toISOString() || '123');

      setTimerId(
        setInterval(() => {
          setCount(prevCount => {
            if (prevCount === 0) {
              if (minCount === 0) {
                handleTimerEnd();
                return 0;
              }
              setMinCount(prevMinCount => prevMinCount - 1);
              return 59;
            }
            return prevCount - 1;
          });
        }, 1000)
      );
    }
  };

  const handleTimerEnd = () => {
    if (timerId) clearInterval(timerId);
    if (active === 'focus') {
      setCycles(prevCycles => prevCycles + 1);
      setActive('break');
      setMinCount((cycles + 1) % CYCLES_BEFORE_LONG_BREAK === 0 ? LONG_BREAK : SHORT_BREAK);
    } else {
      setActive('focus');
      setMinCount(WORK_TIME);
    }
    setCount(0);
    setPaused(true);
    setStarted(false);

    showNotification({
      title: 'Timer Ended',
      message: 'Time to switch!',
      icon: <IconInfoCircle />,
      color: 'teal',
    });
  };

  const endTimer = () => {
    if (timerId) clearInterval(timerId); // Ensure the timer is stopped
    setModalOpened(true); // Open modal instead of directly sending data
  };
  function parseISOStringToTimeComponents(isoString: string) {
    const date = new Date(isoString);
    return {
        hour: date.getUTCHours(),
        minute: date.getUTCMinutes(),
        second: date.getUTCSeconds(),
    };
}

  const handleEndTimerConfirm = async (isTaskComplete: boolean) => {
    setModalOpened(false);

    if (isTaskComplete) {
      // Ensure timerId is a number
      const currentTimerId = selectedTask !== null && timer_details
        ? Number(timer_details[selectedTask]?.timer_id) // Convert to number
        : -1; // Default value or handle as needed
    
      // Handle cases where highlightId might be undefined
      const highlightId = selectedTask !== null && highlights
        ? highlights[selectedTask]?.id || '4' // Provide a default value or handle as needed
        : '2'; // Default to empty string if no task is selected
    
      const end_time = new Date();

      const userId = 11; // Replace with actual user ID if available

      const pomoDetails = {
        timer_id: currentTimerId,
        highlight_id: selectedTask !== null ? selectedTask : -1, // Ensure selectedTask is a number
        user_id: userId,
        // start_time: startTime?.toISOString() || '', // Use =-
        start_time: startTime?.toISOString() || '', // Use recorded start time
        end_time: end_time.toISOString(), // Format as ISO 8601 string
        
        status: "complete"
      };
      const start_time = {
        hour: startTime?.getHours() || 0,
        minute: startTime?.getMinutes() || 0,
        second: startTime?.getSeconds() || 0,
    };
    
      console.log("1111111111111111111111111111111111111111------------");  
      console.log(parseISOStringToTimeComponents(startTime?.toISOString() || ''));  
      console.log("1111111111111111111111111111111111111111------------");
      console.log(pomoDetails);  

      

      try {
                await sendTimerEndData(pomoDetails);
                showNotification({
                  title: 'Timer Ended',
                  message: 'The timer has been reset to the beginning and details have been sent.',
                  icon: <IconInfoCircle />,
                  color: 'blue',
                  autoClose: 3000,
                  radius: 'md',
                  styles: (theme) => ({
                    root: {
                      backgroundColor: theme.colors.blue[6],
                      borderColor: theme.colors.blue[6],
                      '&::before': { backgroundColor: theme.white },
                    },
                    title: { color: theme.white },
                    description: { color: theme.white },
                    closeButton: {
                      color: theme.white,
                      '&:hover': { backgroundColor: theme.colors.blue[7] },
                    },
                  }),
                });
              } catch (error) {
                showNotification({
                  title: 'Error',
                  message: 'Failed to send timer details.',
                  icon: <IconInfoCircle />,
                  color: 'red',
                  autoClose: 3000,
                  radius: 'md',
                  styles: (theme) => ({
                    root: {
                      backgroundColor: theme.colors.red[6],
                      borderColor: theme.colors.red[6],
                      '&::before': { backgroundColor: theme.white },
                    },
                    title: { color: theme.white },
                    description: { color: theme.white },
                    closeButton: {
                      color: theme.white,
                      '&:hover': { backgroundColor: theme.colors.red[7] },
                    },
                  }),
                });
              }
            }
        
            // Reset the timer state
            setActive('focus');
            setMinCount(WORK_TIME);
            setCount(0);
            setPaused(true);
            setStarted(false);
          };
        
          const totalSeconds = minCount * 60 + count;
          const initialTotalSeconds = active === 'focus'
            ? WORK_TIME * 60
            : cycles % CYCLES_BEFORE_LONG_BREAK === 0
            ? LONG_BREAK * 60
            : SHORT_BREAK * 60;
          const percentage = totalSeconds > 0
            ? 100 - (totalSeconds / initialTotalSeconds) * 100
            : 0;
        
          useEffect(() => {
            if (totalSeconds === 0 && started) {
              handleTimerEnd();
            }
          }, [totalSeconds, started]);
        
          const handleHighlightSelect = (index: number) => {
            setSelectedTask(index);
            setMenuOpened(false);
          };


  return (
        <div className={styles.container}>
          <div className={styles.pomodoro}>
            <div className={styles.focusLink}>
              <Menu withArrow opened={menuOpened} onChange={setMenuOpened}>
                <Menu.Target>
                  <UserButton
                    label={selectedTask !== null && highlights ? highlights[selectedTask]?.highlight_name : "Focus"}
                    styles={{
                      label: {
                        fontSize: '14px',
                      },
                    }}
                    onClick={() => setMenuOpened((prev) => !prev)}
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Tabs variant="outline" defaultValue="Task">
                    <Tabs.List>
                      <Tabs.Tab value="Task">Task</Tabs.Tab>
                      <Tabs.Tab value="Timer">Timer</Tabs.Tab>
                    </Tabs.List>
                    {highlights ? <HighlightMenu highlights={highlights} onHighlightSelect={handleHighlightSelect} closeMenu={() => setMenuOpened(false)} /> : null}
                    {timer_details ? <TimerMenu timer_details={timer_details} /> : null}
                  </Tabs>
                </Menu.Dropdown>
              </Menu>
            </div>
            <div className={styles.progressBarContainer}>
              <CircularProgressbar
                value={percentage}
                text={formatTime(minCount, count)}
                styles={buildStyles({
                  pathColor: active === 'focus' ? `#007bff` : `#ff6347`, // Blue for focus, Red for break
                  textColor: '#000',
                  trailColor: '#d6d6d6',
                  textSize: '16px',
                })}
                className={styles.customTimeFont}
              />
            </div>
            <div className={styles.buttons}>
              {!started ? (
                <button className={`${styles.controlButton} ${styles.startButton}`} onClick={startTimer}>
                  Start
                </button>
              ) : (
                <>
                  {paused ? (
                    <button className={`${styles.controlButton} ${styles.startButton}`} onClick={startTimer}>
                      Continue
                    </button>
                  ) : (
                    <button className={`${styles.controlButton} ${styles.pauseButton}`} onClick={pauseTimer}>
                      Pause
                    </button>
                  )}
                  <button className={`${styles.controlButton} ${styles.endButton}`} onClick={endTimer}>
                    End
                  </button>
                </>
              )}
            </div>
          </div>
    
          <Modal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            title="Task Completion"
          >
            <Text>Is the task complete?</Text>
            <Group align="center" justify="center" mt="md">
              <Button color="green" onClick={() => handleEndTimerConfirm(true)}>Yes</Button>
              <Button color="red" onClick={() => handleEndTimerConfirm(false)}>No</Button>
            </Group>
    
          </Modal>
        </div>
      );
    };
    
    export default Timer;
    