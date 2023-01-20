import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import VendorMisUpload from "./components/upload/VendorMisUpload";
import BankMisUpload from "./components/upload/BankMisUpload";
import VendorMIS from "./tables/VendorMIS";
import BankMIS from "./tables/BankMIS";
import UsersTable from "./tables/UsersTable";
import ProcessedData from "./tables/ProcessedData";
import Sidebar from "./components/Sidebar Section/Sidebar";
import DuplicateData from "./tables/DuplicateData";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div className="d-flex table-outer">
      {/* Navbar Start */}
      {/* <nav className="navbar navbar-expand" style={{ background: "linear-gradient(to bottom left, #33ccff 10%, #33ccff 80%)", height: "71px", boxShadow:"0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)" }}>
        <Link to={"/"} className="navbar-brand" style={{ color: "white", fontWeight: "bolder", fontSize: "30px" }}>
          RuLoans
        </Link>
        <div className="navbar-nav mr-auto">

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link" style={{ color: "white",  fontSize: "18px" }}>
                Vendor MIS{" "}
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link" style={{ color: "white",  fontSize: "18px" }}>
                Bank MIS
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
             <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Logout
              </a>
            </li> 
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/user"} className="nav-link" style={{ color:"white" }}>
                Bank MIS
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/admin"} className="nav-link" style={{ color:"white" }}>
                Vendor MIS
              </Link>
            </li>
          </div>
        )}
      </nav> */}
      <Sidebar/>
      <div className="container-fluid right-outer p-2 ">
        <Routes>
          {/* <Route path="/" element={<VendorMIS />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/vendormis" element={<VendorMIS />} />
          <Route path="/bankmis" element={<BankMIS />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/processdata" element={<ProcessedData />} />
          <Route path="/userdetails" element={<UsersTable />} />
          <Route path="/" element={<VendorMisUpload/>} />
          <Route path="/bankmisupload" element={<BankMisUpload />} />
          <Route path="/duplicatedata" element={<DuplicateData />} />
        </Routes>
      </div>
      {/* Navbar Ends */}
    </div>
  );
};

export default App;
