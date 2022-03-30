import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import "./TodoListItem.scss";
import axios from "axios";

function TodoListItem({ todoName, active, onClick, todoID, onDelete }) {
  const deleteTodoListItem = () => {
    axios
      .delete("https://todo-backend-tomdev.herokuapp.com/api/todolist", {
        data: {
          id: todoID,
        },
      })
      .then((response) => {
        onDelete(todoID);
      });
  };

  return (
    <div
      className={`todoListItem ${active ? "todoListItem--active" : ""}`}
      onClick={onClick}
    >
      <div className="todoListItem__name">
        <p>{todoName}</p>
      </div>
      <div className="todoListItem__delete">
        <IconButton onClick={deleteTodoListItem}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default TodoListItem;
