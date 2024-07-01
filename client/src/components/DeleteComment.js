import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import {useState} from 'react'

export default function DeleteCommentPopover({ commentId, deleteComment }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deleteComment(commentId);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <span onClick={handleClick} style={{ cursor: 'pointer' }}>
        <MoreHorizOutlinedIcon/>
      </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
          Are you sure you want to delete this comment?
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          sx={{ m: 1,  
            color: "white",
          backgroundColor: '#EF1F22',
          '&:hover':{
              backgroundColor: '#ED5D52 '
          }
          }}
        >
          Delete
        </Button>
        <Button variant="contained" onClick={handleClose} sx={{ m: 1 }}>
          Cancel
        </Button>
      </Popover>
    </div>
  );
}
