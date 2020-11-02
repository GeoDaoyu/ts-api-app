import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import FeatureLayer from "esri/layers/FeatureLayer";
import Legend from "esri/widgets/Legend";

const featureLayer = new FeatureLayer({
  url:
    "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/NY%20Educational%20Attainment/FeatureServer/0",
});

const map = new EsriMap({
  basemap: "dark-gray",
  layers: [featureLayer],
});

const view = new MapView({
  container: "viewDiv",
  map: map
});

view.when(() => {
  const legend = new Legend({
    view: view,
    layerInfos: [
      {
        layer: featureLayer,
        title: "Legend",
        hideLayers: []
      },
    ],
  });

  view.ui.add(legend, "bottom-right");
});
