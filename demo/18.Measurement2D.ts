import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import domConstruct from "dojo/dom-construct";
import DistanceMeasurement2D from "esri/widgets/DistanceMeasurement2D";
import AreaMeasurement2D from "esri/widgets/AreaMeasurement2D";

let activeWidget: DistanceMeasurement2D | AreaMeasurement2D = null;

const map = new EsriMap({
  basemap: "streets",
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 5,
  center: [90, 45],
});

const html = `
  <div id="topbar">
    <button
      class="action-button esri-icon-measure-line"
      id="distanceButton"
      type="button"
      title="Measure distance between two or more points"
    ></button>
    <button
      class="action-button esri-icon-measure-area"
      id="areaButton"
      type="button"
      title="Measure area"
    ></button>
  </div>`;
domConstruct.place(html, view.container, "last");

document
  .getElementById("distanceButton")
  .addEventListener("click", function () {
    setActiveWidget(null);
    if (!this.classList.contains("active")) {
      setActiveWidget("distance");
    } else {
      setActiveButton(null);
    }
  });

document.getElementById("areaButton").addEventListener("click", function () {
  setActiveWidget(null);
  if (!this.classList.contains("active")) {
    setActiveWidget("area");
  } else {
    setActiveButton(null);
  }
});

function setActiveWidget(type: string) {
  switch (type) {
    case "distance":
      activeWidget = new DistanceMeasurement2D({
        view: view
      });

      // skip the initial 'new measurement' button
      activeWidget.viewModel.newMeasurement();

      view.ui.add(activeWidget, "top-right");
      setActiveButton(document.getElementById("distanceButton") as HTMLButtonElement);
      break;
    case "area":
      activeWidget = new AreaMeasurement2D({
        view: view,
      });

      // skip the initial 'new measurement' button
      activeWidget.viewModel.newMeasurement();

      view.ui.add(activeWidget, "top-right");
      setActiveButton(document.getElementById("areaButton") as HTMLButtonElement);
      break;
    case null:
      if (activeWidget) {
        view.ui.remove(activeWidget);
        activeWidget.destroy();
        activeWidget = null;
      }
      break;
  }
}

function setActiveButton(selectedButton: HTMLButtonElement) {
  // focus the view to activate keyboard shortcuts for sketching
  view.focus();
  var elements = document.getElementsByClassName("active");
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove("active");
  }
  if (selectedButton) {
    selectedButton.classList.add("active");
  }
}

view.ui.add("topbar", "top-right");
