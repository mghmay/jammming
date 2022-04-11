import React, { Component } from 'react'
import './SearchBar.css'


export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }  
    this.search = this.search.bind(this);
    this.handleTermChanged = this.handleTermChange.bind(this);
  }

handleTermChange(e) {
  const term = e.target.value
  this.setState({ term: term });
}

  search() {
    this.props.onSearch(this.state.term)
  }
  render() {
    return (
      <div className="SearchBar">
        <input
         placeholder="Enter A Song, Album, or Artist"
         onChange={this.handleTermChange}   
        />
        <button className="SearchButton">SEARCH</button>
      </div>
    )
  }
}
