import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {
          name: 'example tracks',
          artist: 'example artist',
          album: 'example album',
          id: 12345
        },
        {
          name: 'example tracks1',
          artist: 'example artist1',
          album: 'example album1',
          id: 54321
        },
        {
          name: 'example tracks2',
          artist: 'example artist2',
          album: 'example album2',
          id: 43210
        }
      ],
      playlistName: 'example playlist name',
      playlistTracks: [
        {
          name: 'example tracks 10',
          artist: 'example artist 10',
          album: 'example album 10',
          id: 23456
        },
        {
          name: 'example tracks 20',
          artist: 'example artist 20',
          album: 'example album 20',
          id: 34567
        },
        {
          name: 'example tracks 30',
          artist: 'example artist 30',
          album: 'example album 30',
          id: 45678
        }
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
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

  render () {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} 
              searchResults={this.state.searchResults} 
            />
            <Playlist 
              onRemove={this.removeTrack}
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
            />
          </div>
        </div>
      </div>
    );
  }
  
}

