import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IconButton, TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

function Window() {
  const { _id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [vehicleNum, setVehicleNumber] = useState('');
  const [detectionType, setDetectionType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const componentPDF = useRef();

  useEffect(() => {
    if (_id) {
      axios.get(`http://localhost:8070/Detecto/CasesManage/moreinformation/${_id}`)
        .then(response => {
          setCaseData(response.data);
          setVehicleNumber(response.data.vehicalNum || ''); 
          setDetectionType(response.data.evidence || ''); 
          setLocation(response.data.location || '');
          setImageUrl(response.data.image || '');
          const rawDate = new Date(response.data.date);
          const formattedDate = `${rawDate.getFullYear()}-${('0' + (rawDate.getMonth() + 1)).slice(-2)}-${('0' + rawDate.getDate()).slice(-2)} ${('0' + rawDate.getHours()).slice(-2)}:${('0' + rawDate.getMinutes()).slice(-2)}`;
          setDate(formattedDate);
        })
        .catch(error => {
          console.error('Error fetching case data:', error);
        });
    }
  }, [_id]);

  const goBack = () => {
    navigate('/Dashboard/Cases');
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
  });

  return (
    <>
      <IconButton className="cursor-pointer" aria-label="back" onClick={goBack}>
        <ArrowBackIcon />
      </IconButton>
      <div ref={componentPDF}>
        <div className='grid sm:grid-cols-2 gap-4'>
        <div className='min-h-[100px] rounded-lg shadow  flex justify-center items-center'>
        <div>
        <img src={imageUrl} alt="Preview" style={{ width: '500px', height: '500px' }} />
        </div>
      </div>

      <div className='min-h-[100px] rounded-lg shadow '>
  <div>
    <ul className='flex flex-col items-center'>
      <li className="mb-4">
        <div className="flex items-center">
          <div className="mr-4">
            <TextField id="outlined-basic-username" label="CaseID" variant="outlined" style={{ marginBottom: '16px', borderWidth: '50px' }} value={_id} disabled />
          </div>
        </div>
      </li>
      <li className="mb-4">
        <div className="flex items-center">
          <div className="mr-4">
            <TextField id="outlined-basic-username" label="Vehicle Number" variant="outlined" style={{ marginBottom: '16px', borderWidth: '50px' }} value={vehicleNum} disabled />
          </div>
        </div>
      </li>
      <li className="mb-4">
        <div className="flex items-center">
          <div className="mr-4">
            <TextField id="outlined-basic-username" label="Detection Type" variant="outlined" style={{ marginBottom: '16px', borderWidth: '50px' }} value={detectionType} disabled />
          </div>
        </div>
      </li>
      <li className="mb-4">
        <div className="flex items-center">
          <div className="mr-4">
            <TextField id="outlined-basic-username" label="Location" variant="outlined" style={{ marginBottom: '16px', borderWidth: '50px' }} value={location} disabled />
          </div>
        </div>
      </li>
      <li className="mb-4">
        <div className="flex items-center">
          <div className="mr-4">
            <TextField id="outlined-basic-username" label="Date" variant="outlined" style={{ marginBottom: '16px', borderWidth: '10px' }} value={date} disabled />
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>


      </div>
      </div><br></br>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="contained" color="primary" onClick={generatePDF}>Generate Report</Button>
      </div>
      <br />
    </>
  );
}

export default Window;
