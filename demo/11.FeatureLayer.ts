import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import FeatureLayer from "esri/layers/FeatureLayer";
import SpatialReference from "esri/geometry/SpatialReference";

const map = new EsriMap({
  basemap: "hybrid",
});

const view = new MapView({
  map,
  container: "viewDiv",
  extent: {
    xmin: -9177811,
    ymin: 4247000,
    xmax: -9176791,
    ymax: 4247784,
    spatialReference: SpatialReference.WebMercator,
  },
  popup: {
    defaultPopupTemplateEnabled: true,
  },
});

const featureLayer = new FeatureLayer({
  url:
    "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0",
});

map.add(featureLayer);
