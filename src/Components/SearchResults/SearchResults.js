import React, { Component } from 'react';
import './SearchResults.css'
import TrackList from '../TrackList/TrackList';

export default class SearchResults extends Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        {/* we pass the results to tracklist here, because tracklist is used in playlist and in 
        search results it makes sense to have it as a reusable component. It needs the searchResult
        props which are passed from App.js state. it needs to be this way because the parent App
        calls the results from the server using the Spotify module
        */}
        <TrackList tracks={this.props.searchResults} 
        onAdd={this.props.onAdd} 
        // the tracklist component needs the isRemoval prop because sometimes tracks can be added
        // i.e. in the search results and some times they are removed i.e. in the playlist component
        isRemoval={false} />
      </div>
    )
  }
}
