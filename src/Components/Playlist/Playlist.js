import React, { Component } from 'react';
import './Playlist.css';


export default class Playlist extends Component {
  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'}/>
        {/* <TrackList /> */}
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    )
  }
}
