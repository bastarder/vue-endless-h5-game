<template>
  <div class="game-map-active">
    <h1>{{ map.name }}</h1>
  </div>
</template>

<script>

export default {
  data () {
    return {
      map : {}
    }
  },
  created (){
    console.log()
    this.map = this.$store.state.EVENT_MAP_DATA;
  },
  methods : {
  }
}

</script>

<style>

</style>
