import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import FeatureLayer from "esri/layers/FeatureLayer";
import PopupTemplate from "esri/PopupTemplate";
// @ts-ignore
import * as echarts from "https://cdn.staticfile.org/echarts/4.8.0/echarts.min.js";
import Graphic from "esri/Graphic";

const map = new EsriMap({
  basemap: "gray",
});

const view = new MapView({
  map,
  container: "viewDiv",
  center: [-117.08, 34.1],
  zoom: 12,
  popup: {
    defaultPopupTemplateEnabled: true,
  },
});

const getContent = (feature: Graphic) => {
  console.log(feature);
  return `<div class="echarts" style="width: 600px;height:400px;"></div>`;
};

const template = new PopupTemplate({
  title: "Trail run",
  content: getContent,
});

const featureLayer = new FeatureLayer({
  url:
    "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/TrailRuns/FeatureServer/0",
  outFields: ["*"],
  popupTemplate: template,
});
map.add(featureLayer);


view.popup.watch("visible", function (newValue, oldValue, property, popup) {
  if (!newValue) {
    return;
  }
  setTimeout(() => {
    const dom = document.getElementsByClassName("echarts")[0];
    const myChart = echarts.init(dom);
    const option = {
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };
    myChart.setOption(option);
  }, 2000);
});
