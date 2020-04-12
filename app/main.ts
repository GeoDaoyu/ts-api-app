import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import Basemap from "esri/Basemap";
import TianDiTuLayer from "app/utils/TianDiTuLayer";
import GroupLayer from "esri/layers/GroupLayer";
import BasemapLayerList from "esri/widgets/BasemapLayerList";
import domConstruct from "dojo/dom-construct";
import on from "dojo/on";
import query from "dojo/query";

const basemapConfig = [
  {
    title: "矢量",
    layers: [
      "http://t0.tianditu.com/vec_w/wmts",
      "http://t0.tianditu.com/cva_w/wmts",
    ],
  },
  {
    title: "影像",
    layers: [
      "http://t0.tianditu.com/img_w/wmts",
      "http://t0.tianditu.com/cia_w/wmts",
    ],
  },
  {
    title: "地形",
    layers: [
      "http://t0.tianditu.com/ter_w/wmts",
      "http://t0.tianditu.com/cta_w/wmts",
    ],
  },
  {
    title: "全球境界",
    layers: ["http://t0.tianditu.com/ibo_w/wmts"],
  },
].reverse();

const baseLayers = basemapConfig.map((item) => {
  return new GroupLayer({
    layers: item.layers.map((value) => {
      return new TianDiTuLayer({
        urlTemplate: value,
        title: value.split("/")[3]
      } as TianDiTuLayer);
    }),
    title: item.title,
  });
});

const basemap = new Basemap({
  baseLayers,
});

const map = new EsriMap({
  basemap,
});

const view = new MapView({
  map,
  container: "viewDiv",
  center: [120, 32],
  zoom: 8
});

const basemapLayerList = new BasemapLayerList({
  view,
});

view.ui.add(basemapLayerList, "top-right");

view.ui.remove("attribution");

let checkboxList = ``;
basemapConfig.forEach((v, i) => {
  checkboxList = `<input type="checkbox" value="${i}" checked>${v.title}<br />` + checkboxList;
});
let html = `<div style="position: absolute; left: 50px; bottom: 50px">
              ${checkboxList}
            </div>`;
domConstruct.place(html, view.container, "last");

const checkboxes = query("input[type=checkbox]");
on(checkboxes, "click", function () {
  const checked = this.checked;
  const index = +this.value;
  const layer = map.basemap.baseLayers.getItemAt(index);
  layer.visible = checked;
});
