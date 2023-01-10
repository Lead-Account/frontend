import React from "react";
import VendorMIS from "../tables/VendorMIS";
import UserService from "../services/user.service";
import { useEffect } from "react";
import { useState } from "react";

const BoardModerator = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);
  return (
    <>
      <VendorMIS />
    </>
  );
};

export default BoardModerator;
