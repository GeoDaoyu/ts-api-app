import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import Draw from "esri/views/draw/Draw";
import Graphic from "esri/Graphic";
import Polyline from "esri/geometry/Polyline";
import SimpleLineSymbol from "esri/symbols/SimpleLineSymbol";
import domConstruct from "dojo/dom-construct";

const map = new EsriMap({
  basemap: "gray"
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 16,
  center: [18.06, 59.34]
});

const html = `
  <div
    id="line-button"
    class="esri-widget esri-widget--button
    esri-interactive"
    title="画线"
    >
    <span class="esri-icon-polyline"></span>
  </div>`;
domConstruct.place(html, view.container, "last");
// add the button for the draw tool
view.ui.add(["line-button"], "top-left");

const draw = new Draw({
  view: view
});

// draw polyline button
document.getElementById("line-button").onclick = function() {
  view.graphics.removeAll();

  // creates and returns an instance of PolyLineDrawAction
  const action = draw.create("polyline");

  // focus the view to activate keyboard shortcuts for sketching
  view.focus();

  // listen polylineDrawAction events to give immediate visual feedback
  // to users as the line is being drawn on the view.
  action.on(
    [
      "vertex-add",
      "vertex-remove",
      "cursor-update",
      "redo",
      "undo",
      "draw-complete"
    ],
    createLine
  );
};

interface DrawActionEvent {
  defaultPrevented: boolean;
  preventDefault: Function;
  vertexIndex: number;
  vertices: number[][];
}

function createLine(event: DrawActionEvent) {
  view.graphics.removeAll();

  const vertices = event.vertices;

  const graphic = new Graphic({
    geometry: new Polyline({
      paths: [vertices],
      spatialReference: view.spatialReference
    }),
    symbol: new SimpleLineSymbol({
      color: [4, 90, 141],
      width: 4,
      cap: "round",
      join: "round"
    })
  });

  view.graphics.add(graphic);
}
