import React from 'react'
import { NavLink } from "react-router-dom";
import './sidebar.css'
import ruloansLogo from '../../Assets/Ruloans_Logo.webp'
export default function Sidebar() {
  return (
    <>
      <div className='sidebar-outer'>
        <div className='logo-section'>
          <img src={ruloansLogo} alt="ruloans-logo" width="80%" />
        </div>
        <div className='Navigation p-2'>
          <h4 className='mt-4 pl-3'>Quick Menu</h4>
          <ul>
            <li>
              <NavLink to={"/"} activeClassName="active" className="nav-link">
                Upload Vendor MIS{" "}
              </NavLink>
            </li>
            <li>
              <NavLink to={"/bankmisupload"} activeClassName="active" className="nav-link">
                Upload Bank MIS{" "}
              </NavLink>
            </li>
            <li>
              <NavLink to={"/vendormis"} activeClassName="active" className="nav-link">
                Vendor MIS{" "}
              </NavLink>
            </li>
            <li>
              <NavLink to={"/bankmis"} activeClassName="active" className="nav-link">
                Bank MIS
              </NavLink>
            </li>
            {/* <li>
              <NavLink to={"/processdata"} activeClassName="active" className="nav-link">
                Processed Data
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink to={"/userdetails"} activeClassName="active" className="nav-link">
                Unprocessed Data
              </NavLink>
            </li> */}
            <li>
              <NavLink to={"/duplicatedata"} className="nav-link">
                Duplicate Data
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
