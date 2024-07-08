import * as React from 'react';
import { Menu, Button, Text, rem } from '@mantine/core';
import {
  IconEdit,
  IconArchive,
  IconCopy,
  IconTrash,
  IconClock,
  IconCheck,
} from '@tabler/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const SubMenu = ({ opened, onClose }) => (
  <Menu opened={opened} onClose={onClose}>
    <Menu.Target>
      <div />
    </Menu.Target>
    <Menu.Dropdown>
      <Menu.Item icon={<IconClock style={{ width: rem(14), height: rem(14) }} />} onClick={onClose}>
        Start Pomodoro
      </Menu.Item>
      <Menu.Item icon={<IconCheck style={{ width: rem(14), height: rem(14) }} />} onClick={onClose}>
        Start Stopwatch
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
);

export default function OptionsMenu({ onOpenPopup }) {
  const [opened, setOpened] = React.useState(false);
  const [submenuOpened, setSubmenuOpened] = React.useState(false);

  const handleClose = (action) => {
    setOpened(false);
    setSubmenuOpened(false);
    if (action === 'delete') {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    }
  };

  return (
    <Menu
      shadow="md"
      width={200}
      opened={opened}
      onClose={() => handleClose()}
    >
      <Menu.Target>
        <Button color="#F0F4F5" onClick={() => setOpened((o) => !o)} ref={React.createRef()}>
          <FontAwesomeIcon icon={faEllipsis} style={{ color: 'black' }} /> {/* Set icon color to black */}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => {
            handleClose();
            onOpenPopup();
          }}
        >
          Update
        </Menu.Item>
        <Menu.Item
          icon={<IconCopy style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => {
            handleClose();
            onOpenPopup();
          }}
        >
          Add Subtask
        </Menu.Item>
        <Menu.Item
          icon={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
          color="red"
          onClick={() => handleClose('delete')}
        >
          Delete
        </Menu.Item>
        <Menu.Item
          icon={<IconArchive style={{ width: rem(14), height: rem(14) }} />}
          onMouseEnter={() => setSubmenuOpened(true)}
          onMouseLeave={() => setSubmenuOpened(false)}
        >
          Focus
          {submenuOpened && (
            <SubMenu opened={submenuOpened} onClose={() => setSubmenuOpened(false)} />
          )}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
