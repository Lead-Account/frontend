import React from "react";
import BoardModerator from "./BoardModerator";
import BoardUser from "./BoardUser";

const BoardAdmin = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <BoardModerator />
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardAdmin;