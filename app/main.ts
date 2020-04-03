import EsriMap from "esri/Map";
import SceneView from "esri/views/SceneView";
import Basemap from "esri/Basemap";
import TianDiTuLayer from "app/utils/TianDiTuLayer";
import SpatialReference from "esri/geometry/SpatialReference";
import domConstruct from "dojo/dom-construct";
import on from "dojo/on";

const basemap = new Basemap({
  baseLayers: [
    new TianDiTuLayer({
      urlTemplate: "http://t0.tianditu.com/vec_w/wmts",
    } as TianDiTuLayer)
  ]
});

const map = new EsriMap({
  basemap
});

const nextBasemap = new Basemap({
  baseLayers: [
    new TianDiTuLayer({
      urlTemplate: "http://t0.tianditu.com/img_c/wmts",
      spatialReference: SpatialReference.WGS84
    } as TianDiTuLayer)
  ]
});

const map2 = new EsriMap({
  basemap: nextBasemap
});

const view = new SceneView({
  map: map,
  container: "viewDiv",
  center: [120, 32],
  zoom: 8
});

const html = `<button id="btn" style="position: absolute; left: 50px; bottom: 50px">切换</button>`;
domConstruct.place(html, view.container, "last");

const btn = document.getElementById("btn");
on(btn, "click", () => {
  view.map = map2;
});

view.ui.remove("attribution");
