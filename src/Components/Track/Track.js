import React, { Component } from 'react'
import './Track.css'

export default class Track extends Component {
  renderAction() {
    if (isRemoval) {
      return (
        <button className="track-action">-</button>
      )
    } else {
      return (
        <button className="track-action">+</button>
      )    
    }
  }
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          {/* <h3><!-- track name will go here --></h3> */}
          {/* <p><!-- track artist will go here--> | <!-- track album will go here --></p> */}
        </div>
        {this.renderAction()}
      </div>
    )
  }
}
