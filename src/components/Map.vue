<template>
  <LMap
    id="map"
    ref="map"
    :maxBounds="imageBounds"
    :zoomControl="false"
    :options="leafletOptions"
  >
    <LImageOverlay :url="mapUrl" :bounds="imageBounds" />
    <LControl>
      <p @click="showAlert">Click me</p>
    </LControl>
    <LControlZoom position="bottomright" />
  </LMap>
</template>

<script>
import { LMap, LControl, LImageOverlay, LControlZoom } from "vue2-leaflet";
import { CRS } from "leaflet";
import useImage from "@/composables/useImage";

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
      mapObject: null,
      mapUrl: require("@/assets/map.jpg"),
      imageHeight: 100,
      imageWidth: 100,
    };
  },
  computed: {
    leafletOptions() {
      return {
        zoom: -2,
        minZoom: -2,
        maxZoom: 1,
        zoomControl: false,
        attributionControl: false,
        crs: CRS.Simple,
      };
    },
    imageBounds() {
      return [
        [0, 0],
        [this.imageHeight, this.imageWidth],
      ];
    },
  },
  async mounted() {
    const { getImageDimensions } = useImage();

    this.$nextTick(async () => {
      this.mapObject = this.$refs.map.mapObject;

      const { height, width } = await getImageDimensions(this.mapUrl);
      this.imageHeight = height;
      this.imageWidth = width;

      this.mapObject.setView([0, -height]);
    });
  },
  methods: {
    showAlert() {
      alert("Click!");
    },
  },
};
</script>

<style scoped lang="scss">
#map {
  height: 100vh;
  width: 100vw;
  background-color: #dddddd;
}
</style>
