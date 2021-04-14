<template>
  <div class="songsList">
    <h1>Songs List</h1>
    <table>
      <tr :key="index" v-for="(song, index) in this.$store.getters.getFilesList">
        <td>{{ song.albumName }}</td>
        <td>{{ song.src.split("/").pop() }}</td>
        <td> {{ song.size }}MB</td>
        <td @click="playFromList(index,$store.getters.getFilesList)">
          <ClickableIcon
              :icon-name="$store.getters.getCurrentSong.src !== '' && $store.getters.getCurrentSong.src === $store.getters.getFilesList[index].src && $store.getters.getCurrentlyPlaying ? 'pause':'play_arrow'"/>
        </td>
        <td @click="addToPlaylist(index, $store.getters.getFilesList)">
          <ClickableIcon icon-name="playlist_add"/>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import ClickableIcon from "@/components/ClickableIcon";
import axios from "axios";
import querystring from "querystring";

export default {
  name: "SongsListView",
  components: {ClickableIcon},
  methods: {
    addToPlaylist:async function(index,filesList){
      await axios.post("http://localhost:3000/playlist", querystring.stringify(filesList[index]))
      this.$store.commit("ADD_SONG_TO_PLAYLIST", filesList[index]);
    },
    playFromList: function (index, filesList) {
      let currentSong = this.$store.getters.getCurrentSong;
      let currentlyVisibleFilesList = this.$store.getters.getFilesList;
      if (currentSong.src !== '' && currentSong.src === currentlyVisibleFilesList[index].src) {
        if (this.$store.getters.getCurrentlyPlaying){
          this.$store.commit("CURRENTLY_PLAYING_MUTATION", false)
        }else{
          this.$store.commit("CURRENTLY_PLAYING_MUTATION", true)
        }
      }else{
        this.$store.commit("PLAY_SONG", {index, filesList});
      }
    }

  }
}
</script>

<style scoped>

.songsList {
  flex: 1 1 auto;
  padding-left: 2%;
  padding-bottom: 70px;
}
@media (max-width: 1024px) {
  .songsList{
    padding-bottom: 130px;
  }
}

table {
  border: 1px solid #bfbfbf;
  border-collapse: collapse;
}
</style>
