import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import defaultimg from '../assets/images/default-user-img.png';
import createAxiosInstance from './axiosInstance';

const axiosInstance = createAxiosInstance();

function ProfileUpload({ setPopup, onImageSelect, profilePicture, setProfilePicRemoved }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const open = Boolean(anchorEl);
  const defaultImage = defaultimg;

  const handleClickOpen = () => {
    setNewOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCancelRemove = () => {
    setNewOpen(false);
    setAnchorEl(null);
  };

  const handleClosePopup = () => {
    setNewOpen(false);
  };

  const handleRemove = async () => {
    try {
      setNewOpen(false);
      setAnchorEl(null);
      await axiosInstance.post('/remove-profile-pic');
      setProfilePicRemoved((prev) => !prev);  
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeClose = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(e.target.result);
        setPopup(true);
        setAnchorEl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className='relative w-52 h-52 flex items-center justify-start'>
      <div className="absolute z-10 overflow-hidden rounded-full h-36 w-36 bg-profile bg-cover">
        <img src={profilePicture || defaultImage} alt="Profile" className="object-cover h-full w-full" />
      </div>
      <div className='absolute z-20 bottom-6 right-14 hover:bg-opacity-50 bg-white bg-opacity-85 hover:bg-white rounded-full '>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <CameraAltIcon fontSize='large' />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem>
            <label htmlFor="file-upload" className="custom-file-upload">
              Change
            </label>
            <input id="file-upload" accept='image/*' type="file" style={{ display: 'none' }} onChange={handleChangeClose} />
          </MenuItem>
          <MenuItem onClick={handleDialogOpen}>View</MenuItem>
          <MenuItem onClick={handleClickOpen}>Remove</MenuItem>
        </Menu>
      </div>

      
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Profile Picture</DialogTitle>
        <DialogContent>
          <img src={profilePicture || defaultImage} alt="Profile" style={{ width: '100%', height: 'auto' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      
      <Dialog
        open={newOpen}
        onClose={handleClosePopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{padding: '14px 12px', fontSize: '17px'}}  id="alert-dialog-title">{"Are you sure you want to remove profile pic?"}</DialogTitle>
        <DialogActions>
          <Button
            variant='contained'
            onClick={handleCancelRemove}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRemove}
            sx={{
              color: "white",
              fontWeight: '700',
              backgroundColor: 'red',
              '&:hover': {
                backgroundColor: '#ED5D52 '
              }
            }}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProfileUpload;
