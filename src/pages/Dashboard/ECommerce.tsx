import DefaultLayout from '../../layout/DefaultLayout';
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Webcam from 'react-webcam';
import { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app  from '../../js/firebase.js';
import axios from 'axios';

const ECommerce = () => {

  const[video,setVideo]=useState(undefined);
  const[videoPerc,setVideoPerc] = useState(0);
  const [inputs,setInputs] = useState({});

  useEffect(()=>{
    video && uploadFile(video,"videoUrl");
  },[video]);


  const uploadFile = (file, fileType)=>{
    const storage = getStorage(app);
    const folder = fileType ==="imgUrl" ? "images/" : "videos/";
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
(snapshot) => {
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
  }
}, 
(error) => {
  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;
    case 'storage/canceled':
      // User canceled the upload
      break;

    // ...

    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      break;
  }
}, 
() => {
  // Upload completed successfully, now we can get the download URL
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    console.log('File available at', downloadURL);
    setInputs((prev)=>{
      return{
        ...prev,
        [fileType]:downloadURL
      };
    });
  });
}
);
 }
  


  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8070/Detecto/Video/`,{...inputs});
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }
  const routes = [
    {
      name: 'Dashboard',
      to: '/dashboard',
      icon: (
        <svg
          className="fill-
          dark:fill-white"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0H20V20H0V0Z" fill="" />
          <path
            d="M5.83333 10.8333H14.1667"
            stroke=""
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 5.83333V14.1667"
            stroke=""
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  return (
    <DefaultLayout routes={routes}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Security Camera System
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5 items-center">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Webcam/>
              </Grid>
              <Grid item xs={12} >

              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              {videoPerc > 0 && "Uploading:" +videoPerc+"%"}
                 <input 
                   type="file" 
                   className="appearance-none col-span-1 w-full px-4 py-3 rounded bg-black text-gray font-medium focus:outline-none focus:ring focus:border-primary" 
                   placeholder="Upload Video"
                   onChange={(e)=> setVideo((prev)=>e.target.files[0])}
                    />
                 <button 
                    type="submit" 
                    className="flex col-span-1 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    <CameraOutdoorIcon/>
                    Upload Video 
                 </button>
               </form>
               
              </Grid>
            </Grid>
          </Box> 
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
