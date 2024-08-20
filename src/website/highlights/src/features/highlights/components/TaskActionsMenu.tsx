// import React from 'react';
// import { Menu, UnstyledButton } from '@mantine/core';
// import { IconDotsVertical } from '@tabler/icons-react';
// import { useRouter } from 'next/router';

// export function TaskActionsMenu({ id, onTaskRemove }: { id: string, onTaskRemove: (id: string) => void }) {

//     const router = useRouter();

//     const handleStartFocus = (taskId: string) => {
//         router.push({
//             pathname: '/focus',
//             query: {
//                 task: taskId,
//             },
//         });
//     }

//     return (
//         <Menu>
//             <Menu.Target>
//                 <UnstyledButton>
//                     <IconDotsVertical size={18} />
//                 </UnstyledButton>
//             </Menu.Target>

//             <Menu.Dropdown>
//                 <Menu.Item>Modify</Menu.Item>
//                 <Menu.Item onClick={() => onTaskRemove(id)}>Remove</Menu.Item>
//                 <Menu.Item onClick={() => handleStartFocus(id)}>Start Focus</Menu.Item>
//             </Menu.Dropdown>
//         </Menu>
//     );
// };