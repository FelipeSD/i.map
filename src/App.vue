<template>
  <div id="app">
    <Map />
  </div>
</template>

<script>
import Map from "./components/Map.vue";

export default {
  name: "App",
  components: { Map },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
