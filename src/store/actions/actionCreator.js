import { ADD_TASK, REMOVE_TASK, COMPLETE_TASK, CHANGE_FILTER, CREATE_MESSAGE } from '../../constants';

export const addTask = (id, text, isCompleted) => ({
  type: ADD_TASK,
  id,
  text,
  isCompleted
});

export const removeTask = id => ({
  type: REMOVE_TASK,
  id
});

export const completeTask = id => ({
  type: COMPLETE_TASK,
  id
});

export const changeFilter = activeFilter => ({
  type: CHANGE_FILTER,
  activeFilter
});

export const createMessage = (userMessage) => {
  return (dispatch, getState, { getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('messages').add({
      ...userMessage,
      createdAt: new Date(),
    }).then(() => {
      dispatch({ type: CREATE_MESSAGE, userMessage});
    }).catch((err) => {
      alert(err);
    });
  }
}