<template>
  <div>
    <input type="range" min="0" @mouseup="onMouseUp" @mousedown="onMouseDown" @input="changeMusicProgress" :value="rangeValue"
           max="1000"
           name="progress"
           class="slider">
    <div class="controls-bar">
      <div class="controls">
        <span @click="skipPrevious"><ClickableIcon icon-name="skip_previous"/></span>
        <span @click="togglePlay"><ClickableIcon class="play-button" :icon-name="this.$store.getters.getCurrentlyPlaying ? 'pause':'play_arrow'"/></span>
        <span @click="skipNext"><ClickableIcon icon-name="skip_next"/></span>
      </div>
      <div class="time">
        <p>{{ this.$store.getters.getCurrentTime }} / {{ this.$store.getters.getDuration }}</p>
      </div>
      <div class="info">
        <div class="info-data"><img
            :src="this.$store.getters.getCurrentSong.coverUrl != '' && this.$store.getters.getCurrentSong.coverUrl != undefined ? this.$store.getters.getCurrentSong.coverUrl : 'http://localhost:3000/static/default-cover.jpg'"
            height="40" width="40"
            alt="Cover image">
          <p class="h1">
            {{ this.$store.getters.getCurrentSongName.slice(0, this.$store.getters.getCurrentSongName.length - 4) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ClickableIcon from "@/components/ClickableIcon";
import MusicPlayer from "@/MusicPlayer";

export default {
  name: "ControlsBar",
  components: {ClickableIcon},
  data() {
    return {
      rangeValue: 0,
      musicPlayer: undefined,
      wasPlaying: false,
    }
  },
  methods: {
    togglePlay: function () {
      this.$store.commit("CURRENTLY_PLAYING_MUTATION", !this.$store.getters.getCurrentlyPlaying)
    },
    onMouseDown: function () {
      this.wasPlaying = this.$store.getters.getCurrentlyPlaying;
      if (this.wasPlaying) this.$store.commit("CURRENTLY_PLAYING_MUTATION", false);
    },
    onMouseUp:function (){
      if (this.wasPlaying) this.$store.commit("CURRENTLY_PLAYING_MUTATION", true);
    },
    changeMusicProgress: function (e) {
      this.musicPlayer.currentTime = e.target.value;
      this.$store.commit("SET_TIMER", {currentTime: this.musicPlayer.currentTime, duration: this.musicPlayer.duration});
    },
    skipPrevious: function () {
      let queue = this.$store.getters.getQueue;
      let currentSongId = this.$store.getters.getCurrentSongIndex;

      if (currentSongId - 1 < 0) {
        this.$store.commit("CURRENTLY_PLAYING_MUTATION", false);
        return;
      }
      this.$store.commit("PLAY_SONG", {index: currentSongId - 1, filesList: queue})
    },
    skipNext: function () {
      let queue = this.$store.getters.getQueue;
      let currentSongId = this.$store.getters.getCurrentSongIndex;

      if (currentSongId + 1 >= queue.length) {
        this.$store.commit("CURRENTLY_PLAYING_MUTATION", false);
        return;
      }
      this.$store.commit("PLAY_SONG", {index: currentSongId + 1, filesList: queue});
    },
  },
  mounted() {
    this.musicPlayer = new MusicPlayer();
    this.$store.commit("MUSIC_PLAYER_MUTATION", this.musicPlayer);
    this.musicPlayer.OnFinishedPlayback(() => this.skipNext())
    this.musicPlayer.OnTimeUpdated(() => {
      this.$store.commit("SET_TIMER", {currentTime: this.musicPlayer.currentTime, duration: this.musicPlayer.duration});
      this.rangeValue = this.musicPlayer.sliderValue;
    })
  }
}
</script>

<style scoped>

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
  position: fixed;
  bottom: 60px;
  left: 0;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  background: #af4c4c;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 10px;
  height: 10px;
  background: #af4c4c;
  cursor: pointer;
}

.controls-bar {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #3d3d3d;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}

@media (max-width: 1024px) {
  .controls-bar{
    height: 130px;
    flex-wrap: wrap;
    flex-direction: column;
  }
  .slider{
    bottom:130px;
  }
}

.controls {
  flex-grow: 1;
}

.time {
  flex-grow: 1;
}

.info {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-grow: 50;
}

.info-data {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.info-data img {
  padding-right: 5px;
}

.h1 {
  font-size: 1rem;
  font-weight: bold;
}

.play-button {
  padding-left: 13px;
  padding-right: 10px;
  fill: #42b983;
}

a {
  color: inherit;
  text-decoration: inherit;
}

a:hover {
  color: inherit;
  text-decoration: inherit;
}

a:active {
  color: inherit;
  text-decoration: inherit;
}

a:visited {
  color: inherit;
  text-decoration: inherit;
}
</style>
