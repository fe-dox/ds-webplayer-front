<template>
  <span class="material-icons-round">{{ iconName }}</span>
</template>

<script>
export default {
  name: "ClickableIcon",
  props: {
    iconName: String,
  }
}
</script>

<style scoped>
.material-icons-round {
  transition: color 0.1s ease-out;
  cursor: pointer;
}

.material-icons-round:hover {
  color: #42b983;
}
</style>
