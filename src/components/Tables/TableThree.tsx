import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, TablePagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TableThree = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [cases, setCases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCases();
  }, [page, rowsPerPage]);

  const getCases = () => {
    const startIndex = page * rowsPerPage;
    axios.get(`http://localhost:8070/Detecto/CasesManage/cases?`)
      .then(response => {
        setCases(response.data);
      })
      .catch(error => {
        console.error('Error fetching cases:', error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
 
  const filteredData = cases.filter(caseItem => {
    return (
      (caseItem.name && caseItem.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (caseItem.invoiceDate && caseItem.invoiceDate.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (caseItem.location && caseItem.location.toLowerCase().includes(searchTerm.toLowerCase()))||
      (caseItem.evidence && caseItem.evidence.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const date = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${date} ${hours}:${minutes}`;
  };
  

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="flex justify-between mb-4">
          <TextField
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
            variant="outlined"
            className="border border-gray-300 rounded-md px-4 py-2 mb-4"
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
                Case ID
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Date & Time
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Detection Type
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((caseItem, index) => (
            <tr
            key={index}
            className="cursor-pointer"
            onClick={() => {
              if (caseItem._id) {
                console.log("Navigating to MoreInformation with case ID:", caseItem._id);
                navigate(`/Dashboard/MoreInformation/${caseItem._id}`); // Make sure caseItem._id is defined
              } else {
                console.error("Error: caseItem._id is undefined or null.");
              }
            }}
          >
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {caseItem._id}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                  {formatDateTime(caseItem.date)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {caseItem.evidence}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    {caseItem.location}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />


        
      </div>
    </div>
  );
};

export default TableThree;
