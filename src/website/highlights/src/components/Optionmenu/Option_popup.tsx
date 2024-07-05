import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const StyledMenu = styled((props) => (
  <Menu
    elevation={3}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 12,
    marginTop: theme.spacing(1),
    minWidth: 200,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
    '& .MuiMenu-list': {
      padding: '8px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 20,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:hover': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.hoverOpacity,
        ),
        color: theme.palette.primary.main,
        '& .MuiSvgIcon-root': {
          color: theme.palette.primary.main,
        },
      },
    },
  },
}));

const SubMenu = ({ anchorEl, handleClose }) => (
  <StyledMenu
    id="focus-submenu"
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
    MenuListProps={{
      onMouseEnter: (e) => e.stopPropagation(),
      onMouseLeave: handleClose,
    }}
  >
    <MenuItem onClick={handleClose}>
      <ListItemText primary="Start Pomodoro" />
    </MenuItem>
    <MenuItem onClick={handleClose}>
      <ListItemText primary="Start Stopwatch" />
    </MenuItem>
  </StyledMenu>
);

export default function OptionsMenu({ onOpenPopup }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action) => {
    setAnchorEl(null);
    setSubmenuAnchorEl(null);
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

  const handleFocusMouseEnter = (event) => {
    setSubmenuAnchorEl(event.currentTarget);
  };

  const handleFocusMouseLeave = () => {
    setSubmenuAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls={open ? 'options-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faEllipsis} />
      </IconButton>
      <StyledMenu
        id="options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            onOpenPopup();
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Update" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onOpenPopup();
          }}
        >
          <ListItemIcon>
            <FileCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Add Subtask" />
        </MenuItem>
        <MenuItem onClick={() => handleClose('delete')}>
          <ListItemIcon>
            <FileCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
        <MenuItem
          onMouseEnter={handleFocusMouseEnter}
          onMouseLeave={handleFocusMouseLeave}
        >
          <ListItemIcon>
            <ArchiveIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Focus" />
          {submenuAnchorEl && (
            <SubMenu anchorEl={submenuAnchorEl} handleClose={handleFocusMouseLeave} />
          )}
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
