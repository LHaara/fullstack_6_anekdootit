import React from 'react'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { messageCreation } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'


class AnecdoteList extends React.Component {

  voteAnecdote = (id, anecdotes) => async () => {
    const votedAnecdote = anecdotes.find(n => n.id === id)
    const changedAnecdote = { ...votedAnecdote, votes: votedAnecdote.votes+1 }
    const updatedAnecdote = await anecdoteService.update(id, changedAnecdote)

    this.props.anecdoteVoting(updatedAnecdote)
    this.props.messageCreation('You voted "'+votedAnecdote.content+'"')
    setTimeout(() => {this.props.messageCreation('')}, 5000)

  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store}/>
        {this.props.visibleSortedAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteAnecdote(anecdote.id, this.props.visibleSortedAnecdotes)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const filteredAndSortedAnecdotes = (anecdotes, filter) => {
  //console.log(anecdotes)
  const filtered = anecdotes.filter(function (str) { return str.content.toLowerCase().includes(filter.toLowerCase())})
  return filtered.sort((a, b) => b.votes - a.votes)
}



const mapStateToProps = (state) => {
  return {
    visibleSortedAnecdotes: filteredAndSortedAnecdotes(state.anecdotes, state.filter)
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { anecdoteVoting, messageCreation }
)(AnecdoteList)




export default ConnectedAnecdoteList
