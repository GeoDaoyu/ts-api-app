import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import Basemap from "esri/Basemap";
import TianDiTuLayer from "app/utils/TianDiTuLayer";
import GroupLayer from "esri/layers/GroupLayer";
import BasemapLayerList from "esri/widgets/BasemapLayerList";

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
];

const baseLayers = basemapConfig.reverse().map((item) => {
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
  baseListItemCreatedFunction: defineActions,
});

function defineActions(event: any) {
  const item = event.item;

  item.actionsSections = [
    [
      {
        title: "Go to full extent",
        className: "esri-icon-zoom-out-fixed",
        id: "full-extent",
      },
      {
        title: "Layer information",
        className: "esri-icon-description",
        id: "information",
      },
    ],
    [
      {
        title: "Increase opacity",
        className: "esri-icon-up",
        id: "increase-opacity",
      },
      {
        title: "Decrease opacity",
        className: "esri-icon-down",
        id: "decrease-opacity",
      },
    ],
  ];
}
basemapLayerList.on("trigger-action", function (event) {
  console.log(event);
});

view.ui.add(basemapLayerList, "top-right");

view.ui.remove("attribution");
