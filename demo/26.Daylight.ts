import SceneView from "esri/views/SceneView";
import EsriMap from "esri/Map";
import SceneLayer from "esri/layers/SceneLayer";
import Daylight from "esri/widgets/Daylight";
import Camera from "esri/Camera";

const map = new EsriMap({
  basemap: "satellite",
  ground: "world-elevation",
  layers: [
    new SceneLayer({
      portalItem: {
        id: "b343e14455fe45b98a2c20ebbceec0b0",
      },
    }),
  ],
});

const view = new SceneView({
  map: map,
  container: "viewDiv",

  camera: new Camera({
    position: {
      x: -4.49292254,
      y: 48.38118005,
      z: 29.41383,
    },
    heading: 250.18,
    tilt: 87.91,
  }),
  qualityProfile: "high",
  environment: {
    atmosphere: {
      quality: "high",
    },
    lighting: {
      date: new Date(),
      directShadowsEnabled: true,
    },
  },
});

const daylightWidget = new Daylight({
  view: view,
  playSpeedMultiplier: 2,
  visibleElements: {
    playButtons: true,
    shadowsToggle: true,
    datePicker: true,
    timezone: true,
  },
});

view.ui.add(daylightWidget, "top-right");
