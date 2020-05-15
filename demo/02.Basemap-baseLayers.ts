import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import Basemap from "esri/Basemap";
import TileLayer from "esri/layers/TileLayer";

const tileLayer = new TileLayer({
  url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer"
});

const basemap = new Basemap({
  baseLayers: [tileLayer]
});

const map = new EsriMap({
  basemap
});

const view = new MapView({
  map,
  container: "viewDiv",
  center: [-118.244, 34.052],
  zoom: 12
});
