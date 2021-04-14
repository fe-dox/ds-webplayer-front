import axios from 'axios'
import querystring from 'querystring';

const actions = {
    async fetchAlbums({commit}) {
        let response = await axios.post("http://localhost:3000/albums", querystring.stringify({albums: true}))
        let playlistResponse = await axios.get("http://localhost:3000/playlist")
        console.log([...playlistResponse.data,...response.data])
        let playlist = {
            coverUrl:"http://localhost:3000/static/playlist-cover.jpg",
            filesList: playlistResponse.data,
        }
        console.log(playlist)
        commit("ALBUMS_MUTATION", [playlist ,...response.data])
        commit("CURRENT_ALBUM_MUTATION", response.data[0])
    },
}

export default actions
