import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList'


export default class Playlist extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Playlist">
        <input defaultValue= 'New Playlist' />
        <TrackList 
          onRemove={this.props.onRemove}
          tracks={this.props.playlistTracks}
          isRemoval = {true}
        />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    )
  }
}
