<template>
  <div>
    <Menu />
    <SearchInput />
    <LMap
      id="map"
      ref="map"
      :maxBounds="imageBounds"
      :zoomControl="false"
      :options="leafletOptions"
    >
      <LImageOverlay :url="mapUrl" :bounds="imageBounds" />
      <LControlZoom position="bottomright" />
    </LMap>
  </div>
</template>

<script>
import { LMap, LImageOverlay, LControlZoom } from "vue2-leaflet";
import { CRS } from "leaflet";
import useImage from "@/composables/useImage";
import useDraw from "@/composables/useDraw";
import SearchInput from "./SearchInput.vue";
import Menu from "./Menu.vue";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw/dist/leaflet.draw.js";

export default {
  name: "MapComponent",
  components: {
    LMap,
    LImageOverlay,
    LControlZoom,
    SearchInput,
    Menu,
  },
  data() {
    return {
      mapObject: null,
      mapUrl: require("@/assets/ufscar.jpg"),
      imageHeight: 100,
      imageWidth: 100,
    };
  },
  computed: {
    leafletOptions() {
      return {
        zoom: -2,
        minZoom: -2,
        maxZoom: 4,
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
    const { setupDrawToolbar } = useDraw();

    this.$nextTick(async () => {
      this.mapObject = this.$refs.map.mapObject;

      const { height, width } = await getImageDimensions(this.mapUrl);
      this.imageHeight = height;
      this.imageWidth = width;

      this.mapObject.setView([0, height]);

      setupDrawToolbar(this.mapObject);
    });
  },
  methods: {},
};
</script>

<style scoped lang="css">
#map {
  height: 100vh;
  width: 100vw;
  background-color: #dddddd;
}
</style>
