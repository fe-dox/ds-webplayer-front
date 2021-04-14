const mutations = {

    ALBUMS_MUTATION(state, albums) {
        state.albumsList = albums
    },

    FILES_LIST_MUTATION(state, files) {
        state.filesList = files;
    },

    CURRENT_ALBUM_MUTATION(state, album) {
        state.currentAlbum = album;
        state.filesList = album.filesList
    },

    PLAY_SONG(state, {index, filesList}) {
        state.queue = filesList;
        state.currentSongName = filesList[index].src.split('/').pop();
        state.currentSongIndex = index;
        state.musicPlayer.PlayTrack(filesList[index].src)
        state.currentSong = filesList[index];
        state.currentlyPlaying = true;
    },

    SET_TIMER(state, {currentTime, duration}) {
        state.currentTime = currentTime;
        state.duration = duration;
    },

    CURRENT_SONG_INDEX_MUTATION(state, index) {
        state.currentSongIndex = index;
    },

    MUSIC_PLAYER_MUTATION(state, musicPlayer) {
        state.musicPlayer = musicPlayer;
    },

    CURRENTLY_PLAYING_MUTATION(state, currentlyPlaying) {
        if (state.currentSongIndex === undefined) {
            return;
        }
        if (currentlyPlaying) {
            state.musicPlayer.Play();
        } else {
            this.state.musicPlayer.Pause();
        }
        state.currentlyPlaying = currentlyPlaying;
    },

    ADD_SONG_TO_PLAYLIST(state, song) {
        state.albumsList[0].filesList.push(song);
    }

}

export default mutations
