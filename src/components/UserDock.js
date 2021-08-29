import "../styles/UserDock.css";

import React, { useState } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Avatar, Tooltip, Typography, Space, Modal, Input } from "antd";
import shortid from "shortid";

import { stringToHslColor  } from "./utils";

const UserDock = (props) => {
    
    const { Text } = Typography;
    const { dispatch, users } = props;
  
    const [type, setType] = useState('');
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [error, setError] = useState(false);
    
    const openModal = (type, user={}) => {
        setType(type);
        setVisible(true);
        setError(false);

        if(type === 'add') {
            setName('');
        } else {
            setName(user.userName);
            setId(user.userId)
        }
    }

    const handleOk = () => {
      if(!name) {
          setError(true)
          return;
      }

      if(type === 'add') {
        const userId = shortid.generate();
        dispatch({
          type: "ADD_USER",
          payload: { userName: name, userId: userId },
        });
      } else {
        dispatch({
          type: "CHANGE_USER_NAME",
          payload: { userName: name, userId: id },
        });
      }
      
      setVisible(false);
    };

    const handleCancel = () => {
      setError(false);
      setName('');
      setId('');
      setVisible(false);
    };

    return (
      <div className="Dock">
        <Space align="center" size="large">
          {users.map((user) => {
            return (
              <Tooltip
                title={"Edit " + user.userName}
                placement="top"
                key={user.userId}
                className="grow"
              >
                <Avatar
                  size={50}
                  style={{
                    backgroundColor: stringToHslColor(user.userName),
                    cursor: "pointer",
                  }}
                  onClick={() => openModal("edit", user)}
                >
                  {user.userName[0]}
                </Avatar>
              </Tooltip>
            );
          })}
          <Tooltip title="Add new User" placement="top">
            <Avatar
              size={50}
              style={{
                backgroundColor: "darkgray",
              }}
              key={"+"}
              onClick={() => openModal("add")}
            >
              <div
                style={{
                  fontSize: "30px",
                  paddingTop: "4px",
                  cursor: "pointer",
                }}
              >
                <ion-icon name="add"></ion-icon>
              </div>
            </Avatar>
          </Tooltip>
        </Space>

        {/* Modal For Create & Edit Users */}
        <Modal
          title={type === "add" ? "Add new user" : "Edit user"}
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          style={{ top: "25%" }}
        >
          <Input
            placeholder="Enter user's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: "20px" }}
          />

          {error && <Text type="danger">Can't create a nameless user!</Text>}
        </Modal>
      </div>
    );
};

const mapStateToProps = (state) => ({ usersById: state.usersById });

export default connect(mapStateToProps)(UserDock);
