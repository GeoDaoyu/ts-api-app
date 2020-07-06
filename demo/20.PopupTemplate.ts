import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import FeatureLayer from "esri/layers/FeatureLayer";
import PopupTemplate from "esri/PopupTemplate";
import geometryEngine from "esri/geometry/geometryEngine";
import ActionButton from "esri/support/actions/ActionButton";

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

// Add this action to the popup so it is always available in this view
const measureThisAction = new ActionButton({
  title: "Measure Length",
  id: "measure-this",
  image:
    "https://developers.arcgis.com/javascript/latest/sample-code/popup-actions/live/Measure_Distance16.png",
});

const template = new PopupTemplate({
  title: "Trail run",
  content: getContent(),
  actions: [measureThisAction],
});

function getContent() {
  return `
    <div class="esri-feature__fields esri-feature__content-element">
      <table class="esri-widget__table" summary="属性和值列表">
        <tbody>
          <tr>
            <th class="esri-feature__field-header">名称</th>
            <td class="esri-feature__field-data">{name}</td>
          </tr>
          <tr>
            <th class="esri-feature__field-header">日期</th>
            <td class="esri-feature__field-data">{time}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

const featureLayer = new FeatureLayer({
  url:
    "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/TrailRuns/FeatureServer/0",
  outFields: ["*"],
  popupTemplate: template,
});
map.add(featureLayer);

// Execute each time the "Measure Length" is clicked
function measureThis() {
  const geom = view.popup.selectedFeature.geometry;
  const distance = geometryEngine.geodesicLength(geom, "miles");
  const display = parseFloat(Math.round(distance * 100) / 100 + "").toFixed(2);
  view.popup.content =
    view.popup.selectedFeature.attributes.name +
    `<div style='background-color:DarkGray;color:white'>${display} miles.</div>`;
}

// Event handler that fires each time an action is clicked.
view.popup.on("trigger-action", function (event) {
  if (event.action.id === "measure-this") {
    measureThis();
  }
});
