import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";

import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/todosContext";

import { ToastContext } from "../contexts/ToastContext";

export default function Todo({ todo, showDelete, showUpdate }) {
  // const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  // const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  const { showHideToast } = useContext(ToastContext);
  const { todos, setTodos } = useContext(TodosContext);

  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideToast("تم التعديل بنجاح");
  }

  function handleDeleteClick() {
    showDelete(todo);
  }

  function handleUpdateClick() {
    showUpdate(todo);
  }

  return (
    <>
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          backgroundColor: "#083880",
          color: "#fff",
          marginTop: "30px",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              {" "}
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>

            {/* Action Buttons */}

            {/* check Icon Button */}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                onClick={handleCheckClick}
                aria-label="delete"
                className="iconButton"
                style={{
                  backgroundColor: todo.isCompleted ? "#08bc34" : "#ffffff",
                  color: todo.isCompleted ? "#fbfffc" : "#08bc34",
                  border: "3px solid #08bc34",
                }}
              >
                <CheckIcon />
              </IconButton>

              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  backgroundColor: "#fff",
                  color: "#044586",
                  border: "3px solid #125dc6",
                }}
              >
                <EditIcon />
              </IconButton>

              {/*  Delete Button */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  backgroundColor: "#fff",
                  color: "#b23c17",
                  border: "3px solid #b23c17",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
              {/* ===  Delete Button === */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
