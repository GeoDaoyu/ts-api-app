import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import WebTileLayer from "esri/layers/WebTileLayer";
import TileInfo from "esri/layers/support/TileInfo";
import SpatialReference from "esri/geometry/SpatialReference";
import BasemapToggle from "esri/widgets/BasemapToggle";

const spatialReference = SpatialReference.WebMercator;

const tileInfo = new TileInfo({
  dpi: 90.71428571427429,
  lods: [{
    level: 0,
    scale: 591657527.591555,
    resolution: 156543.033928
  },
  {
    level: 1,
    scale: 295828763.795777,
    resolution: 78271.5169639999
  },
  {
    level: 2,
    scale: 147914381.897889,
    resolution: 39135.7584820001
  },
  {
    level: 3,
    scale: 73957190.948944,
    resolution: 19567.8792409999
  },
  {
    level: 4,
    scale: 36978595.474472,
    resolution: 9783.93962049996
  },
  {
    level: 5,
    scale: 18489297.737236,
    resolution: 4891.96981024998
  },
  {
    level: 6,
    scale: 9244648.868618,
    resolution: 2445.98490512499
  },
  {
    level: 7,
    scale: 4622324.434309,
    resolution: 1222.99245256249
  },
  {
    level: 8,
    scale: 2311162.217155,
    resolution: 611.49622628138
  },
  {
    level: 9,
    scale: 1155581.108577,
    resolution: 305.748113140558
  },
  {
    level: 10,
    scale: 577790.554289,
    resolution: 152.874056570411
  },
  {
    level: 11,
    scale: 288895.277144,
    resolution: 76.4370282850732
  },
  {
    level: 12,
    scale: 144447.638572,
    resolution: 38.2185141425366
  },
  {
    level: 13,
    scale: 72223.819286,
    resolution: 19.1092570712683
  },
  {
    level: 14,
    scale: 36111.909643,
    resolution: 9.55462853563415
  },
  {
    level: 15,
    scale: 18055.954822,
    resolution: 4.77731426794937
  },
  {
    level: 16,
    scale: 9027.977411,
    resolution: 2.38865713397468
  },
  {
    level: 17,
    scale: 4513.988705,
    resolution: 1.19432856685505
  },
  {
    level: 18,
    scale: 2256.994353,
    resolution: 0.597164283559817
  },
  {
    level: 19,
    scale: 1128.497176,
    resolution: 0.298582141647617
  }],
  size: [256, 256],
  origin: {
    x: -20037508.342787,
    y: 20037508.342787
  },
  spatialReference
});

const webTileLayer = new WebTileLayer({
  urlTemplate:
    "http://{subDomain}.tianditu.com/vec_w/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=vec&STYLE=default&FORMAT=tiles&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=ac0daf56728bbb77d9514ba3df69bcd3",
  subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
  tileInfo: tileInfo,
  spatialReference
} as WebTileLayer);

const map = new EsriMap({
  basemap: {
    thumbnailUrl: "https://geodaoyu.arcgisonline.cn/arcgis/api/4.14/esri/images/basemap/gray.jpg",
    baseLayers: [webTileLayer]
  }
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [120, 32],
  zoom: 8
});

const basemapToggle = new BasemapToggle({
  view: view, 
  nextBasemap: "hybrid"
});

view.ui.add(basemapToggle, "bottom-left");

view.ui.remove("attribution");
