import React from 'react'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { messageCreation } from '../reducers/notificationReducer'
import Filter from './Filter'

class AnecdoteList extends React.Component {

  voteAnecdote = (id, anecdotes) => () => {
    const votedNotification = anecdotes.find(n => n.id === id)
    this.props.store.dispatch(anecdoteVoting(id))
    this.props.store.dispatch(messageCreation('You voted "'+votedNotification.content+'"'))
    setTimeout(() => {this.props.store.dispatch(messageCreation(''))}, 5000)

  }

  render() {

    const anecdotes = this.props.store.getState().anecdotes
    const rajaus = this.props.store.getState().filter
    const filtered = anecdotes.filter(function (str) { return str.content.toLowerCase().includes(rajaus.toLowerCase())})
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store}/>
        {filtered.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteAnecdote(anecdote.id, anecdotes)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
