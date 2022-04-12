/*
This app recieves search results from the client and sends them to spotify, it then returns
these results which the user can select to add to a playlist. The user can then post the playlist
to their spotify account.

The layout of the app looks something like this:

                              index.js
                                |
                              app.js
                            /   |    \
                          /     |      \
                searchbar searchresults  playlist
                                 \       |
                                  \      |
                                  tracklist
                                      |
                                    tracks 


*/

import React, { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id) ) {
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id); 
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  } 
  
  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    const playlistName = this.state.playlistName;
    Spotify.savePlaylist(playlistName, trackUris)
  }

  search(term) {
     Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
     })
  }

  render () {
    console.log(this.state.searchResults)
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar 
            onSearch = {this.search}
          />
          <div className="App-playlist">
            <SearchResults 
              onAdd={this.addTrack} 
              searchResults={this.state.searchResults} 
            />
            <Playlist 
              onNameChange = {this.updatePlaylistName}
              onRemove={this.removeTrack}
              playlistTracks={this.state.playlistTracks} 
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

