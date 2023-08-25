<template>
  <div>
    <LMap
      :zoom="zoom"
      :maxBounds="imageBounds"
      :zoomControl="false"
      style="height: 500px; width: 100%"
    >
      <LImageOverlay :url="url" :bounds="imageBounds" />
      <LControl class="example-custom-control">
        <p @click="showAlert">Click me</p>
      </LControl>
      <!-- <LControl position="bottomleft" class="custom-control-watermark">
        Vue2Leaflet Watermark Control
      </LControl> -->
      <LControlZoom position="bottomright" :style="zoomControlStyle" />
    </LMap>
  </div>
</template>

<script>
import { LMap, LControl, LImageOverlay, LControlZoom } from "vue2-leaflet";

export default {
  name: "MapComponent",
  components: {
    LMap,
    LControl,
    LImageOverlay,
    LControlZoom,
  },
  data() {
    return {
      zoom: 2,
      center: [0, 0],
      url: require("@/assets/map.jpg"),
      attribution: "",
      imageBounds: [
        [0, 0],
        [100, 140],
      ],
      zoomControlStyle: {
        backgroundColor: "#ff9900", // Altere para a cor desejada
        color: "white",
      },
    };
  },
  methods: {
    showAlert() {
      alert("Click!");
    },
  },
};
</script>

<style>
.example-custom-control {
  background: #fff;
  padding: 0 0.5em;
  border: 1px solid #aaa;
  border-radius: 0.1em;
}
.custom-control-watermark {
  font-size: 200%;
  font-weight: bolder;
  color: #aaa;
  text-shadow: #555;
}

::deep .leaflet-control-zoom-in {
  background-color: #ff9900; /* Altere para a cor desejada */
  color: white;
}
</style>
