import React, { useEffect, useState } from 'react';
import GenranNav from '../../Genral';
import { InputAdornment, TextField, Button, TablePagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Update from '../../../Update/index';
import UpdatePopup from '../../../Popup/indexupdate';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { access } from 'fs';

const GeneralInfo: React.FC = () => {
  useEffect(() => {
    getUsers();
  }, []);

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupUpdate, setOpenPopupUpdate] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user data
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [doneDialogOpen, setDoneDialogOpen] = useState(false);
  const [selectedDoneUser, setSelectedDoneUser] = useState(null);
  const [accessDialogOpen, setAccessDialogOpen] = useState(false);




  const getUsers = () => {
    axios.get('http://localhost:8070/Detecto/manage/')
      .then(response => {
        console.log(response.data);
        setUsers(response.data); // Assuming the data structure matches the expected structure
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  const deleteUser = (_id) => {
    axios.post(`http://localhost:8070/Detecto/manage/delete/${_id}`)
      .then(response => {
        console.log(response.data);
        getUsers();
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };
  const accessDetectoSystem = (_id) => {
    if (!_id) {
      console.error("Missing _id");
      return; // Exit the function early if _id is not provided
    }
  
    axios.post(`http://localhost:8070/Detecto/manage/access/${_id}`, {
      access: "true"
    })
    .then(response => {
      console.log(response.data);
      
    })
    .catch(error => {
      console.error("Error:", error);
      
    });
  };
  

 const openDoneDialog = (user) => {
  setSelectedDoneUser(user);
  setDoneDialogOpen(true);
};

const closeDoneDialog = () => {
  setSelectedDoneUser(null);
  setDoneDialogOpen(false);
};
  const handleUpdateTable = () => {
    getUsers();
    setOpenPopupUpdate(false);
  };


  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.phone && user.phone.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEdit = (user) => {
    console.log("Selected User:", user);
    setSelectedUser(user);
    setOpenPopupUpdate(true);
  };

  const openDeleteDialog = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    setUserToDelete(null);
    setDeleteDialogOpen(false);
  };
  // Function to open the alert dialog
const openAccessDialog = (user) => {
  setSelectedDoneUser(user);
  setAccessDialogOpen(true);
};

// Function to close the alert dialog
const closeAccessDialog = () => {
  setSelectedDoneUser(null);
  setAccessDialogOpen(false);
};

  return (
    <div className="space-y-8">
      <GenranNav />
      <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">User Information</h3>
        </div>
        <div className="p-6.5">
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <div className="flex justify-between mb-4">
                <TextField
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleChange}
                  variant="outlined"
                  className="border border-gray-300 rounded-md px-4 py-2"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </div>

              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      User ID
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      User Name
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Email
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Phone Number
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Role
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(rowsPerPage > 0
                    ? filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : filteredUsers
                  ).map((user, index) => (
                    <tr key={index} className="cursor-pointer">
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {user._id}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user.username}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user.email}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user.phone}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {user.role.toLowerCase()}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <IconButton variant="contained" color="primary" className="mr-2" onClick={() => handleEdit(user)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton variant="contained" color="error" style={{ marginLeft: '3px' }} onClick={() => openDeleteDialog(user)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton variant="contained" color="success" style={{ marginLeft: '3px' }} onClick={() => openAccessDialog(user)}>
                          <DoneIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                component="div"
                count={filteredUsers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {userToDelete && userToDelete.username} information?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            No
          </Button>
          <Button onClick={() => {
            deleteUser(userToDelete._id);
            closeDeleteDialog();
          }} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

<Dialog
  open={accessDialogOpen}
  onClose={closeAccessDialog}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">Confirm Access</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Do you want to access {selectedDoneUser && selectedDoneUser.username} information in the Detecto system?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={closeAccessDialog} color="primary">
      No
    </Button>
    <Button onClick={() => {
      accessDetectoSystem(selectedDoneUser._id); // Call accessDetectoSystem with the selected user's _id
      closeAccessDialog(); // Close the dialog after the function is triggered
    }} color="primary" autoFocus>
      Yes
    </Button>
  </DialogActions>
</Dialog>



      <UpdatePopup
        openPopupUpdate={openPopupUpdate}
        setOpenPopupUpdate={setOpenPopupUpdate}
        onUpdate={handleUpdateTable}
      >
        <Update selectedUser={selectedUser} onUpdate={handleUpdateTable}/>
      </UpdatePopup>
    </div>
  );
};

export default GeneralInfo;
