import React from "react";
import ReactDOM from "react-dom";
import MainView from "./Components/MainView/MainView";
import "./index.scss";

const TodoApplication = () => {
  return (
    <div className="App">
      <MainView />
    </div>
  );
};

// Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(TodoApplication), container);
