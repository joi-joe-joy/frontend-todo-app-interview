import * as React from "react";
import ToDoItem from "./components/ToDoItem/ToDoItem";
import AddInput from "./components/AddInput/AddInput";
import Filter from "./components/Filter/Filter";
import {callTodosApi} from './api'
import "./App.css";

const apiKeyLocalStorageKey = "apiKey";

function App() {
  const [apiKey, setApiKey] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [filteredTodo, setFilteredTodo] = React.useState([])

  const getTodo = React.useCallback(() => {
    callTodosApi(apiKey)
      .then((res) => {
        setTodos(res.records);
      })
      .catch((e) => console.error(e));
  }, [apiKey])

  React.useEffect(() => {
    const apiKeyFromLocalStorage = localStorage.getItem(apiKeyLocalStorageKey);
    if (apiKeyFromLocalStorage) {
      localStorage.setItem(apiKeyLocalStorageKey, apiKeyFromLocalStorage);
      setApiKey(apiKeyFromLocalStorage);
    }
  }, []);

  React.useEffect(() => {
    if (apiKey) {
      getTodo()
    }
  }, [apiKey, getTodo]);

  React.useEffect(() => {
    setFilteredTodo(todos)
  }, [todos]);

  return (
    <div className="App">
      <header className="App-header">
        {!apiKey && <div className="Api-key">
          <span>Enter API key from email: </span>
          <input
            className="Api-input"
            type="password"
            value={apiKey}
            onChange={(textEvent) => {
              localStorage.setItem(
                apiKeyLocalStorageKey,
                textEvent.target.value
              );
              setApiKey(textEvent.target.value);
            }}
          />
        </div>}
        <Filter onFilter={setFilteredTodo} todos={todos}/>
        <div className="Todo-list">
          {filteredTodo.length > 0 ? (
            filteredTodo.map((todo) => (
              <ToDoItem
                key={todo.id}
                apiKey={apiKey}
                getTodo={getTodo}
                status={todo.fields.Status}
                id={todo.id}
                tags={JSON.parse(todo.fields.Tags)}
                text={todo.fields.Text}
              />
            ))
          ) : (
            <>
              <span>No items</span>
            </>  
          )}
        </div>
        <AddInput apiKey={apiKey} getTodo={getTodo}/>
      </header>
    </div>
  );
}

export default App;
