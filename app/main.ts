import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import Graphic from "esri/Graphic";
import Polyline from "esri/geometry/Polyline";
import SimpleLineSymbol from "esri/symbols/SimpleLineSymbol";
import domConstruct from "dojo/dom-construct";
import on from "dojo/on";
import dom from "dojo/dom";

const map = new EsriMap({
  basemap: "hybrid",
});

const view = new MapView({
  center: [-80, 35],
  container: "viewDiv",
  map: map,
  zoom: 3,
});

const polyline = new Polyline({
  paths: [
    [
      [-111.3, 52.68],
      [-98, 49.5],
      [-93.94, 29.89],
    ],
  ],
});

function createRailwayLine(polyline: Polyline): Graphic[] {
  const width = 5;
  return [
    new Graphic({
      geometry: polyline,
      symbol: new SimpleLineSymbol({
        cap: "butt",
        join: "round",
        color: [0, 0, 0],
        width: width,
      }),
    }),
    new Graphic({
      geometry: polyline,
      symbol: new SimpleLineSymbol({
        style: "dash",
        cap: "butt",
        join: "round",
        color: [255, 255, 255],
        width: width - 2,
      }),
    }),
  ];
}

const railwayLine = createRailwayLine(polyline);

view.graphics.addMany(railwayLine);

const html = `
  <div id="widget" class="esri-widget">
    <button
      id="btn"
    >
      对比线
    </button>
  </div>`;
domConstruct.place(html, view.container, "last");

on(dom.byId("btn"), "click", () => {
  view.graphics.addMany([
    new Graphic({
      geometry: new Polyline({
        paths: [
          [
            [-110.3, 53.68],
            [-97, 50.5],
            [-92.94, 30.89],
          ],
        ],
      }),
      symbol: new SimpleLineSymbol({
        cap: "butt",
        join: "round",
        color: [0, 0, 0],
        width: 5,
      }),
    }),
    new Graphic({
      geometry: new Polyline({
        paths: [
          [
            [-112.3, 51.68],
            [-99, 48.5],
            [-94.94, 28.89],
          ],
        ],
      }),
      symbol: new SimpleLineSymbol({
        style: "dash",
        cap: "butt",
        join: "round",
        color: [255, 255, 255],
        width: 5,
      }),
    }),
  ]);
});

view.ui.add("widget", "bottom-left");