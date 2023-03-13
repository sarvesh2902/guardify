import React from "react";
import YouTube from "react-youtube";
  
export default class YoutubeVideo 
extends React.Component {
  render() {
    const opts = {
      height: "390",
      width: "550",
      playerVars: {
        autoplay: 1,
      },
    };
  
    return (
      <div className="flex justify-center">
        {/* <h3 flex >GeeksforGeeks - Youtube</h3> */}
        <YouTube videoId="asTti6y39xI" 
            opts={opts} onReady={this._onReady} />
      </div>
    );
  }
  
  _onReady(event) {
    event.target.pauseVideo();
  }
}