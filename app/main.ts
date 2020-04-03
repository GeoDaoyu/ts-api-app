import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import TianDiTuLayer from "utils/TianDiTuLayer";
import Basemap from "esri/Basemap";
import SpatialReference from "esri/geometry/SpatialReference";

const spatialReference = SpatialReference.WGS84;

// const webTileLayer = new TianDiTuLayer({
//   urlTemplate: "http://t0.tianditu.com/vec_w/wmts"
// } as TianDiTuLayer);

const webTileLayer = new TianDiTuLayer({
  urlTemplate: "http://t0.tianditu.com/img_c/wmts",
  spatialReference
} as TianDiTuLayer);

const basemap = new Basemap({
  baseLayers: [webTileLayer]
});

const map = new EsriMap({
  basemap
});

const view = new MapView({
  map,
  container: "viewDiv",
  center: [120, 32],
  zoom: 8
});

view.ui.remove("attribution");
