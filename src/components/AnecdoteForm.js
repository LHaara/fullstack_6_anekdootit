import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { messageCreation } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.store.dispatch(messageCreation('You added an anecdote "'+e.target.anecdote.value+'"'))
    this.props.store.dispatch(anecdoteCreation(e.target.anecdote.value))
    e.target.anecdote.value = ''
    setTimeout(() => {this.props.store.dispatch(messageCreation(''))}, 5000)
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm
