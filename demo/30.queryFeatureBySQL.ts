import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import FeatureLayer from "esri/layers/FeatureLayer";
import Query from "esri/tasks/support/Query";
import Graphic from "esri/Graphic";

import domConstruct from "dojo/dom-construct";
import on from "dojo/on";

const featureLayer = new FeatureLayer({
  url:
    "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Marital_Status_Boundaries/FeatureServer/0",
  outFields: ["*"],
});

const map = new EsriMap({
  basemap: "streets",
  layers: [featureLayer],
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-86.95, 38.702],
  zoom: 4,
  popup: {
    defaultPopupTemplateEnabled: true,
  }
});

// 4.处理查询结果
const showQueryResult = (features: Array<Graphic>) => {
  const attributes = features.map((feature) => feature.attributes);
  console.table(attributes);
};
let highLightHandler: __esri.Handle = null;
const highLight = (features: Array<Graphic>) => {
  view.whenLayerView(featureLayer).then((layerView) => {
    if (highLightHandler) {
      highLightHandler.remove(); // 清空高亮
    }
    highLightHandler = layerView.highlight(features);
  });
};

// 3.使用查询条件进行查询
// @ts-ignore
const doQuery = async (where) => {
  const query = new Query({
    returnGeometry: true,
    where,
    outFields: ["NAME", "OBJECTID"], // highlight必须要OBJECTID字段
  });

  const result = await featureLayer.queryFeatures(query);
  const { features } = result;
  if (features.length === 0) {
    return;
  }
  showQueryResult(features);
  highLight(features);
};

const html = `<input id="input" style="position: absolute; left: 50px; bottom: 50px"></input>`;
domConstruct.place(html, view.container, "last");

const input = document.getElementById("input");
on(input, "keydown", (event: KeyboardEvent) => {
  // 2.获取查询条件
  if (event.key === "Enter") {
    // @ts-ignore
    const value = event.target.value;
    const where = `NAME like '%${value}%'`;
    doQuery(where);
  }
});

// network请求，是对query的封装
// https://developers.arcgis.com/rest/services-reference/query-feature-service-.htm

