import { FeatureGroup, Control } from "leaflet";

export default function useDraw () {
  const drawnItems = new FeatureGroup();

  const toolbarOptions = {
    draw: {
      polygon: true,
      polyline: false,
      rectangle: false,
      circle: false,
      marker: false,
      circlemarker: false,
    },
    position: "bottomleft",
    edit: {
      featureGroup: drawnItems,
    },
  }

  function setDrawToolbar (mapObject) {
    mapObject.addLayer(drawnItems);

    const drawControl = new Control.Draw(toolbarOptions);

    mapObject.addControl(drawControl);

    mapObject.on("draw:created", function (e) {
      const layer = e.layer;

      drawnItems.addLayer(layer);
      const geojson = drawnItems.toGeoJSON();
      console.log(geojson);

      layer.on("click", function () {
        console.log("Camada clicada:", layer);
        console.log(geojson);

        layer.setStyle({
          color: 'blue', // Cor do contorno
          fillColor: 'yellow' // Cor do preenchimento
        });
      });
    });

    mapObject.on("draw:deleted", function (e) {
      console.log("e", e);
    });

    mapObject.on("draw:drawstart", function (e) {
      console.log("inicia desenho", e);
    });
  }

  return {
    drawnItems,
    setDrawToolbar
  }
}