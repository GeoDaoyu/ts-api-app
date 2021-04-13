import SceneView from "esri/views/SceneView";
import EsriMap from "esri/Map";
import FeatureLayer from "esri/layers/FeatureLayer";
import { Polygon } from "esri/geometry";
import { SimpleFillSymbol } from "esri/symbols";
import SimpleRenderer from "esri/renderers/SimpleRenderer";
import on from "dojo/on";
import dom from "dojo/dom";
import domConstruct from "dojo/dom-construct";
import LayerList from "esri/widgets/LayerList";

const map = new EsriMap({
  basemap: "gray",
});

const view = new SceneView({
  map,
  container: "viewDiv",
  center: [-80, 35],
  zoom: 4,
});

const ids = ["0", "1", "x", "3", "4"];

const createPolygonLayer = (id: string) => {
  return new FeatureLayer({
    id,
    title: id,
    opacity: id === 'x' ? 1 : 0.5,
    fields: [
      {
        name: "ObjectID",
        alias: "ObjectID",
        type: "oid",
      },
    ],
    elevationInfo: {
      mode: "on-the-ground",
    },
    source: [
      {
        geometry: new Polygon({
          rings: [
            [
              [-64.78, 32.3],
              [-66.07, 18.45],
              [-80.21, 25.78],
              [-64.78, 32.3],
            ],
          ],
        }),
        attributes: {
          ObjectID: 1,
        },
      },
    ],
    renderer: new SimpleRenderer({
      symbol: new SimpleFillSymbol({
        color: id === 'x' ? [0, 0, 0, 1] : [255, 255, 255, 1],
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
      }),
    }),
  });
};
ids.forEach((id) => {
  const layer = createPolygonLayer(id);
  map.add(layer);
});

var layerList = new LayerList({
  view: view,
});
view.ui.add(layerList, "top-left");

const html = `
  <div id="bar" class="esri-widget">
    <button
      id="change"
    >
      改变图层顺序
    </button>
  </div>`;
domConstruct.place(html, view.container, "last");
view.ui.add("bar", "bottom-left");
let i = 2;
on(dom.byId("change"), "click", () => {
  const layer = view.map.findLayerById("x");
  view.map.reorder(layer, ++i % 5);
});
