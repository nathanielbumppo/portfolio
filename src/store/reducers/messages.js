import { CREATE_MESSAGE } from '../../constants';
const initState = {
  userMessage: []
}
const messages = (state = initState, {type, userMessage}) => {
  switch (type) {
    case CREATE_MESSAGE:
      return state;
    default:
      return state;
  }
}

export default messages;