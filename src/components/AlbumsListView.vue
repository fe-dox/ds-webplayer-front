<template>
  <div><h1>Library</h1>
    <div class="albumsList">
      <div class="album" :key="i" v-for="(album,i) in albums" @click="chooseAlbum(i)">
        <img
            :src="album.coverUrl !== ''&&album.coverUrl!==undefined ? album.coverUrl : 'http://localhost:3000/static/default-cover.jpg'"
            alt="Album cover" width="120" height="120">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlbumsListView",
  methods: {
    chooseAlbum: function (index) {
      this.$store.commit("CURRENT_ALBUM_MUTATION", this.$store.getters.getAlbumsList[index])
    }
  },
  computed: {
    albums() {
      return this.$store.getters.getAlbumsList;
    }
  },
}


</script>

<style scoped>
.albumsList {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
}


@media (max-width: 1024px) {
  .albumsList {
    flex-direction: row;
  }
}
</style>
