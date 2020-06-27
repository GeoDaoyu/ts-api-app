import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import CoordinateConversion from "esri/widgets/CoordinateConversion";
import domConstruct from "dojo/dom-construct";

const map = new EsriMap({
  basemap: "streets"
});

const view = new MapView({
  map,
  container: "viewDiv",
  center: [120.244, 31.052],
  zoom: 8
});

const ccWidget = new CoordinateConversion({
  view: view
});

view.ui.add(ccWidget, "bottom-left");

view.on(["click", "double-click"], function (e: __esri.MapViewClickEvent) {
  console.log(e);
  e.stopPropagation();
});
view.on("mouse-wheel", function (e: __esri.MapViewMouseWheelEvent) {
  console.log(e);
});

const html = `<div id="coordinate"></div>`;
domConstruct.place(html, view.container, "last");
view.on("pointer-move", function (e: __esri.MapViewPointerMoveEvent) {
  const point = view.toMap(e);
  const html = `
  <div id="coordinate"
      style="position: absolute; left: 15px; bottom: 100px; padding: 10px; background-color: #fff">
      X:${point.longitude.toFixed(6)}°,Y:${point.latitude.toFixed(6)}°
  </div>`;
  domConstruct.place(html, "coordinate", "replace");
});
