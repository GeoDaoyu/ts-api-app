import * as externalRenderers from "esri/views/3d/externalRenderers";
import SceneView from "esri/views/SceneView";
import WebScene from "esri/WebScene";
import LineOfSight from "esri/widgets/LineOfSight";
import VideoExternalRenderer from "./utils/VideoExternalRenderer";
import * as helpers from "./utils/helpers";

const scene = new WebScene({
  portalItem: {
    id: "82127fea11d6439abba3318cb93252f7",
  },
});

const view = new SceneView({
  map: scene,
  container: "viewDiv",
});

view.when(() => {
  const lineOfSight = new LineOfSight({
    view: view,
  });
  view.ui.add(lineOfSight, "top-right");
  const viewModel = lineOfSight.viewModel;
  viewModel.watch("state ", (value) => {
    if (value === "created") {
      const length = viewModel.targets.length;
      const location = viewModel.targets.getItemAt(length - 1).location;
      const observer = viewModel.observer;
      onCreated(location, observer);
    }
  });
});

const onCreated = (location: __esri.Point, observer: __esri.Point) => {
  const externalRenderer = new VideoExternalRenderer({
    view,
    location,
    observer,
    videoSrc: "./demo/movie.mp4",
  });
  externalRenderers.add(view, externalRenderer);
};
