import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import TileLayer from "esri/layers/TileLayer";
import LayerList from "esri/widgets/LayerList";
import Expand from "esri/widgets/Expand";
import Swipe from "esri/widgets/Swipe";

import domConstruct from "dojo/dom-construct";
import on from "dojo/on";
import dom from "dojo/dom";

const map = new EsriMap({
  basemap: "satellite",
});

const infrared = new TileLayer({
  url:
    "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/WV03_Kilauea_20180519_ShortwaveInfrared/MapServer",
  maxScale: 3000,
});
map.add(infrared);

const nearInfrared = new TileLayer({
  url:
    "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/WV03_Kilauea_20180519_NearInfrared/MapServer",
  maxScale: 3000,
});
map.add(nearInfrared);

const view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 14,
  center: [-154.88, 19.46],
  constraints: {
    maxZoom: 17,
    minZoom: 8,
  },
});

// create a layerlist and expand widget and add to the view
const layerList = new LayerList({
  view: view,
});
const llExpand = new Expand({
  view: view,
  content: layerList,
  expanded: false,
});
view.ui.add(llExpand, "top-right");

// create a new Swipe widget
const swipe = new Swipe({
  leadingLayers: [infrared],
  trailingLayers: [nearInfrared],
  position: 35, // set position of widget to 35%
  view: view,
});

view.ui.add(swipe);

const html = `
  <div id="bar" class="esri-widget">
    <button
      id="exchange"
    >
      替换图层
    </button>
    <button
      id="destroy"
    >
      注销微件
    </button>
  </div>`;
domConstruct.place(html, view.container, "last");
view.ui.add("bar", "bottom-left");

on(dom.byId("exchange"), "click", () => {
  if (swipe) {
    swipe.leadingLayers.removeAll();
    swipe.leadingLayers.addMany([nearInfrared]);
    swipe.trailingLayers.removeAll();
    swipe.trailingLayers.addMany([infrared]);
  }
});

on(dom.byId("destroy"), "click", () => {
  swipe && swipe.destroy();
});
