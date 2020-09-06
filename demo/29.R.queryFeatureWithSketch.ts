import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import Sketch from "esri/widgets/Sketch";
import GraphicsLayer from "esri/layers/GraphicsLayer";
import FeatureLayer from "esri/layers/FeatureLayer";
import Query from "esri/tasks/support/Query";
import Graphic from "esri/Graphic";
// @ts-ignore
import * as R from "//cdnjs.cloudflare.com/ajax/libs/ramda/0.27.0/ramda.min.js";
import Geometry from "esri/geometry/Geometry";

// 1.准备绘制图层，查询的要素图层，地图对象，绘制微件
const graphicsLayer = new GraphicsLayer();

const featureLayer = new FeatureLayer({
  url:
    "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Marital_Status_Boundaries/FeatureServer/2",
  outFields: ["*"],
});

const map = new EsriMap({
  basemap: "streets",
  layers: [featureLayer, graphicsLayer],
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-73.95, 40.702],
  zoom: 13,
});

const sketch = new Sketch({
  layer: graphicsLayer,
  view: view
});

view.ui.add(sketch, "top-right");

// highLight上图
let highLightHandler: __esri.Handle = null;
const highLight = (features: Array<Graphic>) => {
  view.whenLayerView(featureLayer).then(layerView => {
    if (highLightHandler) {
      highLightHandler.remove(); // 清空高亮
    }
    highLightHandler = layerView.highlight(features);
  });
}

// 使用查询条件查询返回查询结果
// @ts-ignore
const doQuery = async query => {
  const result = await featureLayer.queryFeatures(query);
  const { features } = result;
  return features;
}

// 使用绘制的图形生成查询条件
const generateQuery = (geometry: Geometry) => new Query({
  returnGeometry: true,
  outFields: ["NAME", "OBJECTID"], // highlight必须要OBJECTID字段
  geometry,
  outSpatialReference: view.spatialReference,
  spatialRelationship: "intersects"
});

// 查询结果展示到控制台
const showInTable = (features: Graphic[]) => {
  const attributes = features.map(feature => feature.attributes);
  console.table(attributes);
}

// 处理查询结果
const showQueryResult = (features: Graphic[]) => {
  showInTable(features);
  highLight(features);
  graphicsLayer.removeAll(); // 清空绘制图形
}

const workFlow = R.compose(
  R.andThen(showQueryResult), // 处理查询结果
  doQuery,                    // 使用查询条件查询返回查询结果      
  generateQuery               // 使用绘制的图形生成查询条件
);

// 2.在绘制结束，拿到绘制的图形
sketch.on("create", event => {
  if (event.state === "complete") {
    const geometry = event.graphic.geometry;
    workFlow(geometry);
  }
});
