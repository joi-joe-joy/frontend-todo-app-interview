import * as React from "react";
import {STATUS} from '../../constants'
import {deleteTodo, setCheckedTodo} from '../../api'
import Tags from '../Tags/Tags'

export default function ToDoItem({ id, status, tags, text, apiKey, getTodo }) {
  const [loading, setLoading] = React.useState(false)

  const handleDelete = React.useCallback(() => {
    setLoading(true)
    deleteTodo(apiKey, id)
      .then((res) => {
        getTodo()
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setLoading(false)
      })
  }, [apiKey, getTodo, id])

  const handleCheck = React.useCallback((event) => {
    setCheckedTodo({apiKey, checked: event.target.checked, id})
      .then((res) => {
        getTodo()
      })
      .catch((e) => {
        console.error(e)
      });
  }, [apiKey, getTodo, id])

  return (
    <div className="App-todo-item">
      <div className="Row">
        <div className="form-check">
          <input className="form-check-input" 
            type="checkbox"
            id="flexCheckChecked"
            onChange={handleCheck}
            checked={status === STATUS.DONE}/>
          <label className="form-check-label" htmlFor="flexCheckChecked">
            {text}
          </label>
        </div>
        <button type="button" className={`btn btn-danger ${loading ? 'disabled' : ''}`} onClick={handleDelete}>Delete</button>
      </div>
      <Tags tags={tags} id={id} apiKey={apiKey} getTodo={getTodo}/>
    </div>
  );
}