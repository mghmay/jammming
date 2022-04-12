import React, { Component } from 'react'
import './SearchBar.css'


export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }  
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(e) {
    this.setState({ term: e.target.value });
  }

  search() {
    this.props.onSearch(this.state.term)
  }
  render() {
    console.log()
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange} />
        <button
          onClick={this.search} 
          className="SearchButton">
          SEARCH
        </button>
      </div>
    )
  }
}
