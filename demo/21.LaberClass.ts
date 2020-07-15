import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import FeatureLayer from "esri/layers/FeatureLayer";
import { TextSymbol, SimpleMarkerSymbol } from "esri/symbols";
import SimpleRenderer from "esri/renderers/SimpleRenderer";
import LabelClass from "esri/layers/support/LabelClass";

const minScale = 2500000;
const serviceUrl =
  "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/weather_stations_010417/FeatureServer/0";

const windClass = new LabelClass({
  labelExpressionInfo: {
    expression: `
      var DEG = $feature.WIND_DIRECT;
      var SPEED = $feature.WIND_SPEED;
      var DIR = When( SPEED == 0, null,
        (DEG < 22.5 && DEG >= 0) || DEG > 337.5, 'N',
        DEG >= 22.5 && DEG < 67.5, 'NE',
        DEG >= 67.5 && DEG < 112.5, 'E',
        DEG >= 112.5 && DEG < 157.5, 'SE',
        DEG >= 157.5 && DEG < 202.5, 'S',
        DEG >= 202.5 && DEG < 247.5, 'SW',
        DEG >= 247.5 && DEG < 292.5, 'W',
        DEG >= 292.5 && DEG < 337.5, 'NW', null );
      var WIND = SPEED + ' mph ' + DIR;
      var TEMP = Round($feature.TEMP) + '° F';
      var RH = $feature.R_HUMIDITY + '% RH';
      var labels = [ TEMP, WIND, RH ];
      return Concatenate(labels, TextFormatting.NewLine)
    `,
  },
  labelPlacement: "center-right",
  minScale: minScale,
  symbol: new TextSymbol({
    font: {
      size: 9,
      family: "Noto Sans",
    },
    horizontalAlignment: "left",
    color: "#2b2b2b",
  }),
});

const cityClass = new LabelClass({
  labelExpressionInfo: {
    expression: `$feature.STATION_NAME`,
  },
  labelPlacement: "center-left",
  minScale: minScale,
  symbol: new TextSymbol({
    font: {
      size: 12,
      weight: "bold"
    },
    color: "white",
    haloColor: "#c17c47",
    haloSize: 1,
    horizontalAlignment: "left",
  }),
});

const layer = new FeatureLayer({
  url: serviceUrl,
  renderer: new SimpleRenderer({
    symbol: new SimpleMarkerSymbol({
      color: [75, 75, 75, 0.7],
      size: 4,
      outline: null,
    }),
  }),
  labelingInfo: [windClass, cityClass],
});

const map = new EsriMap({
  basemap: "gray",
  layers: [layer],
});

const view = new MapView({
  container: "viewDiv",
  map,
  center: [-117.842, 33.799],
  zoom: 10,
  popup: {
    defaultPopupTemplateEnabled: true
  }
});
