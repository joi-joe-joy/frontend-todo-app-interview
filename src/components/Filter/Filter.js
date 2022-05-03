import * as React from "react";

export default function Filter({onFilter, todos}) {
  const [value, setValue] = React.useState('')

  const handleChange = React.useCallback((event) => {
    setValue(event?.target?.value)
  }, [])

  const handleKeyDown = React.useCallback((event) => {
    if (event.key === 'Enter') {
      if (!value) {
        onFilter(todos)
        return
      };

      const newTodos = todos.filter((todo) => {
        const tags = JSON.parse(todo.fields.Tags)
        return tags.includes(value)
      })

      onFilter(newTodos)
    }
  }, [onFilter, todos, value])

  return (
    <input
      className="form-control"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Filter by tags"/>
  );
}