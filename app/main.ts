import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import Graphic from "esri/Graphic";
import esriRequest from "esri/request";
import Search from "esri/widgets/Search";
import SearchSource from "esri/widgets/Search/SearchSource";
import Point from "esri/geometry/Point";

interface POI {
  id: string,
  name: string,
  location: string,
}

const url = "https://restapi.amap.com/v3/place";
const key = "bccb00446baf88d1450734bcab2ab5eb"; // 前往此处申请 https://console.amap.com/dev/key

const map = new EsriMap({
  basemap: "streets",
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [120, 30], // lon, lat
  scale: 3000000,
});

const customSearchSource = new SearchSource({
  placeholder: "搜地点",
  getSuggestions: function (params) {
    return esriRequest(`${url}/text`, {
      query: {
        key,
        keywords: params.suggestTerm,
      },
    }).then(function ({ data }) {
      // 接口文档 https://lbs.amap.com/api/webservice/guide/api/search/#text
      const { pois } = data;

      return pois.map(function (feature: POI) {
        return {
          key: feature.id,
          text: feature.name,
          sourceIndex: params.sourceIndex,
        };
      });
    });
  },

  getResults: function (params) {
    return esriRequest(`${url}/detail`, {
      query: {
        key,
        id: params.suggestResult.key,
      },
    }).then(function ({ data }) {
      const { pois } = data;
      const searchResults = pois.map(function (feature: POI) {
        const { location, name } = feature;
        const [x, y] = location.split(",");
        const graphic = new Graphic({
          geometry: new Point({
            x: +x,
            y: +y,
          }),
          attributes: feature,
        });
        const searchResult = {
          name,
          extent: graphic.geometry.extent,
          feature: graphic,
          target: graphic,
        };
        return searchResult;
      });

      return searchResults;
    });
  },
});

const searchWidget = new Search({
  view: view,
  sources: [customSearchSource],
  includeDefaultSources: false,
  locationEnabled: false,
});

view.ui.add(searchWidget, {
  position: "top-right",
});
