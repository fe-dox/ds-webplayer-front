const getters = {
    getMusicPlayer: (state) => state.musicPlayer,
    getCurrentSongName: (state) => state.currentSongName,
    getCurrentSongIndex: (state) => state.currentSongIndex,
    getCurrentAlbum: (state) => state.currentAlbum,
    getAlbumsList: (state) => state.albumsList,
    getFilesList: (state) => state.filesList,
    getCurrentlyPlaying: (state) => state.currentlyPlaying,
    getDuration: (state) => state.duration,
    getCurrentTime: (state) => state.currentTime,
    getCurrentSong: (state) => state.currentSong,
    getQueue: (state) => state.queue,
}

export default getters;
