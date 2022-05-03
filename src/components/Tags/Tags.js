import * as React from "react";
import {uniqueId} from 'lodash'
import {addTag} from '../../api'

export default function Tags({ tags, id, getTodo, apiKey }) {
  const [value, setValue] = React.useState('')

  const handleChange = React.useCallback((event) => {
    setValue(event?.target?.value)
  }, [])

  const handleKeyDown = React.useCallback((event) => {
    if (event.key === 'Enter') {
      if (!value) {
        return
      };

      const tagsNew = tags.slice()
      tagsNew.push(value)
      
      addTag({apiKey, tags: tagsNew, id})
        .then((res) => {
          getTodo()
          setValue('')
        })
        .catch((e) => console.error(e));
    }
  }, [value, tags, apiKey, id, getTodo])

  return <div className="Tags Row">
    <div>
      {tags.map((item) => (
        <span key={uniqueId()} className="badge bg-warning text-dark Tag">{item}</span>
      ))}
    </div>
    <input
      className="form-control Tag-Input"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Add new Tag"/>
  </div>
};