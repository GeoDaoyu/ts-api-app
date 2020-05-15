import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import Basemap from "esri/Basemap";
import BasemapGallery from "esri/widgets/BasemapGallery";
import LocalBasemapsSource from "esri/widgets/BasemapGallery/support/LocalBasemapsSource";
import BasemapGalleryViewModel from "esri/widgets/BasemapGallery/BasemapGalleryViewModel";
import domConstruct from "dojo/dom-construct";
import on from "dojo/on";

const map = new EsriMap({
  basemap: "topo"
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [120, 32],
  zoom: 8
});

const basemapGallery = new BasemapGallery({
  view: view,
  source: new LocalBasemapsSource({
    basemaps: [
      Basemap.fromId("topo"),
      Basemap.fromId("streets"),
      Basemap.fromId("satellite"),
      Basemap.fromId("hybrid"),
      Basemap.fromId("dark-gray")
    ]
   }),
});
view.ui.add(basemapGallery, "top-right");

const basemapGalleryViewModel = new BasemapGalleryViewModel({
  view: view,
  source: new LocalBasemapsSource({
    basemaps: [
      Basemap.fromId("topo"),
      Basemap.fromId("streets"),
      Basemap.fromId("satellite"),
      Basemap.fromId("hybrid"),
      Basemap.fromId("dark-gray")
    ]
   }),
})

const html = `<button id="btn" style="position: absolute; left: 50px; bottom: 50px">底图切换</button>`
domConstruct.place(html, view.container, "last");

const btn = document.getElementById("btn");
let i = 0;
on(btn, "click", () => {
  const len = basemapGalleryViewModel.source.basemaps.length;
  map.basemap = basemapGalleryViewModel.source.basemaps.getItemAt(++i % len);
});
