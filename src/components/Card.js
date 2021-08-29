import "../styles/Card.css";

import React, { useState } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { Avatar, Tooltip, Menu, Dropdown, Badge } from "antd";
import CardEditor from "./CardEditor";
import { stringToHslColor } from "./utils";

const Card = (props) => {

  const { card, dispatch, index, listId, filter, users } = props;

  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);

  

  const startHover = () => setHover(true);
  const endHover = () => setHover(false);



  const startEditing = () => {
    setHover(false);
    setEditing(true);
  }

  const endEditing = () => {
    setHover(false);
    setEditing(false);
  }

  const editCard = async text => {

    endEditing();

    dispatch({
      type: "CHANGE_CARD_TEXT",
      payload: { cardId: card._id, cardText: text }
    });
  };

  const deleteCard = async () => {
      dispatch({
        type: "DELETE_CARD",
        payload: { cardId: card._id, listId }
      });
  };

  const menus = users.map((user) => {
      return (
        <Menu.Item
          key={user.userId}
          onClick={() => assignUser(user.userId, user.userName)}
        >
          <Badge color={stringToHslColor(user.userName)} />
          {user.userName}
        </Menu.Item>
      );
    });

  const menu = () => {
      return (
        <Menu>
          {menus}
        </Menu>
      )
  }

  const assignUser = async (userId, userName) => {
    dispatch({
      type: "ASSIGN_USER",
      payload: { cardId: card._id, userName: userName, userId: userId },
    });
  }

  return (
    <>
      {!editing ? (
        <>
          {card.text?.toLowerCase().indexOf(filter) >= 0 ? (
            <Draggable draggableId={card._id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="Card"
                  onMouseEnter={startHover}
                  onMouseLeave={endHover}
                >
                  {hover && (
                    <div className="Card-Icons">
                      <div className="Card-Icon" onClick={startEditing}>
                        <ion-icon
                          name="create"
                          style={{ color: "#002244", fontSize: "20px" }}
                        />
                      </div>
                    </div>
                  )}

                  <div style={{ marginBottom: "5px"}}>{card.text}</div>
                  <div className="Avatar">
                    <Dropdown
                      overlay={menu}
                      trigger="click"
                      placement="bottomLeft"
                      arrow
                    >
                      <Tooltip
                        title={card.userName ? card.userName : "Not Assigned"}
                        placement="left"
                      >
                        <Avatar
                          style={{
                            backgroundColor: stringToHslColor(card.userName),
                          }}
                        >
                          {card.userName ? card.userName[0] : "--"}
                        </Avatar>
                      </Tooltip>
                    </Dropdown>
                  </div>
                </div>
              )}
            </Draggable>
          ) : (
            ""
          )}
        </>
      ) : (
        <CardEditor
          text={card.text}
          onSave={editCard}
          onDelete={deleteCard}
          onCancel={endEditing}
        />
      )}
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(Card);
