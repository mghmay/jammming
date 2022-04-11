import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList'


export default class Playlist extends Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    let name = event.target.value
    this.props.onNameChange(name);
  }
  onSave(event) {
    let save = event.target.value;
    this.props.savePlaylist(save)
  }
  render() {
    return (
      <div className="Playlist">
        <input defaultValue= 'New Playlist' onChange={this.handleNameChange} />
        <TrackList 
          onRemove={this.props.onRemove}
          tracks={this.props.playlistTracks}
          isRemoval = {true}
        />
        <button 
          className="Playlist-save"
          onClick={this.props.onSave}
          >SAVE TO SPOTIFY</button>
      </div>
    )
  }
}
