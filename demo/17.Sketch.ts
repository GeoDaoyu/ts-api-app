import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import Sketch from "esri/widgets/Sketch";
import GraphicsLayer from "esri/layers/GraphicsLayer";

const layer = new GraphicsLayer();

const map = new EsriMap({
  basemap: "streets",
  layers: [layer],
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 5,
  center: [90, 45],
});

const sketch = new Sketch({
  layer: layer,
  view: view,
  // graphic will be selected as soon as it is created
  creationMode: "update",
});

view.ui.add(sketch, "top-right");
