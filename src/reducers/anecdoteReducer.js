import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  //console.log(action)
  switch(action.type){
  case 'VOTE': {
    const old = store.filter(a => a.id !==action.data.id)
    return [...old, { ...action.data }]
  }
  case 'CREATE':
    return [...store, { content: action.data.content, id: action.data.id, votes:0 }]
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return store
  }
}


export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const voteA = (id, votedAnecdote) => {
  return async (dispatch) => {
    const changedAnecdote = { ...votedAnecdote, votes: votedAnecdote.votes+1 }
    const data = await anecdoteService.update(id, changedAnecdote)
    dispatch({
      type: 'VOTE',
      data
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer