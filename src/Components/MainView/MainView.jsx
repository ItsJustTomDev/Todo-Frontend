import React, { useState } from "react";
import ListView from "../ListView/ListView";
import TodoView from "../TodoView/TodoView";
import "./MainView.scss";
import { Toaster } from "react-hot-toast";

function MainView() {
  const [selectedTodoList, setSelectedTodoList] = useState();

  return (
    <div className="mainView">
      <div className="mainview__box">
        <ListView onChange={(todoListID) => setSelectedTodoList(todoListID)} />
        <TodoView selectedTodoList={selectedTodoList} />
        <Toaster />
      </div>
    </div>
  );
}

export default MainView;
