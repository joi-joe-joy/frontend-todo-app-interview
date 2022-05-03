import * as React from "react";
import {addTodo} from '../../api'
import '../../App.css'

export default function AddInput({ apiKey, getTodo }) {
  const [value, setValue] = React.useState('')

  const handleChange = React.useCallback((event) => {
    setValue(event?.target?.value)
  }, [])

  const handleKeyDown = React.useCallback((event) => {
    if (event.key === 'Enter') {
      if (!value) {
        return
      };
      
      addTodo(apiKey, value)
        .then((res) => {
          getTodo()
          setValue('')
        })
        .catch((e) => console.error(e));
    }
  }, [getTodo, apiKey, value])

  return (
    <input
      className="form-control"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Add new task, store on Enter"/>
  );
}