import React from 'react';

import { Add } from '@material-ui/icons';

interface Props {
  onChange: any;
  value: string;
  onKeyPress: any;
  addTaskToList: any;
}

function ToDoInput({onChange, value, onKeyPress, addTaskToList}: Props) {
  return(
    <div className="todo-input">
      <label className="todo-input__label">
        <span className="todo-input__add-task" onClick={addTaskToList}>
          <Add />
        </span>
        <input
          className="todo-input__input"
          placeholder="Click to add task"
          onChange={onChange}
          value={value}
          onKeyPress={onKeyPress}
        />
      </label>
    </div>
  );
}

export default ToDoInput;