const notificationReducer = (state = '', action) => {
  //console.log(action)
  switch (action.type){
  case 'SET_MESSAGE':
    return action.message
  default:
    return state
  }
}

export const notify = (message, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_MESSAGE',
      message
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_MESSAGE',
        message: ''
      })
    }, 1000*seconds)

  }
}

export default notificationReducer