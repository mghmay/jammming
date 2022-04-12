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

  handleTermChange(event) {
    this.setState({
      term: event.target.value
    });
  }
  // search needs to be declared here because onSearch requires an argument (term)
  // we put term into state in this component when the name is changed
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
