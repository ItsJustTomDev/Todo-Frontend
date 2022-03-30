import React, { useEffect, useState } from "react";
import "./ListView.scss";
import TodoListItem from "../TodoListItem/TodoListItem";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import toast from "react-hot-toast";

function ListView({ onChange }) {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState([]);
  const [newTodoList, setNewTodoList] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios.get("https://todo-backend-tomdev.herokuapp.com/api/todolist").then((response) => {
      setTodos(response.data);
      setSelectedTodo(response.data[0]);
      onChange(response.data[0]);
    });
  }, []);

  useEffect(() => {
    if (todos.length <= 0) return;

    setSelectedTodo(todos[todos.length - 1]);
    onChange(todos[todos.length - 1]);
  }, [todos]);

  const createNewTodoList = () => {
    axios
      .post("https://todo-backend-tomdev.herokuapp.com/api/todolist", {
        TodoList: newTodoList,
      })
      .then((response) => {
        setTodos([...todos, response.data]);
        handleClose();
        toast.success("TodoList created");
      });
  };

  const onTodoListItemClick = (todoList) => {
    setSelectedTodo(todoList);
    onChange(todoList);
  };

  const onTodoListDelete = (todoListID) => {
    todos.splice(todos.indexOf((x) => x.ID == todoListID));
    setTodos([...todos]);
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

  return (
    <div className="listView">
      <div className="listView__title">
        <h3>TODO lijstjes</h3>
      </div>
      <div className="listView__wrapper">
        {todos.map((Todo) => {
          return (
            <TodoListItem
              key={Todo.id}
              todoName={Todo.Name}
              todoID={Todo.id}
              active={Todo.id == selectedTodo.id}
              onClick={() => onTodoListItemClick(Todo)}
              onDelete={(todoID) => onTodoListDelete(todoID)}
            />
          );
        })}
      </div>
      <div className="listView__add">
        <IconButton onClick={handleOpen}>
          <AddIcon fontSize="large" />
        </IconButton>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Make a New Todo List
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              label="New Todo List"
              variant="filled"
              color="success"
              focused
              onChange={(e) => setNewTodoList(e.target.value)}
              required
            />
          </Typography>
          <Typography className="todoView__modalButtons" sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
            <Button
              onClick={createNewTodoList}
              className="todoView__modalButton--left"
              variant="contained"
            >
              Submit
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default ListView;
