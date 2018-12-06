import React from 'react'
import { voteA } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'



class AnecdoteList extends React.Component {

  voteAnecdote = (id, anecdotes) => async () => {
    const votedAnecdote = anecdotes.find(n => n.id === id)
    this.props.voteA(id, votedAnecdote)

    this.props.notify(`you voted '${votedAnecdote.content}'`, 5)
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
  { voteA, notify }
)(AnecdoteList)




export default ConnectedAnecdoteList
