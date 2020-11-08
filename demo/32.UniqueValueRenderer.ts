import FeatureLayer from "esri/layers/FeatureLayer";
import EsriMap from "esri/Map";
import { SimpleRenderer, UniqueValueRenderer } from "esri/renderers";
import { SimpleFillSymbol, SimpleLineSymbol } from "esri/symbols";
import MapView from "esri/views/MapView";
import Legend from "esri/widgets/Legend";

// Symbol for freeways
const fwySym = {
  type: "simple-line", // autocasts as new SimpleLineSymbol()
  color: "#30ffea",
  width: "0.5px",
  style: "solid"
};

// Symbol for U.S. Highways
const hwySym = {
  type: "simple-line", // autocasts as new SimpleLineSymbol()
  color: "#ff6207",
  width: "0.5px",
  style: "solid"
};

// Symbol for other major highways
const otherSym = {
  type: "simple-line", // autocasts as new SimpleLineSymbol()
  color: "#ef37ac",
  width: "0.5px",
  style: "solid"
};

const hwyRenderer = new UniqueValueRenderer({
  legendOptions: {
    title: "Freeway type"
  },
  defaultSymbol: otherSym,
  defaultLabel: "State Highway",
  field: "CLASS",
  uniqueValueInfos: [
    {
      value: "I", // code for interstates/freeways
      symbol: fwySym,
      label: "Interstate"
    },
    {
      value: "U", // code for U.S. highways
      symbol: hwySym,
      label: "US Highway"
    }
  ]
});

const hwySimpleRenderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: [50, 50, 50, 0.7],
    width: "0.5px",
    style: "solid"
  })
});

// Set the renderer on the layer
const hwyLayer = new FeatureLayer({
  url:
    "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Freeway_System/FeatureServer/2",
  renderer: hwyRenderer,
  title: "USA Freeway System",
  minScale: 0,
  maxScale: 0,
});

const statesLayer = new FeatureLayer({
  url:
    "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3",
  renderer: new SimpleRenderer({
    symbol: new SimpleFillSymbol({
      color: [0, 0, 0, 0],
      outline: {
        color: [50, 50, 50, 0.7],
        width: 0.5
      }
    })
  })
});

const map = new EsriMap({
  layers: [statesLayer, hwyLayer]
});

const view = new MapView({
  container: "viewDiv",
  map: map,
});

const legend = new Legend({
  view: view,
  layerInfos: [
    {
      layer: hwyLayer,
      title: "公路",
      hideLayers: []
    }
  ]
});

view.ui.add(legend, "bottom-left");

setInterval(() => {
  const type = hwyLayer.renderer.type;
  hwyLayer.renderer = type === "simple" ? hwyRenderer : hwySimpleRenderer;
}, 10000);