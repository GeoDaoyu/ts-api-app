import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import VectorTileLayer from "esri/layers/VectorTileLayer";
import domConstruct from "dojo/dom-construct";
import on from "dojo/on";
import dom from "dojo/dom";

// load a new vector tile layer from JSON object
const vtLayer = new VectorTileLayer({
  style: {
    layers: [
      {
        layout: {},
        paint: {
          "fill-color": "#F0ECDB",
        },
        source: "esri",
        minzoom: 0,
        "source-layer": "Land",
        type: "fill",
        id: "Land/0",
      },
      {
        layout: {},
        paint: {
          "fill-pattern": "Landpattern",
          "fill-opacity": 1,
        },
        source: "esri",
        minzoom: 0,
        "source-layer": "Land",
        type: "fill",
        id: "Land/1",
      },
      {
        layout: {},
        paint: {
          "fill-color": "#93CFC7",
        },
        source: "esri",
        minzoom: 0,
        "source-layer": "Marine area",
        type: "fill",
        id: "Marine area/1",
      },
      {
        layout: {},
        paint: {
          "fill-pattern": "Marine area",
          "fill-opacity": 0.08,
        },
        source: "esri",
        "source-layer": "Marine area",
        type: "fill",
        id: "Marine area/2",
      },
      {
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#cccccc",
          "line-dasharray": [7, 5.33333],
          "line-width": 1,
        },
        source: "esri",
        minzoom: 1,
        "source-layer": "Boundary line",
        type: "line",
        id: "Boundary line/Admin0/0",
      },
      {
        layout: {
          "text-font": ["Risque Regular"],
          "text-anchor": "center",
          "text-field": "{_name_global}",
        },
        paint: {
          "text-halo-blur": 1,
          "text-color": "#AF420A",
          "text-halo-width": 1,
          "text-halo-color": "#f0efec",
        },
        source: "esri",
        "source-layer": "Continent",
        type: "symbol",
        id: "Continent",
      },
      {
        layout: {
          "text-font": ["Atomic Age Regular"],
          "text-field": "{_name}",
          "text-transform": "none",
        },
        paint: {
          "text-halo-blur": 1,
          "text-color": "#AF420A",
          "text-halo-width": 1,
          "text-halo-color": "#f0efec",
        },
        source: "esri",
        minzoom: 2,
        "source-layer": "Admin0 point",
        maxzoom: 10,
        type: "symbol",
        id: "Admin0 point/large",
      },
    ],
    glyphs:
      "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/resources/fonts/{fontstack}/{range}.pbf",
    version: 8,
    sprite:
      "https://www.arcgis.com/sharing/rest/content/items/7675d44bb1e4428aa2c30a9b68f97822/resources/sprites/sprite",
    sources: {
      esri: {
        url:
          "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer",
        type: "vector",
      },
    },
  },
});

const map = new EsriMap({
  basemap: {
    baseLayers: [vtLayer],
  },
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [38.5795, 39.8282],
  zoom: 2,
});

const html = `
  <div id="topbar" class="esri-widget">
    <button
      id="layoutButton"
    >
      注记大小写
    </button>
    <button
      id="paintButton"
    >
      河流颜色
    </button>
    <button
      id="paintButton2"
    >
      土地填充
    </button>
  </div>`;
domConstruct.place(html, view.container, "last");

on(dom.byId("layoutButton"), "click", () => {
  const layerId = "Admin0 point/large";
  // get the layout properties for the Admin0 point/large layer
  const layoutProperties = vtLayer.getLayoutProperties(layerId);

  // change the text-transform layout property
  layoutProperties["text-transform"] =
    layoutProperties["text-transform"] == "uppercase" ? "none" : "uppercase";
  vtLayer.setLayoutProperties(layerId, layoutProperties);
});

on(dom.byId("paintButton"), "click", () => {
  const layerId = "Marine area/1";
  // get the paint properties for the marine area/1 layer
  const paintProperties = vtLayer.getPaintProperties(layerId);

  // change the fill-color paint property for the layer.
  paintProperties["fill-color"] =
    paintProperties["fill-color"] == "#93CFC7" ? "#0759C1" : "#93CFC7";
  vtLayer.setPaintProperties(layerId, paintProperties);
});

on(dom.byId("paintButton2"), "click", () => {
  const layerId = "Land/1";
  const paintProperties = vtLayer.getPaintProperties(layerId);

  paintProperties["fill-pattern"] =
    paintProperties["fill-pattern"] == "Landpattern" ? "Special area of interest/Sand" : "Landpattern";
  vtLayer.setPaintProperties(layerId, paintProperties);
});

view.ui.add("topbar", "bottom-left");
