const state = {
    albumsList: [{name: '', coverUrl: '', filesList: []}],
    currentAlbum: {name: '', coverUrl: '', filesList: []},
    filesList: [],
    queue:[],
    currentSongName: '',
    currentSongIndex: undefined,
    musicPlayer: null,
    currentlyPlaying: false,
    duration: "",
    currentTime: "",
    currentSong:{albumName:'', coverUrl:'', src:'', size:0}
}

export default state;
