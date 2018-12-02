const notificationReducer = (state = '', action) => {
  //console.log(action)
  switch (action.type){
  case 'SET_MESSAGE':
    return action.message
  default:
    return state
  }
}

export const messageCreation = (message) => {
  return {
    type: 'SET_MESSAGE',
    message
  }
}


export default notificationReducer