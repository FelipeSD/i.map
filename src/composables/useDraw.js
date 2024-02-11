import L from 'leaflet';

export default function useDraw () {
  const groupsMap = new Map(); // Mapa para armazenar os grupos

  // Função para configurar o toolbar de desenho no mapa
  function setupDrawToolbar (mapObject) {
    const toolbarOptions = {
      draw: {
        polygon: {
          title: 'Draw a polygon!', // Título do botão do polígono
          allowIntersection: false, // Permitir interseção
          showArea: true, // Exibir área
          metric: false, // Unidades métricas
          repeatMode: false // Modo de repetição
        },
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false,
        circlemarker: false,
      },
      position: "bottomleft",
      edit: {
        featureGroup: L.featureGroup([...groupsMap.values()]),
      },
    };

    const drawControl = new L.Control.Draw(toolbarOptions);

    mapObject.addControl(drawControl);

    mapObject.on("draw:drawstart", (e) => {
      console.log("draw", e)
    });

    mapObject.on("draw:created", function (e) {
      addDrawnItemToMap(mapObject, 'Grupo', e.layer)
      // layer.on("click", function () {
      //   console.log("Camada clicada:", layer);
      //   console.log(geojson);

      //   layer.setStyle({
      //     color: 'blue', // Cor do contorno
      //     fillColor: 'yellow' // Cor do preenchimento
      //   });
      // });
    });
  }

  function addDrawnItemToMap (mapObject, groupName, layer) {
    const featureGroup = groupsMap.get(groupName);
    if (featureGroup) {
      featureGroup.addLayer(layer);
    } else {
      addFeatureGroup(mapObject, groupName, layer);
    }
    updateGeoJSON()
  }

  function addFeatureGroup (mapObject, groupName, layer) {
    const featureGroup = new L.FeatureGroup();
    featureGroup.addLayer(layer);
    groupsMap.set(groupName, featureGroup);
    mapObject.addLayer(featureGroup);
  }

  function updateGeoJSON () {
    const geojson = L.featureGroup([...groupsMap.values()]).toGeoJSON();
    console.log('map', groupsMap);

    console.log(geojson);
    return geojson;
  }

  return {
    setupDrawToolbar,
    updateGeoJSON
  };
}
