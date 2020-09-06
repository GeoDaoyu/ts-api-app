import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import Sketch from "esri/widgets/Sketch";
import GraphicsLayer from "esri/layers/GraphicsLayer";
import FeatureLayer from "esri/layers/FeatureLayer";
import Query from "esri/tasks/support/Query";
import Graphic from "esri/Graphic";

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

// 4.处理查询结果
const showQueryResult = (features: Array<Graphic>) => {
  const attributes = features.map(feature => feature.attributes);
  console.table(attributes);
}
let highLightHandler: __esri.Handle = null;
const highLight = (features: Array<Graphic>) => {
  view.whenLayerView(featureLayer).then(layerView => {
    if (highLightHandler) {
      highLightHandler.remove(); // 清空高亮
    }
    highLightHandler = layerView.highlight(features);
  });
}

// 3.使用绘制的图形进行查询
// @ts-ignore
const doQuery = async (geometry) => {
  const query = new Query({
    returnGeometry: true,
    outFields: ["NAME", "OBJECTID"], // highlight必须要OBJECTID字段
    geometry,
    outSpatialReference: view.spatialReference,
    spatialRelationship: "intersects"
  });

  const result = await featureLayer.queryFeatures(query);
  const { features } = result;
  showQueryResult(features);
  highLight(features);
  graphicsLayer.removeAll(); // 清空绘制图形
}

// 2.在绘制结束，拿到绘制的图形
sketch.on("create", event => {
  if (event.state === "complete") {
    const geometry = event.graphic.geometry;
    doQuery(geometry);
  }
});
