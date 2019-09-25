/* 
  Создание todo-приложения с использованием Redux.
*/

import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addTask, removeTask, completeTask, changeFilter } from '../store/actions/actionCreator';

import ToDoInput from '../components/todo/ToDoInput';
import ToDoList from '../components/todo/ToDoList';
import ToDoFooter from '../components/todo/ToDoFooter';

const mapStateToProps = ({tasks, filter}:any) => ({tasks, filter});
const mapDispatchToProps = (dispatch:any) => {
  return {
    completeTask: (id:any) => dispatch(completeTask(id)),
    addTask,
    removeTask,
    changeFilter,
  }
}

function SecondExercise(props:any) {
  const [taskText, setTaskText] = useState('');
  const { tasks, removeTask, completeTask, filter, changeFilter } = props;
  const isTasksExist = tasks && tasks.length > 0;
  const filteredTasks = filterTasks(tasks, filter);
  const taskCounter = getActiveTasksCounter(tasks);

  function handleInputChange(event:any) {
    event.preventDefault();
    setTaskText(event.target.value);
  }

  function addTaskToList({key, type}:any) {
    if ((taskText.length > 3 && key === 'Enter') || (taskText.length > 3 && type === 'click')) {
      const { addTask } = props;
    
      addTask((new Date()).getTime(), taskText, false);

      setTaskText('');
    }
  }

  function filterTasks (tasks:any, activeFilter:string) {
    switch(activeFilter) {
      case 'completed':
        return tasks.filter((task:any) => task.isCompleted);
      case 'active':
        return tasks.filter((task:any) => !task.isCompleted);
      default:
        return tasks;
    }
  }

  function getActiveTasksCounter(tasks:any) {
    return tasks.filter((task:any) => !task.isCompleted).length;
  }

  return(
    <div className="todo">
      <ToDoInput 
        addTaskToList={addTaskToList} 
        onKeyPress={addTaskToList} 
        onChange={handleInputChange} 
        value={taskText}></ToDoInput>

      {isTasksExist && <ToDoList 
        tasksList={filteredTasks} 
        removeTask={removeTask} 
        completeTask={completeTask}/>}
        
      {isTasksExist && <ToDoFooter 
        changeFilter={changeFilter} 
        amount={taskCounter} 
        activeFilter={filter}/>}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondExercise);