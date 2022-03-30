import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import "./TodoItem.scss";
import axios from "axios";

function TodoItem({ todoItem, onChange, onDelete }) {
  const updateChecked = () => {
    let updatedChecked = !todoItem.checked;

    axios
      .put("https://todo-backend-tomdev.herokuapp.com/api/todos", {
        todoListID: todoItem.id,
        checked: updatedChecked,
      })
      .then((response) => {})
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTodo = () => {
    axios
      .delete("https://todo-backend-tomdev.herokuapp.com/api/todos", {
        data: {
          todoListID: todoItem.id,
        },
      })
      .then((response) => {
        console.log(response);
        onDelete(todoItem.id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="todoView__todos">
      <div className="todoView__checkbox">
        <Checkbox
          onClick={updateChecked}
          checked={todoItem.checked}
          onChange={onChange}
        />
        <p className={`${todoItem.checked ? "todoItem--checked" : ""}`}>
          {todoItem.description}
        </p>
      </div>

      <div className="todoView__delete">
        <IconButton onClick={deleteTodo}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default TodoItem;
