import "../styles/ListEditor.css";

import React, { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Popconfirm } from "antd";

const ListEditor = (props) => {
  let ref = React.createRef();

  const {title, handleChangeTitle, saveList, onClickOutside, deleteList} = props;

  useEffect(() => {
    document.addEventListener("click", handleClick, false);
    return () => document.removeEventListener("click", handleClick, false);
  },[])

  const onEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      saveList();
    }
  };

  const handleClick = e => {
    const node = ref.current;

    if (node.contains(e.target)) {
      return;
    }

    onClickOutside();
  };

  
  return (
    <div className="List-Title-Edit" ref={ref}>
      <TextareaAutosize
        autoFocus
        className="List-Title-Textarea"
        placeholder="Enter list title..."
        value={title}
        onChange={handleChangeTitle}
        onKeyDown={onEnter}
        style={{ width: deleteList ? 220 : 245, height: "25px" }}
      />
      {deleteList && (
        <Popconfirm
          title="Are you sure to delete this task?"
          onConfirm={deleteList}
          okText="Yes"
          cancelText="No"
        >
          <ion-icon name="trash" />
        </Popconfirm>
      )}
    </div>
  );
}

export default ListEditor;
