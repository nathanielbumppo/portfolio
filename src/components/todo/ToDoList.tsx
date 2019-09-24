import React from 'react';

import ToDoItem from './ToDoItem';

interface Props {
  tasksList: {id: number, text: string, isCompleted:boolean}[];
  removeTask: any;
  completeTask: any;
}

function ToDoList(props: Props) {
  return(
    <div className="todo-list">
      <ul className="todo-list__list">
        {props.tasksList.map(({id, text, isCompleted}) => (
          <ToDoItem 
            key={id}
            text={text}
            isCompleted={isCompleted}
            removeTask={props.removeTask}
            completeTask={props.completeTask}
            id={id}
          />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;