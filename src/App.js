import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import MySnackBar from "./components/MySnackBar";
import { ToastContext } from "./contexts/ToastContext";

const theme = createTheme({
  typography: {
    fontFamily: "Alexandria",
  },

  palette: {
    primary: {
      main: "#ea3908",
    },
  },
});

const initialTodos = [
  {
    id: uuidv4(),
    title: "المهمه الصفريهى",
    details: "تفاصيل االثفريهى",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "المهمه الأولى",
    details: "تفاصيل المهمه الأولى",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "المهمه الثانية",
    details: "تفاصيل المهمه الثانية",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos); // كده المصفوفه غيرتها وخلتها تشاور ع الشي الجاي من ال state
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();

  function showHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContext.Provider value={{ showHideToast: showHideToast }}>
        <div
          className="App"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#962929",
            direction: "rtl",
          }}
        >
          <MySnackBar open={open} message={message} />
          <TodosContext.Provider value={{ todos: todos, setTodos: setTodos }}>
            <TodoList />
          </TodosContext.Provider>
        </div>
      </ToastContext.Provider>
    </ThemeProvider>
  );
}

export default App;
