import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import Login from "./Login";

const Home = () => {
  const [content, setContent] = useState("");
  // Check Is Backend Working Or Show Error
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container-fluid">
      <Login />
    </div>
  );
};

export default Home;
