const clientID = '71f1f3daefe64e5fadfc2efb9e38536d';
const redirectURI = 'http://localhost:3000/callback';
let accessToken;

const Spotify = {
  getAccessToken() {
    // return accessToken if present
    if (accessToken) {
      return accessToken;
    }
    //check for accessToken match in the URL
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    //if accessToken in the URL return accessToken
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      //redirect client to URL where they can retrieve the accessToken
      const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessURL;
    }
  },
  async search(term) {
    // need to check for access token with the method every time and save it to a new variable every time!
    const accessToken = Spotify.getAccessToken();
    try {
      // send the search term to spotify
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (response.ok) {
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks) {
          return [];
        }
        //map over the response to provide an object to app.js
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          })
        )
      }
    } catch(e) {
      console.log(e);
    }
  },
  async savePlaylist(playlistName, trackUris) {
    // needs both args
    if (!playlistName || !trackUris.length) {
      return;
    }
    //new accessToken again!
    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    let userId;
    try {
      //wait to recieve the userId
      const responseUser = await fetch('https://api.spotify.com/v1/me', {headers: headers})
      if (responseUser.ok) {
        const responseUserJson = await responseUser.json();
        // set user id
        userId = responseUserJson.id
        //use user id to post the new playlist to the playlists of the client
        const responsePlaylist = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({
            name: playlistName
          })
        })
        if (responsePlaylist.ok) {
          //if we created the playlist okay we can now post the tracks to it
          const responsePlaylistJson = await responsePlaylist.json();
          const playlistId = responsePlaylistJson.id
          const postPlaylist = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({uris: trackUris})
          })
          return postPlaylist;
        }      
      }
    } catch(e) {
      console.log(e);
    }
  }
}

export default Spotify;