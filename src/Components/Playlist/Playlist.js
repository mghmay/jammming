import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList'


export default class Playlist extends Component {
  constructor(props) {
    super(props);
    // we need to bind methods in order to be able to call them in the rendering process  
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  //we call the event listener because we are waiting for the user to update the name
  handleNameChange(event) {
    //.target.value refers to what is actually written in the field
    let name = event.target.value
    //we can't actually use this prop directly in the render because it requires an argument
    this.props.onNameChange(name);
  }
  setDefault(e) {
    if (e.target.value === '') {
      e.target.value = 'New playlist';
    }
  }
  clearName(e) {
    if (e.target.value === 'New playlist') {
      e.target.value = ''
    }
  }
  // onremove and onsave don't need to be bound because they don't require arguments
  // this means they don't actually need to be called, their values are passed automatically
  render() {
    return (
      <div className="Playlist">
        <input value = {this.props.playlistName || 'New playlist'} onBlur={this.setDefault} onFocus={this.clearName} onChange={this.handleNameChange} />
        <TrackList 
          onRemove={this.props.onRemove}
          tracks={this.props.playlistTracks}
          isRemoval = {true}
        />
        <button 
          className="Playlist-save"
          onClick={this.props.onSave} >
          SAVE TO SPOTIFY
        </button>
      </div>
    )
  }
}
