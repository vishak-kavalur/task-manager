import "../styles/EditButtons.css";

import React from "react";
import { Popconfirm } from "antd";

const EditButtons = ({ handleSave, saveLabel, handleDelete, handleCancel }) => (
  <div className="Edit-Buttons">
    <div
      tabIndex="0"
      className="Edit-Button"
      style={{ backgroundColor: "rgb(75 122 162)" }}
      onClick={handleSave}
    >
      {saveLabel}
    </div>
    {handleDelete && (
      <Popconfirm
        title="Are you sure to delete this task?"
        onConfirm={handleDelete}
        okText="Yes"
        cancelText="No"
      >
        <div
          tabIndex="0"
          className="Edit-Button"
          style={{ backgroundColor: "rgb(222 82 82)", marginLeft: 0 }}
        >
          Delete
        </div>
      </Popconfirm>
    )}
    <div tabIndex="0" className="Edit-Button-Cancel" onClick={handleCancel}>
      <ion-icon name="close" />
    </div>
  </div>
);

export default EditButtons;
