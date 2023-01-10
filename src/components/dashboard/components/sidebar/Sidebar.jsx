import React from 'react';
import "./sidebar.scss";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">CRM</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title"></p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li><ArrowForwardIosIcon sx={{fontSize:"small"}} /><span>Table 1</span></li>
            <li><ArrowForwardIosIcon sx={{fontSize:"small"}} /><span>Table 2</span></li>
            {/* <li><ArrowForwardIosIcon sx={{fontSize:"small"}} /><span>Processed Data</span></li>
            <li><ArrowForwardIosIcon sx={{fontSize:"small"}} /><span>Un-Proccessed Data</span></li> */}
          </Link>
        </ul>
      </div>
      {/* <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div> */}
    </div >
  )
}

export default Sidebar;