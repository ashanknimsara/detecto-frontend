import React from 'react';

function PopupContent({ _id, vehicleNum, detectionType, location, date }) {
  return (
    <div ref={componentPDF}>
      <div>
        <h1>General Report</h1>
        <ul>
          <li>
            <label>Case ID:</label> <span>{_id}</span>
          </li>
          <li>
            <label>Vehicle Number:</label> <span>{vehicleNum}</span>
          </li>
          <li>
            <label>Detection Type:</label> <span>{detectionType}</span>
          </li>
          <li>
            <label>Location:</label> <span>{location}</span>
          </li>
          <li>
            <label>Date:</label> <span>{date}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PopupContent;
