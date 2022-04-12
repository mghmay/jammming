import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

export default class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {/* the below code collects all of the props from the above modules and
        iterates over the array of tracks returned from search to pass them all as props
        to the tracks component
         */}
        {
          this.props.tracks.map(track => {
            return <Track track={track}
                    key={track.id}
                    onAdd={this.props.onAdd}
                    onRemove={this.props.onRemove}
                    isRemoval={this.props.isRemoval} />
          })   
        }
      </div>
    )
  }
}
