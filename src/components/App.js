import "../styles/App.css";

import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import Board from "./Board";
import UserDock from "./UserDock";


const App = () => {
  const [filter, setFilter] = useState("");
  const [users, setusers] = useState([]);
  const { usersById } = useSelector((state) => state);

  useEffect(() => {
    setusers(
      Object.entries(usersById).map((key) => {
        return {
          userName: key[1].text,
          userId: key[0],
        };
      })
    );
  },[usersById]);

  const resetData = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="App">
      <div className="Header">
        <div className="Logo">
          <ion-icon name="filing"></ion-icon>
        </div>
        <span>Task Manager</span>

        <div className="Reset" onClick={resetData}>
          <ReloadOutlined />
          <span style={{marginLeft: "5px"}}>Reset</span>
        </div>

        <input
          placeholder="Filter tasks"
          className="Filter"
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="Search">
          <FilterOutlined />
        </div>
      </div>

      <UserDock users={users} />
      <Board filter={filter} users={users} />
    </div>
  );
}

export default App;
