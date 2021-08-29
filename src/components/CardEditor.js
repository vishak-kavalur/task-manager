import "../styles/CardEditor.css";

import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "./EditButtons";

const CardEditor = (props) => {

  const { text, onSave, onDelete, onCancel, adding} = props;

  const [cardText, setCardText] = useState(text || '');

  const handleChangeText = event => setCardText(event.target.value);

  const onEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSave(cardText);
    }
  };



  return (
    <>
      <div className="Edit-Card">
        <div className="Card">
          <TextareaAutosize
            autoFocus
            className="Edit-Card-Textarea"
            placeholder="Enter details of the task.."
            value={cardText}
            onChange={handleChangeText}
            onKeyDown={onEnter}
          />
        </div>
        <EditButtons
          handleSave={() => onSave(cardText)}
          saveLabel={adding ? "Add Task" : "Save"}
          handleDelete={onDelete}
          handleCancel={onCancel}
        />
      </div>
    </>
  );
}

export default CardEditor;
