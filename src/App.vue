<template>
  <div id="app">
    <div class="main-ui">
      <AlbumsListView/>
      <SongsListView/>
    </div>
    <ControlsBar></ControlsBar>
  </div>
</template>

<script>

import AlbumsListView from "@/components/AlbumsListView";
import ControlsBar from "@/components/ControlsBar";
import SongsListView from "@/components/SongsListView";

export default {
  name: 'App',
  components: {AlbumsListView, ControlsBar, SongsListView},
  mounted() {
    this.$store.dispatch("fetchAlbums");
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');

body {
  height: calc(100% - 70px);
  background: #4c4c4c;
  color: #c6c6c6;
  font-family: 'Comfortaa', cursive;
}

.main-ui {
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  width: 100%;
  height: calc(100% - 70px);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
}

@font-face {
  font-family: 'Material Icons Round';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialiconsround/v53/LDItaoyNOAY6Uewc665JcIzCKsKc_M9flwmP.woff2) format('woff2');
}

.material-icons-round {
  font-family: 'Material Icons Round', fantasy;
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

</style>
