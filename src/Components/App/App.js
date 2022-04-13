/*
This app recieves search results from the client and sends them to spotify, it then returns
these results which the user can select to add to a playlist. The user can then post the playlist
to their spotify account.

The layout of the app looks something like this:

                              index.js
                                |
                              app.js --- Spotify module
                            /   |    \
                          /     |      \
                searchbar searchresults  playlist
                                 \       |
                                  \      |
                                  tracklist
                                      |
                                    tracks 


*/

import React, { Component, useEffect } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify'

const LOCAL_STORAGE_KEY_TRACKS = 'jammingApp.playlistTracks';
const LOCAL_STORAGE_KEY_NAME = 'jammingApp.playlistName'
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: null,
      playlistTracks: []
    }
    //bind certain methods to this parent so that they will always update the parent
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.updatePlaylistTracks = this.updatePlaylistTracks.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    const storedTracks =  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TRACKS));
    const storedName = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_NAME));
    if (storedTracks) {
      this.updatePlaylistTracks(storedTracks);
    }
    if (storedName) {
      this.updatePlaylistName(storedName)
    }
  }

  //push any changes to playlist state to local storage
  componentDidUpdate(prevState) {
    if (this.state.playlistName !== prevState.playlistName) {
      localStorage.setItem(LOCAL_STORAGE_KEY_NAME, JSON.stringify(this.state.playlistName))
    }
    if (this.state.playlistTracks !== prevState.playlistTracks) {
      localStorage.setItem(LOCAL_STORAGE_KEY_TRACKS, JSON.stringify(this.state.playlistTracks))
    }
  }
  //add track to playlist
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    //check if the file already exists in the playlist
    if (tracks.find(savedTrack => savedTrack.id === track.id) ) {
      return;
    }
    tracks.push(track);
    this.updatePlaylistTracks(tracks);
  }
  // remove track from playlist
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    // filter the tracks to return only the ones which are not currently selected
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id); 
    this.updatePlaylistTracks(tracks);
  }
  // set the name of the playlist
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  } 
  // set the tracks of the playlist
  updatePlaylistTracks(tracks) {
    this.setState({playlistTracks: tracks});
  }
  
  savePlaylist() {
    // uris are the unique identifiers for spotify, this selects the uris of all the selected songs
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    // gets the current name of the playlist, this is also needed
    const playlistName = this.state.playlistName;
    //passes these items into the Spotify module
    Spotify.savePlaylist(playlistName, trackUris)
  }

  search(term) {
    // this needs to be asynch because we are waiting to recieve the data from the servers
    // we take the results and pass them into the Spotify module
     Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
     })
  }

  render () {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* render the SearchBar component at the top of the screen */}
          <SearchBar 
            // the SearchBar needs access to the search method
            onSearch = {this.search}
          />
          <div className="App-playlist">
            {/* render the SearchResults below the SearchBar */}
            <SearchResults 
              // pass addTrack method to SearchResult to allow user to add track to playlist
              onAdd={this.addTrack} 
              // pass the search results state to the component, this will in turn be passed on to the tracklist
              searchResults={this.state.searchResults} 
            />
            {/* render the playlist component */}
            <Playlist 

              playlistName = {this.state.playlistName}
              // pass any name changes from the component
              onNameChange = {this.updatePlaylistName}
              // these bound parameters allow the child to update the state of the parent
              onRemove={this.removeTrack}
              // state tracks the songs that are in the playlist
              playlistTracks={this.state.playlistTracks} 
              // these are bound functions passed to other components as props, when they other
              //components execute them they update the parent not the child
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

