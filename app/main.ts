import EsriMap from "esri/Map";
import SceneView from "esri/views/SceneView";
import Basemap from "esri/Basemap";
import TianDiTuLayer from "app/utils/TianDiTuLayer";
import SpatialReference from "esri/geometry/SpatialReference";
import domConstruct from "dojo/dom-construct";
import on from "dojo/on";
import dom from "dojo/dom";

const mapWebMercator = new EsriMap({
  basemap: new Basemap({
    baseLayers: [
      new TianDiTuLayer({
        urlTemplate: "http://t0.tianditu.com/vec_w/wmts"
      } as TianDiTuLayer)
    ]
  })
});

const mapWGS84 = new EsriMap({
  basemap: new Basemap({
    baseLayers: [
      new TianDiTuLayer({
        urlTemplate: "http://t0.tianditu.com/img_c/wmts",
        spatialReference: SpatialReference.WGS84
      } as TianDiTuLayer)
    ]
  })
});

const view = new SceneView({
  map: mapWebMercator,
  container: "viewDiv"
});

const html = `<button id="btn" style="position: absolute; left: 50px; bottom: 50px">切换坐标</button>`;
domConstruct.place(html, view.container, "last");

const btn = dom.byId("btn");
let i = 0;
on(btn, "click", () => {
  view.map = (++i % 2 === 0) ? mapWebMercator : mapWGS84;
});

view.ui.remove("attribution");
