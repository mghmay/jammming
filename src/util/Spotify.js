
const clientID = '71f1f3daefe64e5fadfc2efb9e38536d'; // Insert client ID here.
const redirectURI = 'http://localhost:3000'
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      let expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessURL;
    }
  },
  async search(term) {
    const baseURI = 'https://api.spotify.com/v1/search?type=TRACK&q=';
    try {
      const response = await fetch(`${baseURI}${term}`, {
        headers: {Authorization: `Bearer ${accessToken}`}
      })
      const responseJSON = await response.json();
      if (responseJSON.length === 0) {
        return [];
      }
      return responseJSON.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artist,
          album: track.album,
          uri: track.uri
      }))
    } catch(e) {
      console.log(e);
      throw new Error("Sorry, your request can't be processed right now. Please try again later");
    }
    
  }
}

export default Spotify;