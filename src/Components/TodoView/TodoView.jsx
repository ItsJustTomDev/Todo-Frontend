import React, { useState, useEffect } from "react";
import "./TodoView.scss";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TodoItem from "../TodoItem/TodoItem";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import toast from "react-hot-toast";

function TodoView({ selectedTodoList }) {
  const [todoItems, setTodoItems] = useState([]);
  const [newTodo, setNewTodo] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log(selectedTodoList);
    axios.get("http://localhost:3000/api/todos").then((response) => {
      setTodoItems(response.data);
    });
  }, []);

  const createNewTodo = () => {
    axios
      .post("http://localhost:3000/api/todos", {
        description: newTodo,
        checked: false,
        todoListID: selectedTodoList.id,
      })
      .then((response) => {
        setTodoItems([...todoItems, response.data]);
        handleClose();
        toast.success("New Todo Created");
      });
  };

  const onTodoItemDelete = (todoID) => {
    todoItems.splice(todoItems.indexOf((x) => x.ID == todoID));
    setTodoItems([...todoItems]);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const invertCheckedOfTodo = (todoId) => {
    let todos = [...todoItems];
    let index = todos.findIndex((todo) => todo.id == todoId);

    todos[index] = {
      ...todos[index],
      checked: !todos[index].checked,
    };

    setTodoItems(todos);
  };

  if (!selectedTodoList) return <div></div>;

  return (
    <>
      <div className="todoView__container">
        <div className="todoView__title">
          <h2>{selectedTodoList.Name}</h2>
        </div>
        <div className="todoView__wrapper">
          {todoItems
            .filter((todoItem) => todoItem.todoListID == selectedTodoList.id)
            .map((todoItem) => {
              return (
                <TodoItem
                  todoItem={todoItem}
                  key={todoItem.id}
                  onChange={() => {
                    invertCheckedOfTodo(todoItem.id);
                  }}
                  onDelete={(id) => onTodoItemDelete(id)}
                />
              );
            })}
        </div>
        <div className="todoView__add">
          <IconButton onClick={handleOpen}>
            <AddIcon fontSize="large" />
          </IconButton>
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter New Todo
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              label="New todo"
              variant="filled"
              color="success"
              focused
              required
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </Typography>
          <Typography className="todoView__modalButtons" sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
            <Button
              onClick={createNewTodo}
              className="todoView__modalButton--left"
              variant="contained"
            >
              Submit
            </Button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default TodoView;
