import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import ScaleBar from "esri/widgets/ScaleBar";
import ScaleRangeSlider from "esri/widgets/ScaleRangeSlider";
import FeatureLayer from "esri/layers/FeatureLayer";
import SpatialReference from "esri/geometry/SpatialReference";

const featureLayer = new FeatureLayer({
  url:
    "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0",
});

const map = new EsriMap({
  basemap: "hybrid",
  layers: [featureLayer],
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
});

var scaleBar = new ScaleBar({
  view: view,
  unit: "dual",
});
view.ui.add(scaleBar, "bottom-left");


const scaleRangeSlider = new ScaleRangeSlider({
  view: view,
  layer: featureLayer,
  region: "US",
});
view.ui.add(scaleRangeSlider, "bottom-right");

scaleRangeSlider.watch(["minScale", "maxScale"], function (
  value,
  oldValue,
  name
) {
  // to update the layer min/max scale based on the slider
  featureLayer[name] = value;
  // to goTo the scale
  view.goTo({
    scale: value,
    center: view.center
  });
});
