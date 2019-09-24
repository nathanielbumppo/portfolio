import React from 'react';
import { CheckBoxOutlineBlank, CheckBoxOutlined, CloseOutlined} from '@material-ui/icons';

interface Item {
  text: string;
  isCompleted: boolean;
  removeTask: any;
  id: number;
  completeTask: any;
}

function ToDoItem({isCompleted, text, removeTask, id, completeTask}: Item) {
  return(
    <li
      className="todo-item"
    >
      <span 
        className={"todo-item__icon" + (isCompleted ? ' is-completed' : '')} 
        onClick={() => completeTask(id)}
      >
        {isCompleted ? <CheckBoxOutlined/>: <CheckBoxOutlineBlank/>}
      </span>
      <span 
        className={'todo-item__text' + (isCompleted ? ' is-completed' : '')}
        title={text}
      >{text}</span>
      <span onClick={() => removeTask(id)} className="todo-item__delete">
        <CloseOutlined/>
      </span>
    </li>
  );
}

export default ToDoItem;