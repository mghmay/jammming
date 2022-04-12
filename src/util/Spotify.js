const clientID = '71f1f3daefe64e5fadfc2efb9e38536d';
const redirectURI = 'http://localhost:3000/callback';
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    //check for accessToken match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessURL;
    }
  },
  async search(term) {
    accessToken = Spotify.getAccessToken();
    try {
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
    if (!playlistName || !trackUris.length) {
      return;
    }
    accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    }
    let userId;
    try {
      const responseUser = await fetch(`'https://api.spotify.com/v1/me'`, {headers: headers})
      if (responseUser.ok) {
        const responseUserJson = await responseUser.json();
        userId = responseUserJson.id
        const responsePlaylist = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({
            name: playlistName
          })
        })
        if (responsePlaylist.ok) {
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
      throw new Error("Sorry, your request can't be processed right now. Please try again later");
    }
  }
}

export default Spotify;