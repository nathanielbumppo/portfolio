import { ADD_TASK, REMOVE_TASK, COMPLETE_TASK } from '../../constants';
import { load } from 'redux-localstorage-simple';

let TASKS = load({ namespace: 'todo-list' });

if (!TASKS || !TASKS.tasks || !TASKS.tasks.length) {
  TASKS = {
    tasks: [
      {
        id: 1,
        text: 'Learn ReactJS',
        isCompleted: true,
      },
      {
        id: 2,
        text: 'Learn Redux',
        isCompleted: true,
      },
      {
        id: 3,
        text: 'Learn React Router',
        isCompleted: true,
      },
      {
        id: 4,
        text: 'Get a job at the Creative company',
        isCompleted: false,
      }
    ],
  }
}

function tasks(state = TASKS.tasks, {type, id, text, isCompleted}) {
  switch (type) {
    case ADD_TASK :
      return [
        ...state, {
          id,
          text,
          isCompleted,
        }
      ];
    case REMOVE_TASK:
      return [...state].filter(task => task.id !== id);
    case COMPLETE_TASK:
      return [...state].map(task => {
        if (task.id === id) {
          task.isCompleted = !task.isCompleted;
        }
        return task;
      })
    default:
      return state;
  }
}

export default tasks;